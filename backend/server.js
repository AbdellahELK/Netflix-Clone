import express from 'express';
import { envVars } from './config/envVars.js';
import { connectToDb } from './config/db.js';

import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(express.json());



app.use("/api/v1/auth", authRoutes)



const port = envVars.PORT;
app.listen(port, () => {
    console.log(`Server started on ${port}`);
    connectToDb();
});