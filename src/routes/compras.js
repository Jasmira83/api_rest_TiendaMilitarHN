
//----------------------MARYS OLIVA / DORIS IZAGUIRRE --------------------/
//--------------------- TABLA COMPRAS  ----------------------------------/
//****METODOS MOSTRAR, SELECCIONAR, INSERTAR, ACTUALIZAR Y ELIMINAR ****/

//Paquete express
const express=require('express');
const router_c=express.Router();
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

//mostrar todos los datos de la tabla compras con token
router_c.get('/MostrarCompras/',  verifyToken,(req,res) =>{
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
      mysqlConnection.query('SELECT * FROM TIENDASM.TBL_COMPRAS', (err, rows, fields)=>{
          if(!err){
              res.json(rows);
         
            } else {
              console.log(err);
 
            }
 
        });
       }
    });

});



//SELECT DE LA TABLA COMPRAS CON TOKEN
router_c.get("/SelectCompra/:COD_COMPRA" , verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
           res.send("ACCESO RESTRINGIDO)");
        } else {
           try {
        
              const {COD_COMPRA} = req.params;
              const consulta = 'call TIENDASM.SELECT_COMPRAS(?)';
              mysqlConnection.query(consulta, [COD_COMPRA], (error, results) => {
                  if (error) throw error;
                     if (results.length > 0) {
                       res.json(results);
                    } else {
                        res.send("No pudo traer ningún dato de la BD");
                    }
                });

            } catch (error) {
               console.log(error);
            }


        }
       
    });

 
});

//Insertar datos en la tabla compras con token
router_c.post("/Insertcompra", verifyToken , (req,res)=>{
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
          res.send("ACCESO RESTRINGIDO)");
          } else {
          const {PI_COD_PROVEEDOR,PI_COD_ARTICULO,PI_NUM_FACTURA,PD_FECHA,PI_COD_TER_PAGO,PI_CANTIDAD,PI_COS_UNITARIO,PI_TOT_COMPRA}=req.body;
          console.log(req.body)
          const query=` call TIENDASM.INSERTAR_COMPRA(?, ?, ?, ?, ?, ?, ?, ?); `;
          mysqlConnection.query(query,[PI_COD_PROVEEDOR,PI_COD_ARTICULO,PI_NUM_FACTURA,PD_FECHA,PI_COD_TER_PAGO,PI_CANTIDAD,PI_COS_UNITARIO,PI_TOT_COMPRA],(err,rows,fields) => {
     
               if (!err){
                  res.json({Status:'COMPRA INSERTADA/GUARDADA'});
                } else { 
                   console.log(err);
                }


            });

        }

    }); 

});

//Actualizar datos en la tabla compras con token
router_c.put("/ActualizarCompra/:PI_COD_COMPRA", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
          try{
              const {PI_COD_PROVEEDOR, PI_COD_ARTICULO, PI_NUM_FACTURA, PD_FECHA, PI_COD_TER_PAGO, PI_CANTIDAD,PI_COS_UNITARIO, PI_TOT_COMPRA} = req.body;
              const {PI_COD_COMPRA} = req.params;
              const query  = 'call TIENDASM.UPDATE_COMPRAS(?, ?, ?, ?, ?, ?, ?, ?, ?);';
              mysqlConnection.query(query, [PI_COD_COMPRA,PI_COD_PROVEEDOR, PI_COD_ARTICULO, PI_NUM_FACTURA, PD_FECHA, PI_COD_TER_PAGO, PI_CANTIDAD,PI_COS_UNITARIO, PI_TOT_COMPRA], (err, rows, fields) => {
                   if (!err){
                     res.json({Status: 'COMPRA ACTUALIZADO...'});
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


// ELIMINAR COMPRA CON EL MÉTODO DELETE CON TOKEN
router_c.delete("/EliminarCompra/:COD_COMPRA", verifyToken ,  (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
           const {COD_COMPRA} = req.params;
           const sql = 'call TIENDASM.DELETE_COMPRAS(?);';
  
           mysqlConnection.query(sql, [COD_COMPRA], (err, results)=>{
              if (!err){
                 res.json({Status: 'COMPRA ELIMINADA CORRECTAMENTE'});
                } else {
                   console.log(err);
 
                }
 
            });
        }

    });

});


//----------------------MARYS OLIVA / DORIS IZAGUIRRE --------------------/
//---------------------TABLA TERMINOS PAGO COMPRAS  ----------------------------------/
//****METODOS MOSTRAR, SELECCIONAR, INSERTAR, ACTUALIZAR Y ELIMINAR ****/

//mostrar todos los datos de la tabla termino de pagos compras con token
router_c.get('/pagoscompra', verifyToken, (req,res) =>{
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
           mysqlConnection.query('SELECT * FROM TIENDASM.TBL_TER_PAGOS_COMP', (err, rows, fields)=>{
              if(!err){
                  res.json(rows);
         
                } else {
                   console.log(err);
 
                }
 
            });
        }
    }); 
});

