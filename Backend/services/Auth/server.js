import dotenv from 'dotenv';
import express from 'express';
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser';
import LoginRoute from './Routes/auth.route.js';
import cors from 'cors';
import "./config/firebase.js";
dotenv.config();

connectDb();

const port = process.env.PORT;
const app = express();


app.get('/', (req, res) => {
    res.send('Hello Auth!');
});
app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/', LoginRoute);

app.listen(port, () => {
    console.log(`Auth is running on port ${port}`);

});