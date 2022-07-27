//Paquete express 
const express= require('express');
//funcionalidad para usar jsonwebtoken
const jwt = require("jsonwebtoken");
//Unicializar el paquete express
const app = express();


//Configuraciones
app.set('port', process.env.PORT || 3000);


//Middlewares
app.use(express.json());


//Rutas
app.use(require('./routes/compras'));
app.use(require('./routes/personas'));
app.use(require('./routes/reportes'));
app.use(require('./routes/ventas'));
app.use(require('./routes/inventario'));


//JSON WEB TOKEN
app.get("/app", (req , res) => {
     res.json({
         mensaje: "Nodejs OK"
     });
});
 
 
app.post("/app/login", (req , res) => {
     const user = {
         id: 1,
         nombre : "tiendam",
         email: "tiendamilitar@gmail.com"
     }
 
     jwt.sign({user}, 'secretkey', {expiresIn: '1h'}, (err, token) => {
         res.json({
             token
         });
     });
 
});
 
app.post("/app/posts", verifyToken, (req , res) => {
 
     jwt.verify(req.token, 'secretkey', (error, authData) => {
         if(error){
             res.sendStatus(403);
         }else{
             res.json({
                     mensaje: "Acceso creado",
                     authData
                 });
         }
     });
});

 
 // Authorization: Bearer <token>
function verifyToken(req, res, next){
      const bearerHeader =  req.headers['authorization'];
 
      if(typeof bearerHeader !== 'undefined'){
           const bearerToken = bearerHeader.split(" ")[1];
           req.token  = bearerToken;
           next();
      }else{
          res.sendStatus(403);
      }
}
 



//Inicializando el servidor
app. listen(app.get('port'),( )=>{
     console.log('Server on port', app.get('port'));

});