//SELECT DE LA TABLA TERMINOS DE COMPRAS CON TOKEN
router_c.get("/SelecTerPago/:COD_TER_PAGO", verifyToken , (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {

            try {
        
             const { COD_TER_PAGO} = req.params;
             const consulta = 'call TIENDASM.SELECT_TERMINOS_PAGOS_COMP(?);';
             mysqlConnection.query(consulta, [ COD_TER_PAGO], (error, results) => {
                   if (error) throw error;
                       if (results.length > 0) {
                        res.json(results);
                    } else {
                      res.send("No pudo traer ningún dato de la BD");
                    }
               });

            } catch (error) {
              console.log(error);
            }
        }
    });
 
});

//INSERT DE LA TABLA TERMINOS DE COMPRAS CON TOKEN
router_c.post("/pagoscompra",verifyToken , (req,res)=>{
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
    
           const {PV_NOMBRE, PV_DESCRIPCION}=req.body;
           console.log(req.body)
           const query=` call TIENDASM.INSERTAR_TER_PAGOS_COMP(?, ?); 
           `;
           mysqlConnection.query(query,[PV_NOMBRE, PV_DESCRIPCION],(err,rows,fields) => {
                if (!err){
                   res.json({Status:'TERMINO PAGO DE COMPRA INSERTADA/GUARDAD CORECTAMENTE'});
                } else { 
                  console.log(err);
                }


            });
        }
    });

});

//UPDATE DE LA TABLA TERMINOS DE COMPRAS CON TOKEN
router_c.put("/ACTUALIZARPAGOSCOMP/:TER_PAGOS_COMP", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
            try{
             const {PV_DESCRIPCION} = req.params;
             const {PV_NOMBRE} = req.params;
             const query  = 'call TIENDASM.UPDATE_MET_PAGO(?,?);';
             mysqlConnection.query(query, [PV_NOMBRE, PV_DESCRIPCION], (err, rows, fields) => {
                  if (!err){
                       res.json({Status: 'TERMINO PAGO DE COMPRA ACTUALIZADO...'});
                    } else {
                       console.log("NO SE ENCONTRÓ NINGÚN DATO.");
                    }
                });

            }catch (error) {
               console.log(error);
            }
        }
    });
});


// DELETE DE LA TABLA TERMINOS DE COMPRAS CON TOKEN 
router_c.delete("/ELIMINARCOPAGO/:COD_TER_PAGO", verifyToken , (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
           const {COD_TER_PAGO} = req.params;
           const sql = 'CALL TIENDASM.DELETE_TER_PAGOS_COMP (?)';
  
            mysqlConnection.query(sql, [COD_TER_PAGO], (err, results)=>{
               if (!err){
                   res.json({Status: 'TERMINO PAGO DE COMPRA ELIMINADO CORRECTAMENTE'});
                } else {
                   console.log(err);
 
                }
 
            });
        }
    });           
 
});


