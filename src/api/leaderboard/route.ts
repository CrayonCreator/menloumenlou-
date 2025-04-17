import { NextRequest, NextResponse } from "next/server";
import connectDB from "../db";
import { LeaderboardEntry } from "@/types";
import Leaderboard from "@/models/LeaderboardModel";
/**
 * GET /api/leaderboard
 * Fetches the leaderboard entries sorted by score in descending order.
 * @param request 
 * @returns 
 */

export async function GET(request:NextRequest){
    try{
        await connectDB();

        const searchParams = new URL(request.url).searchParams;
        const limit = searchParams.get("limit") || "10";
        const page = searchParams.get("page") || "0";

        const leaderboardData = await Leaderboard.find({})
        .sort({ score: -1 })
        .skip(parseInt(page)*parseInt(limit))
        .limit(parseInt(limit))

        const formattedData:LeaderboardEntry[] = leaderboardData.map((entry)=>{
            return {
                user:{
                    deviceId: entry.deviceId,
                    username: entry.username,
                },
                score:{
                    score: entry.score,
                    createdAt: entry.timestamp,
                }
            }
        })

        return NextResponse.json({
            success: true,
            data: formattedData,
            message: "Leaderboard fetched successfully",
        },{
            status: 200,
        })
    }catch(error){
        console.error("Error fetching leaderboard:", error);
        return NextResponse.json({
            success: false,
            message: "Error fetching leaderboard",
        },{
            status: 500,
        })
    }
}

/**
 * POST /api/leaderboard
 * Creates a new leaderboard entry with the provided username, score, and deviceId.
 * @param request 
 * @returns 
 */

export async function POST(request:NextRequest){
    try{
        await connectDB();
        const { username, score, deviceId } = await request.json();
        if(!username || !score || !deviceId){
            return NextResponse.json({
                success: false,
                message: "Username, score and deviceId are required",
            },
            {
                status: 400,
            })
        }

        const newEntry = new Leaderboard({
            username,
            score,
            deviceId,
        })

        const formattedEntry:LeaderboardEntry = {
            user:{
                deviceId: newEntry.deviceId,
                username: newEntry.username,
            },
            score:{
                score: newEntry.score,
                createdAt: newEntry.timestamp,
            }
        }

        return NextResponse.json({
            success: true,
            message: "Leaderboard entry created successfully",
            data: formattedEntry,
        },{
            status: 201,
        })
    }catch(error){
        console.error("Error creating leaderboard entry:", error);
        return NextResponse.json({
            success: false,
            message: "Error creating leaderboard entry",
        },{
            status: 500,
        })
    }
}