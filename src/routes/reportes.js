//---------------------- Wendy Daniela Sauceda Lopez-----------------------/
//------------------------ TABLA Reportes  ------------------------------/
//****METODOS MOSTRAR, SELECCIONAR, INSERTAR, ACTUALIZAR Y ELIMINAR ****/

//Paquete express
const express=require('express');
const router_r=express.Router();
//funcionalidad para usar jsonwebtoken
const jwt = require("jsonwebtoken");

// Conexion a la base de datos
const mysqlConnection = require('../database');

// Funcion (Authorization: Bearer <token>)
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

// Reportes General
//mostrar todos los datos de la tabla Reporte General con token
router_r.get('/MostrarGeneral' ,  verifyToken, ( req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
    
            mysqlConnection.query('SELECT * FROM TIENDASM.TBL_REP_GENERALES', (err, rows, fields) =>{
             if(!err) {
                  res.json(rows)
                } else {
                  console.log(rows);
                }

            });
        }
    });
});


//SELECT DE LA TABLA REPORTE GENERAL CON TOKEN
router_r.get("/SELECIONAR/:COD_REPORTE" ,  verifyToken, (req, res) =>{
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
    
    
         try {
    
             const {COD_REPORTE} = req.params;
             const consulta ='call TIENDASM.SELECT_REPORTES (?)';
              mysqlConnection.query(consulta, [COD_REPORTE], (error, results) => {
                  if (error) throw error;
                     if (results.length > 0) {
                     res.json(results);
                    } else {
                      res.send("No pudo traer ningun dato de la BD");
                    }
                });
            }  catch (error) {
                console.log(error);
            }
    
        }
    });        
});


// DELETE DE LA TABLA REPORTE GENERAL CON TOKEN 
router_r.delete ("/ELIMINARREPGENERAL/:COD_REPORTE", verifyToken , (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
          const {COD_REPORTE} = req.params;
           const sql ='call TIENDASM.DELETE_REPGENERALES (?)';

           mysqlConnection.query(sql, [COD_REPORTE], (err, results) =>{
             if (!err){
                 res.json({Status:'Eliminado correctamente'});
                } else {
                  console.log(err);
                }

            });

        }
    });          
});



//INSERT DE LA TABLA REPORTE GENERAL CON TOKEN
router_r.post("/INSERTARGENERAL/:reporte",verifyToken , (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {

           const { PV_TITULO, PV_TIPO_REPORTE,PV_PERIODO, PV_FORMATO, PD_FEC_INICIAL, PD_FEC_FINAL, PV_CORREO }   = req.body;
           console.log(req.body)
           const query ='call TIENDASM.INSERT_REPGENERALES(?,?,?,?,?,?,?);';
           mysqlConnection.query(query, [PV_TITULO, PV_TIPO_REPORTE,PV_PERIODO, PV_FORMATO, PD_FEC_INICIAL, PD_FEC_FINAL, PV_CORREO  ],(err, rows, fields)=> {
                if (!err){
                  res.json({status:'Datos insertados correctamente'});
                  }else{ 
                  console.log(err)
                }

            });
        }
    });

});


//UPDATE DE LA TABLA REPORTE GENERAL CON TOKEN
router_r.put("/Updatereporte/:PI_COD_REPORTE", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
         try{
              const{ PV_TITULO, PV_TIPO_REPORTE, PV_PERIODO, PV_FORMATO, PD_FEC_INICIAL, PD_FEC_FINAL, PV_CORREO} = req.body;
              const {PI_COD_REPORTE} = req.params;
              const query  = 'call TIENDASM.UPDATE_REPGENERALES(?,?,?,?,?,?,?,?);';
              mysqlConnection.query(query, [PI_COD_REPORTE, PV_TITULO, PV_TIPO_REPORTE,PV_PERIODO, PV_FORMATO, PD_FEC_INICIAL, PD_FEC_FINAL, PV_CORREO  ] , (err, rows, fields) => {
                  if (!err){
                     res.json({Status: 'USUARIO ACTUALIZADO'});
                    } else{
                      console.log(error);//("NO SE ENCONTRÓ NINGÚN DATO.");
                    }
                });

            }catch (error){ 
            console.log(error);
            }
        }
    });

});



