import mongoose from 'mongoose'
import { envVars } from './envVars.js'


export const connectToDb = async () => {
    try {
        const conn = await mongoose.connect(envVars.MONGO_URI);
        if (conn) {
            console.log("connected to mongodb successfully:) " + conn.connection.host)
        }
    } catch (error) {
        console.log("Failed to connect to mongodb :(", error.message);
        process.exit(1);
    }
}