import express from 'express';
import dotenv from 'dotenv';
import proxy from 'express-http-proxy';
import cors from 'cors';
dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", proxy(process.env.AUTH_SERVICE_URL));
app.get('/', (req, res) => {
    res.send('Gateway is running');
});

app.listen(port, () => {
    console.log(`Gateway started on port ${port}`);
});