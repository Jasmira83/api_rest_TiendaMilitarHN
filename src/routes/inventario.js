//-------------------AUTOR: JONATHAN CARRASCO N# 
//-------------------TBLS: 1. ARTICULOS, 2.CATEGORIA
//-------------------METODOS: MOSTRAR, SELECCIONAR, INSERTAR, ELIMINAR Y ACTUALIZAR
//-------------------II-PARCIAL-LIC.LESTER FIALLOS, PROGRAMACION E IMPLEMENTACIÓN DE SISTEMA



//constante para mysql
const mysql = require ('mysql');

// npm install --save express mysql body-parser
// npm run start

//constante para express
const express = require ('express');
//funcionalidad para usar jsonwebtoken (se agg)
const jwt = require("jsonwebtoken");
//MI RUTA INVENTARIO (se agg)
const router_i = express.Router();

//variable para los metodos express 
//var app = express();

// constante para el paquete de body-parser
//const bp = require('body-parser');
//const { Router } = require('express');

// enviando los datos de Json a nodejs API
//app.use(bp.json());

//Se agg 
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

//-------------------TBL: CATEGORIA, METODOS: MOSTRAR, SELECCIONAR, INSERTAR  ACTUALIZAR Y ELIMINAR 

 // MOSTRAR CATEGORIAS (TODAS)             BUENO 

  router_i.get('/SELECT_CATS',  verifyToken,(req,res) =>{
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
            mysqlConnection.query("call TIENDASM.SELECT_CAT_ARTICULOS", (err, rows, fields) => {
                if (!err) res.send(rows[0]);
                else console.log(err);
            })
       }
    });

});

// SELECIONAR UNA CATEGORIA                  BUENOOOOO!

  /*router_i.get("/SELECT_CATEGORIA/:COD_CATEGORIA" , verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
           res.send("ACCESO RESTRINGIDO)");
        } else {
           try {
            const { COD_CATEGORIA } = req.body;
            const consulta = `call TIENDASM.SELECT_CAT_ARTICULO('${COD_CATEGORIA}')`;
            mysqlConnection.query(consulta, (error, results) => {
                if (error) throw error;
                if (results.length > 0) {
                     res.json(results[0]);
                } else {
                    res.send("0")
                }
            })            
            } catch (error) {
               console.log(error);
            }


        }
       
    });

 
});*/

router_i.get("/SELECT_CATEGORIA/:COD_CATEGORIA", verifyToken, (req, res) =>{
  jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
         res.send("ACCESO RESTRINGIDO)");
      } else {

        try {
  
             const {COD_CATEGORIA} = req.params;
             const consulta ='call TIENDASM.SELECT_CAT_ARTICULO(?);';
            mysqlConnection.query(consulta, [COD_CATEGORIA], (error, results) => {
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




 //POST  INSERTAR CATEGORIA     BUENOOOO!!!

    router_i.post("/INSERT_CATEGORIA", verifyToken , (req,res)=>{
        jwt.verify(req.token, 'secretkey', (error, authData)=>{
            if (error) {
              res.send("ACCESO RESTRINGIDO)");
              } else {
                const { NOM_CATEGORIA, DESCRIPCION, FEC_REGISTRO}= req.body;
                console.log(req.body)
                    const sql =` call TIENDASM.INSERTAR_CAT_ARTICULO (?, ?, ? );`;
                    //const sql= "call INSERTAR_CAT_ARTICULO (?, ?, ? ); " ;
                    mysqlConnection.query( sql,[NOM_CATEGORIA,DESCRIPCION, FEC_REGISTRO], (err, rows, fields) => {
                   if (!err) res.send("Datos agregados exitosamente");
                   else console.log(err);
                   });
    
            }
    
        }); 
    
    });

// DELETE CATEGORIA ARTICULO            BUENOOOOOO!!

  /*router_i.delete("/DELETE_CAT_ART", verifyToken ,  (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
            const { COD_CATEGORIA} = req.body;
            const mysql = `
            SET @COD_CATEGORIA=?;
            CALL DELETE_CAT_ART(@COD_CATEGORIA);`;
            mysqlConnection.query(
              mysql,
              [COD_CATEGORIA],
             (err, rows, fields) => {
                if (!err) res.send("Categoria Eliminada");
                else console.log(err);
              }
            );
        }

    });

});*/

router_i.delete("/DELETE_CAT_ART/:COD_CATEGORIA", verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
         const {COD_CATEGORIA} = req.params;
         const sql = 'call TIENDASM.DELETE_CAT_ART(?);;';

          mysqlConnection.query(sql, [COD_CATEGORIA], (err, results)=>{
             if (!err){
                res.json({Status: 'CATEGORIA ELIMINADA CORRECTAMENTE'});
              } else {
                console.log(err);

              }

          });
      }
  });  
});

  // UPDATE CATEGORIA ARTICULO     BUENOOOO!

/*router_i.put("/UPDATE_CATEGORIA", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
          try{
            const { COD_CATEGORIA, NOM_CATEGORIA, DESCRIPCION, FEC_REGISTRO } = req.body;
            const sql = `
              SET @COD_CATEGORIA=?;
              SET @NOM_CATEGORIA=?;
              SET @DESCRIPCION=?;
              SET @FEC_REGISTRO=?;
              CALL TIENDASM.UPDATE_CAT_ARTICULO( @COD_CATEGORIA, @NOM_CATEGORIA , @DESCRIPCION, @FEC_REGISTRO);`;
            mysqlConnection.query(
                sql, [COD_CATEGORIA, NOM_CATEGORIA, DESCRIPCION, FEC_REGISTRO ], (err, rows, fields) => {
              if (!err) res.send("Datos actualizados");
              else console.log(err);
                }
            );
            }catch (error) {
              console.log(error);
            }

        }

    });

});*/

router_i.put("/UPDATE_CATEGORIA/:COD_CATEGORIA", verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
          try{
             const {NOM_CATEGORIA, DESCRIPCION, FEC_REGISTRO} = req.body;
             const {COD_CATEGORIA} = req.params;
             const query  = 'call TIENDASM.UPDATE_CAT_ARTICULO(?,?,?,?);';
             mysqlConnection.query(query, [ COD_CATEGORIA, NOM_CATEGORIA, DESCRIPCION, FEC_REGISTRO], (err, rows, fields) => {
                if (!err){
                    res.json({Status: 'CATEGORIA ACTUALIZADA...'});
                  } else {
                     console.log(err); //"NO SE ENCONTRÓ NINGÚN DATO."
                  }
              });

          }catch (error) {
             console.log(error);
          }
      }
  });  
});