//----------------------MARYS OLIVA / DORIS IZAGUIRRE --------------------/
//--------------------- TABLA ORDEN COMPRA  ----------------------------------/
//****METODOS MOSTRAR, SELECCIONAR, INSERTAR, ACTUALIZAR Y ELIMINAR ****/


//MOSTRAR TODOS LOS DATOS DE LA TABLA ORDEN COMPRA CON TOKEN
router_c.get('/MostrarOrdenCompra/',verifyToken ,(req,res) =>{
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
            mysqlConnection.query('SELECT * FROM TIENDASM.TBL_ORDENES_COMP;', (err, rows, fields)=>{
              if(!err){
                  res.json(rows);
         
                } else {
                   console.log(err);
 
                }
 
            });
        }

    });

});

//SELECT DE LA TABLA ORDEN COMPRA CON TOKEN
router_c.get("/SelectOrdenCompra/:COD_ORDEN_COMP", verifyToken , (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {

          try {
        
               const {COD_ORDEN_COMP} = req.params;
               const consulta = 'call TIENDASM.SELECT_ORDENES_COMP(?);';
                mysqlConnection.query(consulta, [COD_ORDEN_COMP], (error, results) => {
                  if (error) throw error;
                       if (results.length > 0) {
                       res.json(results);
                    } else {
                      res.send("No pudo traer ningún dato de la BD");
                    }
                });

            } catch (error) {
              console.log(error);
            }
        }
    });
 
});


//INSERTAR DATOS EN LA TABLA ORDEN COMPRA con token
router_c.post("/InsertOrdencompra", verifyToken , (req,res)=>{
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO");
        } else {
           const {PI_COD_COMPRA,PD_FEC_PEDIDO,PD_FEC_ENTREGA,PV_LUGAR_ENTREGA,PI_COD_ARTICULO,PI_CANTIDAD}=req.body;
           console.log(req.body)
           const query=` call TIENDASM.INSERTAR_ORDEN_COMP(?,?, ?, ?, ?,?);`;
           mysqlConnection.query(query,[PI_COD_COMPRA,PD_FEC_PEDIDO,PD_FEC_ENTREGA,PV_LUGAR_ENTREGA,PI_COD_ARTICULO,PI_CANTIDAD],(err,rows,fields) => {
              if (!err){
                  res.json({Status:'ORDEN COMPRA INSERTADA'});
                } else { 
                   console.log(err);
                }


            });
        }
    });

});




//Actualizar datos en la tabla orden compras con token
router_c.put("/ActualizarOrdencompra/:PI_COD_ORDEN_COMP", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO");
        } else {
           try{
              const {PI_COD_COMPRA, PD_FEC_PEDIDO,PD_FEC_ENTREGA,PV_LUGAR_ENTREGA,PI_COD_ARTICULO ,PI_CANTIDAD} = req.body;
              const {PI_COD_ORDEN_COMP} = req.params;
              const query  = 'call TIENDASM.UPDATE_ORDENES_COMP(?, ?, ?, ?, ?, ?, ?);';
              mysqlConnection.query(query, [PI_COD_ORDEN_COMP,PI_COD_COMPRA, PD_FEC_PEDIDO,PD_FEC_ENTREGA,PV_LUGAR_ENTREGA,PI_COD_ARTICULO ,PI_CANTIDAD], (err, rows, fields) => {
                  if (!err){
                     res.json({Status: 'ORDEN COMPRA ACTUALIZADA...'});
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

// ELIMINAR ORDEN COMPRA CON EL MÉTODO DELETE
router_c.delete("/EliminarOrdencompra/:COD_ORDEN_COMP", verifyToken,  (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
          const {COD_ORDEN_COMP} = req.params;
          const sql = 'call TIENDASM.DELETE_ORDENES_COMP(?);';
  
          mysqlConnection.query(sql, [COD_ORDEN_COMP], (err, results)=>{
              if (!err){
                  res.json({Status: 'ORDEN COMPRA ELIMINADA CORRECTAMENTE'});
                } else {
                  console.log(err);
 
                }
 
            });
        }
    }); 
    
});


//----------------------MARYS OLIVA / DORIS IZAGUIRRE --------------------/
//--------------------- TABLA DEVOLUCIONES COMPRAS ----------------------/
//****METODOS MOSTRAR, SELECCIONAR, INSERTAR, ACTUALIZAR Y ELIMINAR ****/

//mostrar todos los datos de la tabla devolucion compras
router_c.get('/MostrarDevoluCompra/', verifyToken, (req,res) =>{
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
           mysqlConnection.query('SELECT * FROM TIENDASM.TBL_DEVOLUCIONES_COMP;', (err, rows, fields)=>{
             if(!err){
                  res.json(rows);
         
                } else {
                  console.log(err);
 
                }
 
            });
        }
    });  
});


