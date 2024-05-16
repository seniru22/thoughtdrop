import { QueryResult } from "pg";
import { client } from "../models/db";
import jwt from "jsonwebtoken"
import { NextFunction } from "express";
require('dotenv').config();

const isAuthenticated = async (
    req: any,
    res: any,
    next: NextFunction
  ) => {
    try {
      const query = `SELECT * FROM user_token WHERE token=$1`;
      const authHeader = req.header("Authorization");
      const token = authHeader ? authHeader.replace("Bearer ", "") : null;
      const value: any[] = [token];
      const data: QueryResult<any> = await client.query(query, value);
  
      if (data.rowCount === null) {
        return res.json({ status: false, message: "No user found!" });
      }
      if (data.rowCount < 1) {
        return res
          .status(401)
          .json({ status: false, message: "Unauthorized user!" });
      }
      const userId = data.rows[0].fk_user;
      const userQuery = `SELECT * FROM users WHERE id = $1`;
      const userQueryParams = [userId];
      const userQueryData = await client.query(userQuery, userQueryParams);
  
      req.user = userQueryData.rows[0];
      req.token = token;
      next();
    } catch (err: any) {
        console.log(err)
      return res.status(500).json({ error: err.message });
    }
  };

const generateUserToken = async (id: number) => {
    try{
        const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY || "", { expiresIn: '1d' });
        const insertQuery: string = `INSERT INTO user_token (token, fk_user) VALUES ($1, $2)`;
        await client.query(insertQuery, [token, id]);
        return token;
    }catch(err: any){
        console.log(err)
    }
}

module.exports = { generateUserToken, isAuthenticated }
