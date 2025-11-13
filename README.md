Tu Rincón Online

Este repositorio contiene datos en formato JSON para un sistema ficticio de e-commerce llamado "Tu Rincón Online", que comercializa artículos tecnológicos.

## 🌟 Características

* Gestión de productos con filtrado por categoría.
* Sistema de registro y autenticación de usuarios (Login).
* Registro de ventas.
* Base de datos poblada con datos de ejemplo.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

* [Node.js](https://nodejs.org/) (v18.x o superior)
* [MongoDB](https://www.mongodb.com/try/download/community) (Instalado localmente o una cuenta de [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

📂 Estructura de archivos

usuarios.json → datos de usuarios registrados.

productos.json → información de los productos disponibles.

ventas.json → registro de ventas realizadas, vinculando usuarios y productos.

🔗 Relaciones

ventas.json referencia a usuarios.json mediante el campo id_usuario.

ventas.json referencia a productos.json mediante el campo id dentro del arreglo productos.

***Como usar el proyecto***

1- Clonar el repositorio.

2- Ejecutar el comando "npm i" en la ubicacion del proyecto.

3- Crea un archivo .env en la raiz del proyecto y completalo con lo siguiente:
            # Puerto del servidor (ej. 8080)
            PORT=8080

            # String de conexión de MongoDB (local o de Atlas)
            # Ejemplo local: MONGODB_URI=mongodb://localhost:27017/TuRinconOnlineDB
            MONGODB_URI=TU_STRING_DE_CONEXION_AQUI

            # Secreto para firmar tokens (JWT)           
            SECRET=tu_palabra_secreta_muy_segura

3- (Opcional) Ejecuta el comando "npm run seed" para completar la base de datos con datos de prueba que estan en los archivos JSON en la carpeta 'Data'.

4- Ejecutar "npm run dev" para iniciar el servidor. El puerto de especifica en la consola.

**Si ejecutaste el punto 3 para ingresar puedes utilizar el siguiente usuario**
Email: juan@gmail.com
Contrasena: juan1234

***Rutas***

GET
/productos?categoria="categoria" --> devuelve todos los productos o lo pertenecientes a la categoria

POST
/usuarios/registrar --> carga un nuevo usuario
JSON --> {  "nombre": "",
            "apellido": "",
            "email": "",
            "contrasena": ""
         }
/login --> ingreso de un usuario ya cargado
JSON --> {
            "email": "",
            "contrasena": ""
         }

/ventas --> carga de venta
JSON --> {
            "id_usuario": "",
            "total": "",
            "direccion": "",
            "productos": []
          }