//-------------------TBL: ARTICULOS, METODOS: MOSTRAR, SELECCIONAR, INSERTAR, ACTUALIZAR Y ELIMINAR 

//MOSTRAR ARTICULOS

 router_i.get('/SELECT_ARTS',  verifyToken,(req,res) =>{
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
            mysqlConnection.query("call TIENDASM.SELECT_ARTICULOS", (err, rows, fields) => {
                if (!err) res.send(rows[0]);
                else console.log(err);
            });
       }
    });

 });

 //SELECIONAR UN ARTICULO
  /*router_i.get("/SELECT_ART" , verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
           res.send("ACCESO RESTRINGIDO)");
        } else {
           try {
        
            const { COD_ARTICULO } = req.body;
            const consulta = `call TIENDASM.SELECT_ARTICULO('${COD_ARTICULO}')`;
            mysqlConnection.query(consulta, (error, results) => {
                if (error) throw error;
                if (results.length > 0) {
                     res.json(results[0]);
                } else {
                    res.send("0")
                }
            })
            } catch (error) {
               console.log(error);
            }


        }
       
    });

 
});*/

router_i.get("/SELECT_ART/:COD_ARTICULO", verifyToken, (req, res) =>{
  jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
         res.send("ACCESO RESTRINGIDO)");
      } else {

        try {
  
             const {COD_ARTICULO} = req.params;
             const consulta ='call TIENDASM.SELECT_ARTICULO(?);';
            mysqlConnection.query(consulta, [COD_ARTICULO], (error, results) => {
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



  //INSERTAR UN ARTICULO

    /*router_i.post("/INSERT_ARTICULO", verifyToken , (req,res)=>{
        jwt.verify(req.token, 'secretkey', (error, authData)=>{
            if (error) {
              res.send("ACCESO RESTRINGIDO)");
              } else {
                  const { COD_CATEGORIA, NOM_ART, PREC_COMPRA, PREC_VENTA,
                    DESCRIPCION, EXISTENCIAS, ESTADO, FEC_MODIFICACION}= req.body;
                  console.log(req.body)
                      const sql =` call TIENDASM.INSERTAR_ARTICULO (?, ?, ? , ?, ?, ?, ?, ?);`;
                      mysqlConnection.query( sql,[COD_CATEGORIA, NOM_ART, PREC_COMPRA, PREC_VENTA,
                        DESCRIPCION, EXISTENCIAS, ESTADO, FEC_MODIFICACION], (err, rows, fields) => {
                     if (!err) res.send("Datos agregados exitosamente");
                     else console.log(err);
                     });
    
            }
    
        }); 
    
    });*/


    router_i.post("/INSERT_ARTICULO", verifyToken , (req, res) => {
      jwt.verify(req.token, 'secretkey', (error, authData)=>{
          if (error) {
            res.send("ACCESO RESTRINGIDO)");
          } else {
            const { COD_CATEGORIA,NOM_ART,PREC_COMPRA,PREC_VENTA,DESCRIPCION,EXISTENCIAS,ESTADO }   = req.body;
            console.log(req.body)
            const query ='call TIENDASM.INSERTAR_ARTICULO(?,?,?,?,?,?,?);';
              mysqlConnection.query(query, [COD_CATEGORIA,NOM_ART,PREC_COMPRA,PREC_VENTA,DESCRIPCION,EXISTENCIAS,ESTADO  ],(err, rows, fields)=> {
  
                  if (!err){
                    res.json({status:'Datos insertados correctamente'});
                  }else{ 
                   console.log(err)
                  }
  
              });
          }
  
      });         
  
  });

 //ELIMINAR UN ARTICULO

 // DELETE UN ARTICULO                   BUENOOOOO!

 /* router_i.delete("/DELETE_ART", verifyToken ,  (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
            const { COD_ARTICULO} = req.body;
            const mysql = `
            SET @COD_ARTICULO=?;
            CALL DELETE_ARTICULO(@COD_ARTICULO);`;
            mysqlConnection.query(
              mysql,
              [COD_ARTICULO],
             (err, rows, fields) => {
                if (!err) res.send("Articulo Eliminado");
                else console.log(err);
              }
            );
        }

    });

});*/

router_i.delete("/DELETE_ART/:COD_ARTICULO", verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
         const {COD_ARTICULO} = req.params;
         const sql = 'call TIENDASM.DELETE_ARTICULO(?);';

          mysqlConnection.query(sql, [COD_ARTICULO], (err, results)=>{
             if (!err){
                res.json({Status: 'ARTICULO ELIMINADA CORRECTAMENTE'});
              } else {
                console.log(err);

              }

          });
      }
  });  
});


   // UPDATE  ARTICULO     BUENOOOO!!!

 /* router_i.put("/UPDATE_ART", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
          try{
              const { COD_ARTICULO, COD_CATEGORIA, NOM_ART, PREC_COMPRA, PREC_VENTA,
                DESCRIPCION, EXISTENCIAS, ESTADO, FEC_MODIFICACION } = req.body;
              const sql = `
                SET @COD_ARTICULO=?;
                SET @COD_CATEGORIA=?;
                SET @NOM_ART=?;
                SET @PREC_COMPRA=?;
                SET @PREC_VENTA=?;
                SET @DESCRIPCION=?;
                SET @EXISTENCIAS=?;
                SET @ESTADO=?;
                SET @FEC_MODIFICACION=?;
                CALL UPDATE_ARTICULO ( @COD_ARTICULO, @COD_CATEGORIA , @NOM_ART, @PREC_COMPRA, 
                @PREC_VENTA, @DESCRIPCION, @EXISTENCIAS, @ESTADO, @FEC_MODIFICACION);`;
              mysqlConnection.query(
                  sql, [COD_ARTICULO, COD_CATEGORIA, NOM_ART, PREC_COMPRA, PREC_VENTA,
                    DESCRIPCION, EXISTENCIAS, ESTADO, FEC_MODIFICACION ], (err, rows, fields) => {
                if (!err) res.send("Datos actualizados");
                else console.log(err);
                  }
              );

            }catch (error) {
              console.log(error);
            }

        }

    });

});*/



//UPDATE DE LA TABLA REPORTE GENERAL CON TOKEN
router_i.put("/UPDATE_ART/:PI_COD_ARTICULO", verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
       try{
            const{ PI_COD_CATEGORIA,PV_NOM_ART,PF_PREC_COMPRA,PF_PREC_VENTA,PV_DESCRIPCION,PI_EXISTENCIAS,PB_ESTADO} = req.body;
            const {PI_COD_ARTICULO} = req.params;
            const query  = 'call TIENDASM.UPDATE_ARTICULO(?,?,?,?,?,?,?,?);';
            mysqlConnection.query(query, [PI_COD_ARTICULO, PI_COD_CATEGORIA,PV_NOM_ART,PF_PREC_COMPRA,PF_PREC_VENTA,PV_DESCRIPCION,PI_EXISTENCIAS,PB_ESTADO   ] , (err, rows, fields) => {
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



//PI_COD_ARTICULO,PI_COD_CATEGORIA,PV_NOM_ART,PF_PREC_COMPRA,PF_PREC_VENTA,PV_DESCRIPCION,PI_EXISTENCIAS,PB_ESTADO,PF_FECH_MOD

//module.exports = router;
module.exports = router_i;