//SELECT DE LA TABLA devolucion compra
router_c.get("/SelectDevoluCompra/:COD_DEVOLUCION_COMPRA", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
            try {
        
             const {COD_DEVOLUCION_COMPRA} = req.params;
             const consulta = 'call TIENDASM.SELECT_DEVOLUCIONES_COMPRA(7);';
             mysqlConnection.query(consulta, [COD_DEVOLUCION_COMPRA], (error, results) => {
                  if (error) throw error;
                     if (results.length > 0) {
                      res.json(results);
                    } else {
                       res.send("No pudo traer ningún dato de la BD");
                    }
               });

            } catch (error) {
              console.log(error);
            }
    
        }
    }); 

});


//Insertar datos en la tabla devolucion compra
router_c.post("/InsertDevoluCompra", verifyToken, (req,res)=>{
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
            const {PI_COD_ORDEN_COMP,PV_DESCR_DEVOLUCION,PI_CANTIDAD,PI_TOTAL}=req.body;
            console.log(req.body)
            const query=` call TIENDASM.INSERTAR_DEVOLUCIONES_COMPRA(?, ?, ?, ?);`;
            mysqlConnection.query(query,[PI_COD_ORDEN_COMP,PV_DESCR_DEVOLUCION,PI_CANTIDAD,PI_TOTAL],(err,rows,fields) => {
     
              if (!err){
                  res.json({Status:'DEVOLUCION COMPRA INSERTADA/GUARDADA CORRECTAMENTE'});
               } else { 
                    console.log(err);
                }


            });
        }
    });  

});


//Actualizar datos en la tabla devolucion compra
router_c.put("/ActualizarDevoluCompra/:PI_COD_DEVOLUCION_COMPRA", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
          try{
                const {PI_COD_ORDEN_COMP,PV_DESCR_DEVOLUCION,PI_CANTIDAD,PI_TOTAL} = req.body;
                const {PI_COD_DEVOLUCION_COMPRA} = req.params;
                const query  = 'call TIENDASM.UPDATE_DEVOLUCION_COMPRA(?, ?, ?, ?, ?);';
                mysqlConnection.query(query, [PI_COD_DEVOLUCION_COMPRA,PI_COD_ORDEN_COMP,PV_DESCR_DEVOLUCION,PI_CANTIDAD,PI_TOTAL], (err, rows, fields) => {
                   if (!err){
                       res.json({Status: 'DEVOLUCION COMPRA ACTUALIZADA...'});
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

  // ELIMINAR devolucion compra CON EL MÉTODO DELETE
router_c.delete("/EliminarDevoluCompra/:COD_DEVOLUCION_COMPRA", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
           const {COD_DEVOLUCION_COMPRA} = req.params;
           const sql = 'call TIENDASM.DELETE_DEVOLUCIONES_COMP(?);';
  
           mysqlConnection.query(sql, [COD_DEVOLUCION_COMPRA], (err, results)=>{
              if (!err){
                 res.json({Status: 'DEVOLUCION COMPRA ELIMINADA CORRECTAMENTE'});
                } else {
                   console.log(err);
 
                }
 
             });
        }
    });  
});
  
  

//----------------------MARYS OLIVA / DORIS IZAGUIRRE --------------------/
//--------------------- TABLA FACTURAS COMPRA  --------------------------/
//****METODOS MOSTRAR, SELECCIONAR, INSERTAR, ACTUALIZAR Y ELIMINAR ****/


//mostrar todos los datos de la tabla factura compras
router_c.get('/MostrarFactCompra/', verifyToken,(req,res) =>{
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
           mysqlConnection.query('SELECT * FROM TIENDASM.TBL_FACTURAS_COMPRAS;', (err, rows, fields)=>{
               if(!err){
                  res.json(rows);
         
                } else {
                   console.log(err);
 
                }
 
            });
        }
    });  

});


