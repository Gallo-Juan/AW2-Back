import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SECRET = process.env.SECRET; 


export const verifyToken = async (req, res, next) => {
    
   
    const authHeader = req.headers['authorization'];
    
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ 
            message: 'Acceso denegado. Se requiere un token.' 
        });
    }

    try {  const decode = await jwt.verify(token, SECRET);

          req.usuario = decode; 

        next();

    } catch (error) {
        return res.status(400).json({ 
            message: 'Token inválido o expirado.' 
        });
    }
}

// Ya no necesitas las funciones 'decodeToken' o la 'verifyToken' original.
// Esta única función 'verificarToken' hace todo el trabajo.