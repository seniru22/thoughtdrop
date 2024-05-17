"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../models/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `SELECT * FROM user_token WHERE token=$1`;
        const authHeader = req.header("Authorization");
        const token = authHeader ? authHeader.replace("Bearer ", "") : null;
        const value = [token];
        const data = yield db_1.client.query(query, value);
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
        const userQueryData = yield db_1.client.query(userQuery, userQueryParams);
        req.user = userQueryData.rows[0];
        req.token = token;
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
    }
});
const generateUserToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET_KEY || "", { expiresIn: '1d' });
        const insertQuery = `INSERT INTO user_token (token, fk_user) VALUES ($1, $2)`;
        yield db_1.client.query(insertQuery, [token, id]);
        return token;
    }
    catch (err) {
        console.log(err);
    }
});
module.exports = { generateUserToken, isAuthenticated };