//SELECT DE LA TABLA FACTURA COMPRAS
router_c.get("/SelectFactCompra/:COD_ARCH_FACT_COMPRA", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
            try {
        
             const {COD_ARCH_FACT_COMPRA} = req.params;
             const consulta = 'call TIENDASM.SELECT_FACTURAS_COMPRAS(?);';
             mysqlConnection.query(consulta, [COD_ARCH_FACT_COMPRA], (error, results) => {
                  if (error) throw error;
                  if (results.length > 0) {
                       res.json(results);
                    } else {
                       res.send("No pudo traer ningún dato de la BD");
                    }
                });

            } catch (error) {
               console.log(error);
            }
        }
    });     
 
});


//Insertar datos en la tabla fatura compras 
router_c.post("/InsertFactCompra", verifyToken, (req,res)=>{
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
            const {PI_COD_ORDEN_COMP,PI_COD_COMPRA,PD_FEC_INGRESO,PV_TIPO_COMPRA,PV_ESTADO,PV_FACT_FISICA}=req.body;
            console.log(req.body)
            const query=` call TIENDASM.INSERTAR_FACTURAS_COMPRAS(?, ?, ?, ?, ?, ?); `;
            mysqlConnection.query(query,[PI_COD_ORDEN_COMP,PI_COD_COMPRA,PD_FEC_INGRESO,PV_TIPO_COMPRA,PV_ESTADO,PV_FACT_FISICA],(err,rows,fields) => {
     
              if (!err){
                  res.json({Status:'FACTURA COMPRA INSERTADA/GUARDADA CORRECTAMENTE'});
                } else { 
                   console.log(err);
                }


            });
        }
    });   

});


//Actualizar datos en la tabla factura compras
router_c.put("/ActualizarFactCompra/:PI_COD_ARCH_FACT_COMPRA", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
            try{
               const {PI_COD_ORDEN_COMP, PI_COD_COMPRA, PD_FEC_INGRESO,PV_TIPO_COMPRA,PV_ESTADO,PV_FACT_FISICA} = req.body;
               const {PI_COD_ARCH_FACT_COMPRA} = req.params;
               const query  = 'call TIENDASM.UPDATE_FACTURAS_COMPRAS(?,?,?,?,?,?,?);';
               mysqlConnection.query(query, [PI_COD_ARCH_FACT_COMPRA,PI_COD_ORDEN_COMP, PI_COD_COMPRA, PD_FEC_INGRESO,PV_TIPO_COMPRA,PV_ESTADO,PV_FACT_FISICA], (err, rows, fields) => {
                  if (!err){
                      res.json({Status: 'FACTURA COMPRA ACTUALIZADA...'});
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



  // ELIMINAR FACTURA COMPRA CON EL MÉTODO DELETE
router_c.delete("/EliminarFactCompra/:COD_ARCH_FACT_COMPRA", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
           const {COD_ARCH_FACT_COMPRA} = req.params;
           const sql = 'call TIENDASM.DELETE_FACTURAS_COMP(?);';
  
            mysqlConnection.query(sql, [COD_ARCH_FACT_COMPRA], (err, results)=>{
               if (!err){
                  res.json({Status: 'FACTURA COMPRA ELIMINADA CORRECTAMENTE'});
                } else {
                  console.log(err);
 
                }
 
            });
        }
    });  
});





module.exports=router_c;