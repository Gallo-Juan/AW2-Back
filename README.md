Tu Rincón Online

Este repositorio contiene datos en formato JSON para un sistema ficticio de e-commerce llamado "Tu Rincón Online", que comercializa artículos tecnológicos.

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

3- Ejecutar "npm run dev" para iniciar el servidor. El puerto de especifica en la consola.

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
