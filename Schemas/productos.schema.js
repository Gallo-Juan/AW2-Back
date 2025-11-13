import pkg from 'mongoose';
const { Schema, models, model } = pkg;

const productoSchema=new Schema({
    titulo: {type: String, required: true, trim: true, unique:true},
    precio: {type: Number, required: true, min: 0},
    descripcion: {type: String,required: true},
    categoria: {type: String,required: true},
    imagen: {type: String, required: false },
    stock: {type: Number, required: true, min: 0, default: 0},
    rating: {
        tasa: {type: Number, min: 0, max: 5, default: 0},
        cantidad: {type: Number, min: 0, default: 0}
    }
    
})

const producto=models.producto || model('producto',productoSchema)

export default producto