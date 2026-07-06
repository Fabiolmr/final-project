import express from "express";
import cors from 'cors'
import {authRoutes} from './routes/auth.routes';
import cookieParser from 'cookie-parser';
import { userRoutes } from "./routes/user.routes";

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(cookieParser());
app.use('/auth', authRoutes);

app.use('/user', userRoutes);

export {app};