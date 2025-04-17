import mongoose from "mongoose";

export interface ILeaderboardModel extends mongoose.Document {
    username: string;
    score: number;
    deviceId: string;
    timestamp: Date;
}

const leaderboardSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: true,
    },
    score: {
        type: Number,
        required: true,
        index: true,
    },
    deviceId: {
        type: String,
        required: true,
    },
    timestamp:{
        type: Date,
        default: Date.now,
    }
});

const LeaderboardModel = mongoose.models.Leaderboard as mongoose.Model<ILeaderboardModel> || 
    mongoose.model<ILeaderboardModel>("Leaderboard", leaderboardSchema);

export default LeaderboardModel;