export const verifyToken=async(token)=>{
    if(!token){
        return false
    }

    try{
        const decode=await jwt.verify(token,SECRET)
        return true
    }catch(error){
        return false
    }
}

export const decodeToken=async(token)=>{
    if(!verifiyToken){
        return false
    }
    const decode=await jwt.verify(token,SECRET)
    return decode
}