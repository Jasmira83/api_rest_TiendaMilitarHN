//-------------------AUTOR: JASMIRA ROMELIO UBIDALLA N# 20171032707
//-------------------TBLS: 1. METODOS DE PAGO VENTA, 2.VENTA, 3.DETALLES DE VENTA
//-------------------METODOS: MOSTRAR, SELECCIONAR, INSERTAR, ELIMINAR Y ACTUALIZAR
//-------------------II-PARCIAL-LIC.LESTER FIALLOS, PROGRAMACION E IMPLEMENTACIÓN DE SISTEMA

const { query } = require('express');
const express = require('express');
//MI RUTA VENTA
const router_v = express.Router();
//funcionalidad para usar jsonwebtoken
const jwt = require("jsonwebtoken");

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


//MOSTRAR METODOS DE PAGO
/*router_v.get('/mostrarmetodospagosvent',  verifyToken,(req,res) =>{
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
            mysqlConnection.query('SELECT * FROM TBL_MET_PAGOS_VENT', (err, rows, fields) => {
                if(!err) {
                    res.json(rows);
                } else {
                    console.log(err);
                }
            });
       }
    });

});*/

router_v.get('/mostrarmetodospagosvent', verifyToken, (req,res) =>{
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
            try {
        
                const { PI_COD_MET_PAGO, PV_NOMBRE } = req.params;
                const sql = 'call TIENDASM.SELECT_MET_PAGOS();;';
             mysqlConnection.query(sql, [PI_COD_MET_PAGO, PV_NOMBRE], (error, results)=>{
                if (error) throw error;
                if (results.length > 0) {
                res.json(results);
                } else {
                    res.send("SIN RESULTADOS")
                }
               });  
            } catch (error) {
                console.log(error);
            }
        }
    }); 
});


//SELECIONAR METODO DE PAGO
router_v.get("/SELECTMETPAGO/:COD_MET_PAGO" , verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
           res.send("ACCESO RESTRINGIDO)");
        } else {
           try {

            const {COD_MET_PAGO} = req.params;
            const query ='CALL TIENDASM.SELECT_MET_PAGO (?);';
            mysqlConnection.query(query, [COD_MET_PAGO], (error, results) => {
               if (error) throw error;
               if (results.length > 0) {
                   res.json(results);
               } else {
                    res.send("No pudo traer ningun dato de la BD");
               }
            });
            
            } catch (error) {
               console.log(error);
            }


        }
       
    });

 
});


//INSERTAR METODO DE PAGO
router_v.post("/insertarmetpagos/:insertarmetpago", verifyToken , (req,res)=>{
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
          res.send("ACCESO RESTRINGIDO)");
          } else {

            const { PV_NOMBRE } = req.body;
               console.log(req.body)
            const query ='CALL TIENDASM.INSERTAR_MET_PAGO(?);';
        mysqlConnection.query(query, [PV_NOMBRE],( err, rows, fields)=> {
           if (!err){
            res.json({status:'METODO DE PAGO INGRESADO'});
           }else{
            console.log(err)
           }
        });

        }

    }); 

});



// ELIMINAR METODO DE PAGO CON EL MÉTODO 

router_v.delete("/Eliminarmetpago/:COD_MET_PAGO", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
            const {COD_MET_PAGO} = req.params;
                  console.log(req.body)
            const sql = 'CALL TIENDASM.DELETE_MET_PAGO (?);';
     
            mysqlConnection.query(sql, [COD_MET_PAGO], (err, rows, fields)=>{
             if (!err){
                 res.json({Status: 'METODO DE PAGO ELIMINADA CORRECTAMENTE'});
             } else {
               console.log(err);  
           }
    
           });
        }

    });

});


