import express from "express";
import cors from 'cors'
import cookieParser from 'cookie-parser';
import {authRoutes} from './routes/auth.routes';
import { userRoutes } from "./routes/user.routes";
import { monstroRoutes } from "./routes/monstro.routes";

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/monstros', monstroRoutes);

export {app};