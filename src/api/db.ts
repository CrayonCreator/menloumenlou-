import mongoose from 'mongoose';
const { MONGO_URI } = process.env;
const connectDB = async () => {
    if(MONGO_URI){
        try {
            await mongoose.connect(MONGO_URI);
            console.log('MongoDB connected');
        } catch (error) {
            console.error('MongoDB connection error:', error);
            process.exit(1);
        }
    }
    else{
        console.error('MONGO_URI is not defined in environment variables');
        process.exit(1);
    }
}

export default connectDB;