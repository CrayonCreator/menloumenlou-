import mongoose from "mongoose";
import { UserMapping } from "@/types";

export interface IUserModel extends mongoose.Document, UserMapping {
    deviceId: string;
    username: string;
    createdAt: Date;
    lastSeen: Date;
    bestscore: number;
}

const userSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: true,
        unique: true, 
        index: true,  
    },
    username: {
        type: String,
        required: true,
        trim: true,   
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true, 
    },
    lastSeen: {
        type: Date,
        default: Date.now,
    },
    bestscore: {
        type: Number,
        default: 0,
    }
});

userSchema.pre('findOneAndUpdate', function(next) {
    this.set({ lastSeen: new Date() });
    next();
});

const UserModel = mongoose.models.User as mongoose.Model<IUserModel> || 
    mongoose.model<IUserModel>("User", userSchema);

export default UserModel;