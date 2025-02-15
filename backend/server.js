import express from 'express';
import { envVars } from './config/envVars.js';
import { connectToDb } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import tvRoutes from './routes/tvRoutes.js';
import searchRoutes from './routes/searchRoutes.js';

import { protectedRoutes } from './middlewear/protectedRoutes.js';
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();
app.use(express.json());
app.use(cookieParser());

const __dirname = path.resolve();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectedRoutes, movieRoutes);
app.use("/api/v1/tv", protectedRoutes, tvRoutes);
app.use("/api/v1/search", protectedRoutes, searchRoutes);

if(envVars.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
    })
}

const port = envVars.PORT;
app.listen(port, () => {
    console.log(`Server started on ${port}`);
    connectToDb();
});