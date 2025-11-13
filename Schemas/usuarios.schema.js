import pkg from 'mongoose';
const { Schema, models, model } = pkg;

const usuarioSchema=new Schema({
    nombre: {type: String, required: true, trim: true},
    apellido: {type: String, required: true},
    email: {type: String,required: true, unique:true},
    contrasena: {type: String,required: true, select: false}   
    
})

const usuario=models.usuario || model('usuario',usuarioSchema)

export default usuario