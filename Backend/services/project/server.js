import dotenv from 'dotenv';
import express from 'express';
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();

connectDb();

const port = process.env.PORT;
const app = express();


app.get('/', (req, res) => {
    res.send('Hello Projects!');
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

app.listen(port, () => {
    console.log(`Projects is running on port ${port}`);

});