//**********************TABLA REPORTE PROGRAMADO************************/
//****METODOS MOSTRAR, SELECCIONAR, INSERTAR, ACTUALIZAR Y ELIMINAR ****/

//mostrar todos los datos de la tabla reporte programado con token
router_r.get('/MOSTRARPROGRAMADO' ,  verifyToken, ( req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {

          mysqlConnection.query('SELECT * FROM TIENDASM.TBL_REP_PROGRAMADOS', (err, rows, fields) =>{
                 if(!err) {
                  res.json(rows)
                } else {
                  console.log(rows);
                }

            });
         }
    });
});



//SELECT DE LA TABLA REPORTE PROGRAMADO CON TOKEN

router_r.get("/SELECIONARPROGRAMADO/:COD_REPORTE", verifyToken, (req, res) =>{
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
           res.send("ACCESO RESTRINGIDO)");
        } else {

          try {
    
               const {COD_REPORTE} = req.params;
               const consulta ='call TIENDASM.SELECT_REPROGRAMADOS(?)';
              mysqlConnection.query(consulta, [COD_REPORTE], (error, results) => {
                 if (error) throw error;
                 if (results.length > 0) {
                     res.json(results);
                    } else {
                     res.send("No pudo traer ningun dato de la BD");
                    }
                });
            }  catch (error) {
              console.log(error);
            }
        }
       
    });        
    
});



// ELIMINAR REPORTE PROGRAMADO CON TOKEN

router_r.delete ("/ELIMINARPROGRAMADO/:COD_REPORTE", verifyToken , (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {

          const {COD_REPORTE} = req.params;
          const sql ='call TIENDASM.DELETE_REPPROGRAMADOS (?)';

           mysqlConnection.query(sql, [COD_REPORTE], (err, results) =>{
               if (!err){
                 res.json({Status:'Eliminado correctamente'});
                } else {
                  console.log(err);
                }

            });
        }

    });
});


//INSERT DE LA TABLA REPORTE PROGRAMADO CON TOKEN

router_r.post("/INSERTARPROGRAMADO/:reporte", verifyToken , (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
          res.send("ACCESO RESTRINGIDO)");
        } else {
          const { PI_COD_REPORTE, PV_TITULO, PV_TIPO_REPORTE,PV_PERIODO, PV_CORREO }   = req.body;
          console.log(req.body)
          const query ='call TIENDASM.INSERT_REPROGRAMADOS(?,?,?,?,?);';
            mysqlConnection.query(query, [PI_COD_REPORTE, PV_TITULO, PV_TIPO_REPORTE,PV_PERIODO, PV_CORREO  ],(err, rows, fields)=> {

                if (!err){
                  res.json({status:'Datos insertados correctamente'});
                }else{ 
                 console.log(err)
                }

            });
        }

    });         

});


//UPDATE DE LA TABLA REPORTE PROGRAMADO CON TOKEN ---- (REPORTE PROGRAMADO NO LLEVA ACTUALIZAR)

/*router_r.put("/Updatereporte/:PI_COD_REPORTE", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {

         try{
              const{ PV_TITULO, PV_TIPO_REPORTE, PV_PERIODO, PV_CORREO} = req.body;
              const {PI_COD_REPORTE} = req.params;
              const query  = 'call TIENDASM.UPDATE_REPROGRAMADOS(?,?,?,?,?);';
                mysqlConnection.query(query, [PI_COD_REPORTE, PV_TITULO, PV_TIPO_REPORTE,PV_PERIODO, PV_CORREO  ] , (err, rows, fields) => {
                     if (!err){
                      res.json({Status: 'USUARIO ACTUALIZADO'});
                    } else{
                       console.log(error);//("NO SE ENCONTRÓ NINGÚN DATO.");
                    }
                });

            }catch (error){ 
              console.log(error);
            }
        }
    });       
});*/



