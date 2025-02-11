Instalacion del backend:

Instalar Node.js y npm (https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)<br/>
Instalar PostgreSQL (https://www.postgresql.org/download/)<br/>
Ayuda para la instalacion: https://www.youtube.com/watch?v=gEJcMrk3E-Q&list=PLgqdACsQ8US2DCzQVrdZDZCTtTFHMY0as <br/>
Crear base de datos PostgreSQL (https://www.youtube.com/watch?v=6dpTtLczzNo&list=PLgqdACsQ8US2DCzQVrdZDZCTtTFHMY0as&index=2)<br/>
Crear una cuenta en Stripe (https://dashboard.stripe.com/login)<br/>


Una vez instaladas estas dependencias:

Descargar el zip del proyecto, y extraer los archivos en una carpeta.<br/>
Preferiblemente abrir la carpeta con Visual Studio Code.<br/>
En la carpeta raiz, crear los directorios "uploads", y "drizzle", dentro de la carpeta drizzle, crear otra carpeta llamada "migrations"<br/>
Abrir una terminal en la carpeta raiz con Visual Studio Code.<br/>
Ejecutar el comando "npm install"<br/>
Esperar a que todas las dependencias se instalen.<br/>
En la carpeta raiz, crear un archivo llamado ".env"<br/>
Dentro del archivo .env :<br/>

DATABASE_URL="postgres://USUARIO:CONTRASEÑA@localhost:5432/Dating-Pro" POR DEFECTO, POSTGRES USARA EL PUERTO 5432, NO CAMBIARLO. Dating-Pro ES EL NOMBRE QUE LE HAYAS PUESTO A LA BASE DE DATOS<br/>
<br/>
PORT="3000" 3000 SUELE SER UN PUERTO POR DEFECTO, DEJARLO ASI.<br/>
<br/>
STRIPE_SECRET_KEY="CLAVESECRETASTRIPE"<br/>
STRIPE_PUBLISHABLE_KEY="CLAVEPUBLICABLESTRIPE" LOS VALORES DE STRIPE_SECRET_KEY Y STRIPE_PUBLISHABLE_KEY LOS ENCONTRARAS AL HABER CREADO LA CUENTA DE STRIPE, EN EL DASHBOARD PRINCIPAL.<br/>

Una vez guardado el archivo .env y habiendo instalado las dependencias con npm install, ejecutar el comando npm run dev. Para observar la informacion de la base de datos, puedes abrir otra consola
y ejecutar el comando npx drizzle-kit studio, y abrir la url en el navegador. (http://local.drizzle.studio)
