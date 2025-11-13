import pkg from 'mongoose';
const { Schema, models, model } = pkg;

const ProductoVendidoSchema = new Schema({
    producto: {type: Schema.Types.ObjectId, ref: 'producto', required: true},
    cantidad: {type: Number, required: true, min: [1, 'La cantidad debe ser al menos 1']},
    precio: {type: Number, required: true}
});

const ventaSchema = new Schema({    
    id_usuario: {type: Schema.Types.ObjectId, ref: 'Usuario', required: [true, 'El ID del usuario es obligatorio']},
    fecha: {type: Date, default: Date.now},    
    total: {type: Number, required: [true, 'El total es obligatorio'], min: 0},    
    direccion: {type: String, required: [true, 'La dirección es obligatoria'], trim: true},    
    productos: [ProductoVendidoSchema],     
    entregado: {type: Boolean, default: false}
});

const venta = models.venta || model('venta', ventaSchema);

export default venta;