//**********************TABLA REPORTE HISTORICO************************/
//****METODOS MOSTRAR, SELECCIONAR, INSERTAR, ACTUALIZAR Y ELIMINAR ****/

//mostrar todos los datos de la tabla reporte historico con token

router_r.get('/MOSTRARREPHISTORICO' , verifyToken, ( req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
            mysqlConnection.query('SELECT * FROM TIENDASM.TBL_REP_HISTORICOS;', (err, rows, fields) =>{
               if(!err) {
                 res.json(rows)
                } else {
                  console.log(rows);
                }

            });
        }
    }); 
});



//SELECT DE LA TABLA REPORTE HISTORICO CON TOKEN

router_r.get("/SELECIONARHISTORICO/:COD_REPORTE", verifyToken, (req, res) =>{
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
           res.send("ACCESO RESTRINGIDO)");
        } else {

          try {
    
               const {COD_REPORTE} = req.params;
               const consulta ='call TIENDASM.SELECT_REPHISTORICOS(?)';
              mysqlConnection.query(consulta, [COD_REPORTE], (error, results) => {
                 if (error) throw error;
                 if (results.length > 0) {
                     res.json(results);
                    } else {
                     res.send("No pudo traer ningun dato de la BD");
                    }
                });
            }  catch (error) {
              console.log(error);
            }
        }
       
    });        
    
});


// ELIMINAR REPORTE HISTORICO CON TOKEN

router_r.delete ("/ELIMINARHISTORICO/:COD_REPORTE", verifyToken , (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {

          const {COD_REPORTE} = req.params;
          const sql ='call TIENDASM.DELETE_REPHISTORICOS(?)';

           mysqlConnection.query(sql, [COD_REPORTE], (err, results) =>{
               if (!err){
                 res.json({Status:'Eliminado correctamente'});
                } else {
                  console.log(err);
                }

            });
        }

    });
});



//INSERT DE LA TABLA REPORTE HISTORICO CON TOKEN

router_r.post("/INSERTARHISTORICO/:reporte", verifyToken , (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
            const { PI_COD_REPORTE, PV_TITULO, PV_TIPO_REPORTE,PV_FORMATO }   = req.body;
            console.log(req.body)
            const query ='call TIENDASM.INSERT_REPHISTORICOS(?,?,?,?);';
            mysqlConnection.query(query, [PI_COD_REPORTE,PV_TITULO, PV_TIPO_REPORTE,PV_FORMATO  ],(err, rows, fields)=> {

               if (!err){
                   res.json({status:'Datos insertados correctamente'});
               }else{ 
                 console.log(err)
                 }

             });
         }
    });
});




//UPDATE DE LA TABLA REPORTE HISTORICO CON TOKEN

/*router_r.put("/Updatereporte/:PI_COD_REPORTE", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
          try{
             const{ PV_TITULO, PV_TIPO_REPORTE, PV_FORMATO} = req.body;
             const {PI_COD_REPORTE} = req.params;
             const query  = 'call TIENDASM.UPDATE_REPHISTORICOS(?,?,?,?,);';
               mysqlConnection.query(query, [PI_COD_REPORTE, PV_TITULO, PV_TIPO_REPORTE,PV_FORMATO  ] , (err, rows, fields) => {
                   if (!err){
                      res.json({Status: 'USUARIO ACTUALIZADO'});
                    }else{
                      console.log(error);//("NO SE ENCONTRÓ NINGÚN DATO.");
                    }
                });

            }catch (error){ 
             console.log(error);
            }
        }
    });         
});*/






module.exports = router_r;