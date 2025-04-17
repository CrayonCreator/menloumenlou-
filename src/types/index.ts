export interface UserMapping {
    deviceId : string;
    username : string;
    createdAt : Date;
    lastSeen : Date;
    bestscore : number;
}

export interface LeaderboardEntry {
    user:{
        deviceId:string;
        username:string;
    },
    score:{
        score:number;
        createdAt:Date;
    }

}