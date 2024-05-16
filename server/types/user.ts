import { Request, Response } from "express";

export interface UserBody {
  body: {
    username: string;
    email: string;
    password: string;
  };
}
export interface ReqMid extends Request {
  user: {
    id: number;
    email: string;
    password: string;
  };
  token: string;
}
export interface Token {}
