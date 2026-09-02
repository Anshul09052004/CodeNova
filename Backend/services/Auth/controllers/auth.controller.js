import { getAuth } from "firebase-admin/auth";
import User from "../models/user.model.js";
import crypto from 'crypto'
import redisClient from "../../../shared/Redis/redis.js";
export const Login = async (req, res) => {
    try {
        const { token } = req.body;
        const decoded = await getAuth().verifyIdToken(token);
        let user = await User.findOne({
            fireBaseId: decoded.uid
        });

        if (!user) {
            user = await User.create({
                fireBaseId: decoded.uid,
                name: decoded.name,
                email: decoded.email,
                avatar: decoded.picture
            });
        }
        const sessionId = crypto.randomUUID();
        res.cookie('sessionId', sessionId, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'none',
            secure: true
        })
        await redisClient.set(`session:${sessionId}`, JSON.stringify(
            {
                userId: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar
            }
        ), "EX", 7 * 24 * 60 * 60);

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }

}
export const logOut = async (req, res) => {
    try {
        const { sessionId } = req.cookies;
        await redisClient.del(`session:${sessionId}`);
        res.clearCookie('sessionId');
        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const getCurrentUser = async (req, res) => {
    try {

        return res.status(200).json(req.user);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}