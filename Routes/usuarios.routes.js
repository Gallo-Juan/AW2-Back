import { Router } from "express";
import {readFile, writeFile} from "fs/promises"

const router=Router()

const fileUsuarios = await readFile('./Data/usuarios.json', 'utf-8')
const usuariosData=JSON.parse(fileUsuarios)

router.post('/registrar',(req,res)=>{
try{
    const nombre=req.body.nombre
    const apellido=req.body.apellido
    const email=req.body.email
    const contrasena=req.body.contrasena

    if(!nombre || !apellido || !email || !contrasena){
        return res.status(400).json({message: 'Falta completar campos'})
    }

    const usuarioExiste = usuariosData.find(u => u.email === email);

    if(usuarioExiste){
        return res.status(409).json({message:'Ya existe un usuario con ese Email'})
    }

    const ultimoUsuario = usuariosData[usuariosData.length - 1];

    const nuevoId = ultimoUsuario ? ultimoUsuario.id + 1 : 1;

    const nuevoUsuario={
        id: nuevoId,
        nombre,
        apellido,
        email,
        contrasena
    }

    usuariosData.push(nuevoUsuario)
    writeFile('./Data/usuarios.json', JSON.stringify(usuariosData,null,2), 'utf-8')

    res.status(200).json({ message: "Usuario registrado con éxito" });
} catch (error) {
        // 3. Si ocurre CUALQUIER error en el bloque 'try' (incluido un fallo en writeFile),
        //    el código salta directamente a esta línea.
        console.error("Ocurrió un error:", error);
        res.status(400).json({ message: "Ha ocurrido un error" });
    }
})

router.post('/login', (req,res)=>{
    try{

    const email = req.body.email;
    const contrasena=req.body.contrasena

    if (!email || !contrasena) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    // Buscar usuario que coincida con email y contraseña
    const usuario = usuariosData.find(e => e.email === email && e.contrasena === contrasena);

    if (usuario) {
        res.status(200).json({id:usuario.id,nombre:usuario.nombre, apellido:usuario.apellido, email:usuario.email})
    }else{
         res.status(400).json({ error: "Email o contraseña incorrectos" });
    }
}catch(error){
    res.status(400).json({message:"Ha ocurrido un error"})
}
})

export default router