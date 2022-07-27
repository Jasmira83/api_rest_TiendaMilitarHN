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
            mysqlConnection.query("call SELECT_CAT_ARTICULOS", (err, rows, fields) => {
                if (!err) res.send(rows[0]);
                else console.log(err);
            })
       }
    });

});

// SELECIONAR UNA CATEGORIA                  BUENOOOOO!

  router_i.get("/SELECT_CATEGORIA" , verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
           res.send("ACCESO RESTRINGIDO)");
        } else {
           try {
            const { COD_CATEGORIA } = req.body;
            const consulta = `call SELECT_CAT_ARTICULO('${COD_CATEGORIA}')`;
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

 
});

 //POST  INSERTAR CATEGORIA     BUENOOOO!!!

    router_i.post("/INSERT_CATEGORIA", verifyToken , (req,res)=>{
        jwt.verify(req.token, 'secretkey', (error, authData)=>{
            if (error) {
              res.send("ACCESO RESTRINGIDO)");
              } else {
                const { NOM_CATEGORIA, DESCRIPCION, FEC_REGISTRO}= req.body;
                console.log(req.body)
                    const sql =` call INSERTAR_CAT_ARTICULO (?, ?, ? );`;
                    //const sql= "call INSERTAR_CAT_ARTICULO (?, ?, ? ); " ;
                    mysqlConnection.query( sql,[NOM_CATEGORIA,DESCRIPCION, FEC_REGISTRO], (err, rows, fields) => {
                   if (!err) res.send("Datos agregados exitosamente");
                   else console.log(err);
                   });
    
            }
    
        }); 
    
    });

// DELETE CATEGORIA ARTICULO            BUENOOOOOO!!

  router_i.delete("/DELETE_CAT_ART", verifyToken ,  (req, res) => {
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

});

  // UPDATE CATEGORIA ARTICULO     BUENOOOO!

router_i.put("/UPDATE_CATEGORIA", verifyToken, (req, res) => {
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
              CALL UPDATE_CAT_ARTICULO( @COD_CATEGORIA, @NOM_CATEGORIA , @DESCRIPCION, @FEC_REGISTRO);`;
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

});

//-------------------TBL: ARTICULOS, METODOS: MOSTRAR, SELECCIONAR, INSERTAR, ACTUALIZAR Y ELIMINAR 

//MOSTRAR ARTICULOS

 router_i.get('/SELECT_ARTS',  verifyToken,(req,res) =>{
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
            mysqlConnection.query("call SELECT_ARTICULOS", (err, rows, fields) => {
                if (!err) res.send(rows[0]);
                else console.log(err);
            });
       }
    });

 });

 //SELECIONAR UN ARTICULO
  router_i.get("/SELECT_ART" , verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
           res.send("ACCESO RESTRINGIDO)");
        } else {
           try {
        
            const { COD_ARTICULO } = req.body;
            const consulta = `call SELECT_ARTICULO('${COD_ARTICULO}')`;
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

 
});
  //INSERTAR UN ARTICULO

    router_i.post("/INSERT_ARTICULO", verifyToken , (req,res)=>{
        jwt.verify(req.token, 'secretkey', (error, authData)=>{
            if (error) {
              res.send("ACCESO RESTRINGIDO)");
              } else {
                  const { COD_CATEGORIA, NOM_ART, PREC_COMPRA, PREC_VENTA,
                    DESCRIPCION, EXISTENCIAS, ESTADO, FEC_MODIFICACION}= req.body;
                  console.log(req.body)
                      const sql =` call INSERTAR_ARTICULO (?, ?, ? , ?, ?, ?, ?, ?);`;
                      mysqlConnection.query( sql,[COD_CATEGORIA, NOM_ART, PREC_COMPRA, PREC_VENTA,
                        DESCRIPCION, EXISTENCIAS, ESTADO, FEC_MODIFICACION], (err, rows, fields) => {
                     if (!err) res.send("Datos agregados exitosamente");
                     else console.log(err);
                     });
    
            }
    
        }); 
    
    });

 //ELIMINAR UN ARTICULO

 // DELETE UN ARTICULO                   BUENOOOOO!

  router_i.delete("/DELETE_ART", verifyToken ,  (req, res) => {
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

});

   // UPDATE  ARTICULO     BUENOOOO!!!

  router_i.put("/UPDATE_ART", verifyToken, (req, res) => {
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

});


//module.exports = router;
module.exports = router_i;