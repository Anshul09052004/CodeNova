import mongoose from "mongoose"

const connectDb = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database connected ${process.env.MONGODB_URI}`);
        
    } catch (error) {
        console.log(error)
        process.exit(1)

    }
}
export default connectDb;