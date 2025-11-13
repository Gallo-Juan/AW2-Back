import { connectToDataBase } from "../connection.js"
import usuario from "../../Schemas/usuarios.schema.js"

export const createUsu=async({nombre,apellido,email,contrasena})=>{
    try{
        await connectToDataBase()
        const res=await usuario.create({nombre,apellido,email,contrasena})
        return JSON.parse(JSON.stringify(res))
    }catch(error){
        console.log(error)
    }
}
export const buscarUsuario=async({email})=>{
    try{
        await connectToDataBase()
        const res = await usuario.findOne({ email: email })
            .select('+contrasena') 
            .lean();
        return JSON.parse(JSON.stringify(res))
    }catch(error){
        console.log(error)
    }
}