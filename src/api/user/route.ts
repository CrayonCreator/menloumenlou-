import {UserMapping} from "@/types";
import { NextRequest , NextResponse } from "next/server";
import connectDB from "@/api/db";
import UserModel from "@/models/UserModel";

/**
 * GET /api/user
 * Fetches user data based on the provided deviceId.
 * @param request 
 * @returns 
 */
export async function GET(request: NextRequest) {
    try{
        await connectDB();

        const searchParams = new URL(request.url).searchParams;
        const deviceId = searchParams.get("deviceId") || null;

        if(!deviceId){
            return NextResponse.json({
                success: false,
                message: "Device ID is required",
            },{
                status: 400,
            })
        }

        const userData = await UserModel.findOne({ deviceId });

        if(!userData){
            return NextResponse.json({
                success: false,
                message: "User not found",
            },{
                status: 404,
            })
        }

        const formattedData: UserMapping = {
            deviceId: userData.deviceId,
            username: userData.username,
            createdAt: userData.createdAt,
            lastSeen: userData.lastSeen,
            bestscore: userData.bestscore,
        }

        return NextResponse.json({
            success: true,
            data: formattedData,
            message: "User fetched successfully",
        },{
            status: 200,
        })
    }catch(error){
        console.error("Error fetching user:", error);
        return NextResponse.json({
            success: false,
            message: "Error fetching user",
        },{
            status: 500,
        })
    }
}

/**
 * POST /api/user
 * Creates or updates a user based on the provided deviceId and username.
 * @param request 
 * @returns 
 */

export async function POST(request: NextRequest) {
    try{
        await connectDB();
        const { deviceId, username } = await request.json();
        if(!deviceId || !username){
            return NextResponse.json({
                success: false,
                message: "Device ID and username are required",
            },{
                status: 400,
            })
        }
        let userData = await UserModel.findOne({ deviceId });
        if(userData){
            userData.username = username;
            userData.lastSeen = new Date();
            await userData.save();
        }else{
            userData = new UserModel({
                deviceId,
                username,
            });
            await userData.save();
        }

        const userMapping:UserMapping = {
            deviceId: userData.deviceId,
            username: userData.username,
            createdAt: userData.createdAt,
            lastSeen: userData.lastSeen,
            bestscore: userData.bestscore,
        };

        return NextResponse.json({
            success: true,
            data: userMapping,
            message: "User created/updated successfully",
        },{
            status: 200,
        })
    }catch(error){
        console.error("Error creating/updating user:", error);
        return NextResponse.json({
            success: false,
            message: "Error creating/updating user",
        },{
            status: 500,
        })
    }
}

/**
 * PUT /api/user
 * Updates the best score of a user based on the provided deviceId and bestscore.
 * @param request 
 * @returns 
 */

export async function PUT(request:NextRequest){
    try{
        await connectDB();
        const { deviceId, bestscore } = await request.json();
        if(!deviceId || !bestscore){
            return NextResponse.json({
                success: false,
                message: "Device ID and best score are required",
            },{
                status: 400,
            })
        }
        const userData = await UserModel.findOne({deviceId});
        if(!userData){
            return NextResponse.json({
                success: false,
                message: "User not found",
            },{
                status: 404,
            })
        }
        userData.bestscore = bestscore;
        await userData.save();
        return NextResponse.json({
            success: true,
            message: "Best score updated successfully",
            data: {
                deviceId: userData.deviceId,
                bestscore: userData.bestscore,
            }
        },{
            status: 200,
        })

    }catch(error){
        console.error("Error updating best score:", error);
        return NextResponse.json({
            success: false,
            message: "Error updating best score",
        },{
            status: 500,
        })
    }
}

