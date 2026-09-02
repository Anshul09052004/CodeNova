import redisClient from "../../../shared/Redis/redis.js";
const protect = async (req, res, next) => {
    try {
        const sessionId = req.cookies.sessionId;
        if (!sessionId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const session = await redisClient.get(`session:${sessionId}`);
        if (!session) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = JSON.parse(session);
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default protect
