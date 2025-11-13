import { Router } from "express";
import { buscarUsuario, createUsu } from "../DB/actions/usuarios.action.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const router=Router()

router.post('/registro',async (req,res)=>{
    const {nombre, apellido, email, contrasena}=req.body
    
    if(!nombre || !apellido || !email || !contrasena){
        return res.status(400).json({message: 'Falta completar campos'})
    } 

    try{
        const hashedPass=bcrypt.hashSync(contrasena,8) 

        const result=await createUsu({nombre,apellido,email,contrasena: hashedPass})

        res.status(200).json(result);
} catch (error) {
        
        console.error("Ocurrió un error:", error);
        res.status(400).json({ message: "Ha ocurrido un error" });
    }
})

router.post('/login', async (req, res) => { 
       
    const { email, contrasena } = req.body; 

    if (!email || !contrasena) {
            return res.status(400).json({ message: "Email y contraseña son obligatorios" });
        }

    const result=await buscarUsuario({email})

    if(!result){
        return res.status(404).send({status:false})
    }

    const controlPass=bcrypt.compareSync(contrasena,result.contrasena)

    if(!controlPass){
        return res.status(401).send({status:false})        
    }

    const tokenPayload = {
            id: result._id,
            nombre: result.nombre,
            apellido: result.apellido,
            email: result.email            
        };

       
        const token = jwt.sign(
            tokenPayload, 
            process.env.SECRET, 
            { expiresIn: 86400 } 
        );
    
    res.status(200).json({
            status: true,
            token: token,
            nombre: result.nombre,
            apellido: result.apellido,
            email: result.email,
            id: result._id
        });

     
});

export default router