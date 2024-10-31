import mongoose, { mongo } from "mongoose";

const connectToMongoDb = async () => {
    try {
        console.log("attempting to connect to database...");
        await mongoose.connect(process.env.MONGO_URI,{});
        console.log("Connected to MONGODB...");
        
        
        
    } catch (error) {
        console.log("failed to connect to database ...", error.message);
        process.exit(1);
        
    }
}


export default connectToMongoDb;