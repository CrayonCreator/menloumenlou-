import FingerprintJS from '@fingerprintjs/fingerprintjs';

import type { UserMapping } from '../types';

// get deviceId using FingerprintJS
export async function getDeviceId():Promise<string>{
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
}

export function saveUserMapping(deviceId:string,username:string):void{
    const mapping:UserMapping = {
        deviceId: deviceId,
        username: username,
        createdAt: new Date(),
        lastSeen: new Date()
    };
    localStorage.setItem("userMapping", JSON.stringify(mapping));
    fetch('/api/users/mapping',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mapping)
    })
    .catch((error) => {
        console.error('Error saving user mapping:', error);
    })
}

export function getUserMapping():UserMapping|null{
    const storedMapping = localStorage.getItem("userMapping");
    if(!storedMapping){
        return null;
    } 
    try{
        const mapping:UserMapping = JSON.parse(storedMapping);
        return mapping;
    }
    catch(error){
        console.error('Error parsing user mapping:', error);
        return null;
    }
}

export function getCurrentUsername():string|null{
    const mapping = getUserMapping();
    return mapping ? mapping.username : null;
}

export function updateLastSeen():void{
    const mapping = getUserMapping();
    if(mapping){
        mapping.lastSeen = new Date();
        localStorage.setItem("userMapping", JSON.stringify(mapping));
        fetch('/api/users/mapping',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mapping)
        })
        .catch((error) => {
            console.error('Error updating last seen:', error);
        })
    }
}