//FUNCIONA UPDATE METODO DE PAGO
router_v.put("/Updatemetpago/:PI_COD_MET_PAGO", verifyToken,(req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
          try{
            const{ PV_NOMBRE} = req.body;
            const {PI_COD_MET_PAGO} = req.params;
            const query  = 'call TIENDASM.UPDATE_MET_PAGO(?,?);';
             mysqlConnection.query(query, [PI_COD_MET_PAGO, PV_NOMBRE], (err, rows, fields) => {
               if (!err){
                  res.json({Status: 'METODO DE PAGO ACTUALIZADO...'});
                } else{
                    console.log(error);//("NO SE ENCONTRÓ NINGÚN DATO.");
                }
             });
              
            }catch (error) {
              console.log(error);
            }

        }

    });

});




//-------------------TBL: VENTA&DETALLES DE VENTA, METODOS: MOSTRAR, SELECCIONAR, INSERTAR Y ELIMINAR 



//MOSTRAR VENTAS_DETALLESVENTA
router_v.get('/MostrarVenta/:COD_VENTA', verifyToken, (req,res) =>{
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
            try {
        
                const { COD_VENTA } = req.params;
                const sql = 'call TIENDASM.SELECT_VENTA_DETALLES_VENTA();';
             mysqlConnection.query(sql, [COD_VENTA], (error, results)=>{
                if (error) throw error;
                if (results.length > 0) {
                res.json(results);
                } else {
                    res.send("SIN RESULTADOS")
                }
               });  
            } catch (error) {
                console.log(error);
            }
        }
    }); 
});


//SELECIONAR VENTA_DETALLEVENTA (NO SE USARA, No es necesario)

/*router_v.get('/MostrarunoVenta/:COD_VENTA', verifyToken, (req,res) =>{
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
            try {
        
                const { COD_VENTA } = req.params;
                const sql = 'call TIENDASM.SELECT_VENTA_DETALLES_VENTA(?);';
             mysqlConnection.query(sql, [COD_VENTA], (error, results)=>{
                if (error) throw error;
                if (results.length > 0) {
                res.json(results);
                } else {
                    res.send("SIN RESULTADOS")
                }
               });  
            } catch (error) {
                console.log(error);
            }
        }
    }); 
});*/


//INSERTAR VENTA_DETALLESVENTA

router_v.post("/Insertarventadetallesvent", verifyToken , (req,res)=>{
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
          res.send("ACCESO RESTRINGIDO)");
          } else {
            const { PI_COD_CLIENTE, PI_COD_USUARIO, PD_FECHA,PI_NUM_FACTURA,PI_COD_ARTICULO,PI_COD_CANTIDAD,PD_TOTAL,PD_SUB_TOTAL,PD_IMPUESTO,PD_DESCUENTO,PD_TOT_PAGAR,PI_COD_MET_PAGO  } = req.body;
                console.log(req.body)
            const query ='call TIENDASM.INSERTAAR_VENTA_DETALLESVENTA(?,?,?,?,?,?,?,?,?,?,?,?);';
            mysqlConnection.query(query, [PI_COD_CLIENTE, PI_COD_USUARIO, PD_FECHA,PI_NUM_FACTURA,PI_COD_ARTICULO,PI_COD_CANTIDAD,PD_TOTAL,PD_SUB_TOTAL,PD_IMPUESTO,PD_DESCUENTO,PD_TOT_PAGAR,PI_COD_MET_PAGO ],( err, rows, fields)=> {
              if (!err){
                  res.json({status:'VENTA REALIZADO'});
              }else{
                  console.log(err)
                }
            });

        }

    }); 

});


// ELIMINAR VENTA_DETALLEVENTA CON EL MÉTODO DELETE CON TOKEN
router_v.delete("/Eliminarventa/:COD_VENTA", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO)");
        } else {
            const {COD_VENTA } = req.params;
            const sql = 'call TIENDASM.DELETE_VENTA(?);';
          
            mysqlConnection.query(sql, [COD_VENTA], (err, results)=>{
             if (!err){
                 res.json({Status: 'VENTA ELIMINADA CORRECTAMENTE'});
             } else {
              console.log(err);
             }
         
            });
        }

    });

});





module.exports = router_v;