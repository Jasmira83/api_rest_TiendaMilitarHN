//******************** Christian Alfredo Castro, Ana Elizabeth Valladarez M.*********************/
//******************** Modulos de personas  ***********************************/
//****METODOS MOSTRAR, SELECCIONAR, INSERTAR, ACTUALIZAR Y ELIMINAR ****/
//Paquete express
const express=require('express');
const router_p = express.Router();
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


//insertar personas
router_p.post("/Insertarpersonas", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
       if (error) {
       res.send("ACCESO RESTRINGIDO)");
       } else {
        const {primer_nombre,segundo_nombre,primer_apellido ,segudo_apellido,dni,fecha_nacimiento,estado_civil,sex,per} = req.body
        console.log(req.body)                      
        const query =`
        CALL TIENDASM.INSERTAR_PERSONA(?,?,?,?,?,?,?,?,?);
        `;
     mysqlConnection.query(query, [primer_nombre,segundo_nombre,primer_apellido ,segudo_apellido,dni,fecha_nacimiento,estado_civil,sex,per], (err, rows, fields) => {
        if (!err){
             res.json({status:'Datos insertados correctamente'});
     } else {
          console.log(err);
     
 
       }
   });
       }
   });      
});


//insertar usuario
router_p.post("/Insertarusuario", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
       if (error) {
       res.send("ACCESO RESTRINGIDO)");
       } else {
        const {cod_persona,usuario,email,contraseña,img} = req.body
        console.log(req.body)                      
        const query =`
        CALL TIENDASM.INSERTAR_USUARIOS(?,?,?,?,?);
        `;
     mysqlConnection.query(query, [cod_persona,usuario,email,contraseña,img], (err, rows, fields) => {
        if (!err){
             res.json({status:'Datos insertados correctamente'});
     } else {
          console.log(err);
     
 
       }
   });
       }
   });      
 });


 //insertar clientes
router_p.post("/Insertarclientes", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
       if (error) {
       res.send("ACCESO RESTRINGIDO)");
       } else {
        const {cod_persona, lim_credito} = req.body
        console.log(req.body)                      
        const query =`
        CALL TIENDASM.INSERTAR_CLIENTE(?,?);
        `;
     mysqlConnection.query(query, [cod_persona, lim_credito], (err, rows, fields) => {
        if (!err){
             res.json({status:'Datos insertados correctamente'});
     } else {
          console.log(err);
     
 
       }
   });
       }
   });      
 });


 //insertar Proveedores
 router_p.post("/Insertarproveedores", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
       if (error) {
       res.send("ACCESO RESTRINGIDO)");
       } else {
        const {cod_persona,nombre_proveedor,nombre_contacto} = req.body
        console.log(req.body)                      
        const query =`
        CALL TIENDASM.INSERTAR_PROVEEDORES(?,?,?);
        `;
     mysqlConnection.query(query, [cod_persona,nombre_proveedor,nombre_contacto], (err, rows, fields) => {
        if (!err){
             res.json({status:'Datos insertados correctamente'});
     } else {
          console.log(err);
     
 
       }
   });
       }
   });      
 });


 //insertar Preguntas
 router_p.post("/Insertarpregunta", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
       if (error) {
       res.send("ACCESO RESTRINGIDO)");
       } else {
        const {Pregunta,Creado_por,modificado_por} = req.body
        console.log(req.body)                      
        const query =`
        CALL TIENDASM.INSERTAR_PREGUNTAS(?,?,?);
        `;
     mysqlConnection.query(query, [Pregunta,Creado_por,modificado_por], (err, rows, fields) => {
        if (!err){
             res.json({status:'Datos insertados correctamente'});
     } else {
          console.log(err);
     
 
       }
   });
       }
   });      
 });


 //insertar pregunta usuario
 router_p.post("/Insertarpreguntausuario", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
       if (error) {
       res.send("ACCESO RESTRINGIDO)");
       } else {
        const {Cod_pregunta,Cod_usuario,respuesta} = req.body
        console.log(req.body)                      
        const query =`
        CALL TIENDASM.INSERTAR_PREGUNTAS_USUARIO(?,?,?);
        `;
     mysqlConnection.query(query, [Cod_pregunta,Cod_usuario,respuesta], (err, rows, fields) => {
        if (!err){
             res.json({status:'Datos insertados correctamente'});
     } else {
          console.log(err);
     
 
       }
   });
       }
   });      
 });


 //insertar roles
 router_p.post("/Insertarroles", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
       if (error) {
       res.send("ACCESO RESTRINGIDO)");
       } else {
        const {nombre_rol} = req.body
        console.log(req.body)                      
        const query =`
        CALL TIENDASM.INSERTAR_ROL(?);
        `;
     mysqlConnection.query(query, [nombre_rol], (err, rows, fields) => {
        if (!err){
             res.json({status:'Datos insertados correctamente'});
     } else {
          console.log(err);
     
 
       }
   });
       }
   });      
 });


 //insertar telefonos
 router_p.post("/Insertartelefono", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
       if (error) {
       res.send("ACCESO RESTRINGIDO)");
       } else {
        const {Tel,Tip_telefono} = req.body
        console.log(req.body)                      
        const query =`
        CALL TIENDASM.INSERTAR_TELEFONO(?,?);
        `;
     mysqlConnection.query(query, [Tel,Tip_telefono], (err, rows, fields) => {
        if (!err){
             res.json({status:'Datos insertados correctamente'});
     } else {
          console.log(err);
     
 
       }
   });
       }
   });      
 });


 //insertar correos
 router_p.post("/Insertarcorreo", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
       if (error) {
       res.send("ACCESO RESTRINGIDO)");
       } else {
        const {Correo} = req.body
        console.log(req.body)                      
        const query =`
        CALL TIENDASM.INSERTAR_CORREO(?);
        `;
     mysqlConnection.query(query, [Correo], (err, rows, fields) => {
        if (!err){
             res.json({status:'Datos insertados correctamente'});
     } else {
          console.log(err);
     
 
       }
   });
       }
   });      
 });

  //insertar paises
  router_p.post("/Insertarpaises", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
       if (error) {
       res.send("ACCESO RESTRINGIDO)");
       } else {
        const {Cod_estado,Descripcion} = req.body
        console.log(req.body)                      
        const query =`
        CALL TIENDASM.INSERTAR_PAISES(?,?);
        `;
     mysqlConnection.query(query, [Cod_estado,Descripcion], (err, rows, fields) => {
        if (!err){
             res.json({status:'Datos insertados correctamente'});
     } else {
          console.log(err);
     
 
       }
   });
       }
   });      
 });


 //insertar Estados
 router_p.post("/Insertarestados", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
       if (error) {
       res.send("ACCESO RESTRINGIDO)");
       } else {
        const {Cod_Cuidad,Descripcion} = req.body
        console.log(req.body)                      
        const query =`
        CALL TIENDASM.INSERTAR_ESTADOS(?,?);
        `;
     mysqlConnection.query(query, [Cod_Cuidad,Descripcion], (err, rows, fields) => {
        if (!err){
             res.json({status:'Datos insertados correctamente'});
     } else {
          console.log(err);
     
 
       }
   });
       }
   });      
 });


 //insertar Cuidades
 router_p.post("/Insertarcuidades", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
       if (error) {
       res.send("ACCESO RESTRINGIDO)");
       } else {
        const {Descripcion} = req.body
        console.log(req.body)                      
        const query =`
        CALL TIENDASM.INSERTAR_CIUDADES(?);
        `;
     mysqlConnection.query(query, [Descripcion], (err, rows, fields) => {
        if (!err){
             res.json({status:'Datos insertados correctamente'});
     } else {
          console.log(err);
     
 
       }
   });
       }
   });      
 });



 /*procedimientos para actualizar*/

    //Update Usuarios
    router_p.put("/Updateusuarios/:Cod_usuario", verifyToken, (req, res) => {
        jwt.verify(req.token, 'secretkey', (error, authData)=>{
            if (error) {
            res.send("ACCESO RESTRINGIDO");
            } else {
              try{
                  const {Cod_persona,usuario,email,contraseña,img} = req.body;
                  const {Cod_usuario} = req.params;
                  const query  = 'CALL TIENDASM.UPDATE_USUARIOS(?,?,?,?,?,?);';
                  mysqlConnection.query(query, [Cod_usuario,Cod_persona,usuario,email,contraseña,img], (err, rows, fields) => {
                       if (!err){
                         res.json({Status: 'USUARIO ACTUALIZADO...'});
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

    

        //Update clientes
        router_p.put("/Updateclientes/:Cod_cliente", verifyToken, (req, res) => {
            jwt.verify(req.token, 'secretkey', (error, authData)=>{
                if (error) {
                res.send("ACCESO RESTRINGIDO");
                } else {
                  try{
                      const {Cod_persona,lim_credito} = req.body;
                      const {Cod_cliente} = req.params;
                      const query  = 'CALL TIENDASM.UPDATE_CLIENTE(?,?,?);';
                      mysqlConnection.query(query, [Cod_cliente,Cod_persona,lim_credito], (err, rows, fields) => {
                           if (!err){
                             res.json({Status: 'USUARIO ACTUALIZADO...'});
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


         //Update proveedores
    router_p.put("/Updateproveedores/:cod_proveedor", verifyToken, (req, res) => {
        jwt.verify(req.token, 'secretkey', (error, authData)=>{
            if (error) {
            res.send("ACCESO RESTRINGIDO");
            } else {
              try{
                  const {cod_persona,nombre_proveedor,nombre_contacto} = req.body;
                  const {cod_proveedor} = req.params;
                  const query  = 'CALL TIENDASM.UPDATE_PROVEDOR(?,?,?,?);';
                  mysqlConnection.query(query, [cod_proveedor,cod_persona,nombre_proveedor,nombre_contacto], (err, rows, fields) => {
                       if (!err){
                         res.json({Status: 'USUARIO ACTUALIZADO...'});
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


     //Update pregunta
     router_p.put("/Updatepreguntas/:Cod_pregunta", verifyToken, (req, res) => {
        jwt.verify(req.token, 'secretkey', (error, authData)=>{
            if (error) {
            res.send("ACCESO RESTRINGIDO");
            } else {
              try{
                  const {Pregunta,Creado_por,modificado_por} = req.body;
                  const {Cod_pregunta} = req.params;
                  const query  = 'CALL TIENDASM.UPDATE_PREGUNTAS(?,?,?,?);';
                  mysqlConnection.query(query, [Cod_pregunta,Pregunta,Creado_por,modificado_por], (err, rows, fields) => {
                       if (!err){
                         res.json({Status: 'USUARIO ACTUALIZADO...'});
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



    //Update pregunta usuario
    router_p.put("/Updatepreguntasusuario/:Cod_pregunta_usuario", verifyToken, (req, res) => {
        jwt.verify(req.token, 'secretkey', (error, authData)=>{
            if (error) {
            res.send("ACCESO RESTRINGIDO");
            } else {
              try{
                  const {Cod_pregunta,Cod_usuario,respuesta} = req.body;
                  const {Cod_pregunta_usuario} = req.params;
                  const query  = 'CALL TIENDASM.PREGUNTAS_USUARIO(?,?,?,?);';
                  mysqlConnection.query(query, [Cod_pregunta_usuario,Cod_pregunta,Cod_usuario,respuesta], (err, rows, fields) => {
                       if (!err){
                         res.json({Status: 'USUARIO ACTUALIZADO...'});
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


   //Update pregunta roles
   router_p.put("/Updateroles/:cod_rol", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO");
        } else {
          try{
              const {nombre_rol} = req.body;
              const {cod_rol} = req.params;
              const query  = 'CALL TIENDASM.UPDATE_ROL(?,?);';
              mysqlConnection.query(query, [cod_rol,nombre_rol], (err, rows, fields) => {
                   if (!err){
                     res.json({Status: 'USUARIO ACTUALIZADO...'});
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

//Update pregunta Personas
router_p.put("/Updatepersonas/:cod_persona", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO");
        } else {
          try{
              const {primer_nombre,segundo_nombre,primer_apellido,segudo_apellido,dni,fecha_nacimiento,estado_civil,sex,per} = req.body;
              const {cod_persona} = req.params;
              const query  = 'CALL TIENDASM.UPDATE_PERSONAS(?,?,?,?,?,?,?,?,?,?);';
              mysqlConnection.query(query, [cod_persona,primer_nombre,segundo_nombre,primer_apellido ,segudo_apellido,dni,fecha_nacimiento,estado_civil,sex,per], (err, rows, fields) => {
                   if (!err){
                     res.json({Status: 'USUARIO ACTUALIZADO...'});
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


//Update pregunta correo
router_p.put("/Updatecorreo/:cod_correo", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO");
        } else {
          try{
              const {correo} = req.body;
              const {cod_correo} = req.params;
              const query  = 'CALL TIENDASM.UPDATE_CORREOS(?,?);';
              mysqlConnection.query(query, [cod_correo,correo], (err, rows, fields) => {
                   if (!err){
                     res.json({Status: 'USUARIO ACTUALIZADO...'});
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


//Update telefono
router_p.put("/Updatetelefono/:Cod_telefono", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO");
        } else {
          try{
              const {Telefono,Tipo_telefono} = req.body;
              const {Cod_telefono} = req.params;
              const query  = 'CALL TIENDASM.UPDATE_TELEFONOS(?,?,?);';
              mysqlConnection.query(query, [Cod_telefono,Telefono,Tipo_telefono], (err, rows, fields) => {
                   if (!err){
                     res.json({Status: 'USUARIO ACTUALIZADO...'});
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


//Update Paises
router_p.put("/Updatepaises/:cod_pais", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO");
        } else {
          try{
              const {cod_estado,Descripcion} = req.body;
              const {cod_pais} = req.params;
              const query  = 'CALL TIENDASM.UPDATE_PAISES(?,?,?);';
              mysqlConnection.query(query, [cod_pais,cod_estado,Descripcion], (err, rows, fields) => {
                   if (!err){
                     res.json({Status: 'USUARIO ACTUALIZADO...'});
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


//Update estados
router_p.put("/Updateestados/:cod_estados",verifyToken ,  (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO");
        } else {
          try{
              const {cod_ciudad,Descripcion} = req.body;
              const {cod_estados} = req.params;
              const query  = 'CALL TIENDASM.UPDATE_ESTADOS(?,?,?);';
              mysqlConnection.query(query, [cod_estados,cod_ciudad,Descripcion], (err, rows, fields) => {
                   if (!err){
                     res.json({Status: 'USUARIO ACTUALIZADO...'});
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


router_p.put("/Updatecuidades/:Cod_Cuidad", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
        if (error) {
        res.send("ACCESO RESTRINGIDO");
        } else {
          try{
              const {Descripcion} = req.body;
              const {Cod_Cuidad} = req.params;
              const query  = 'CALL TIENDASM.UPDATE_CUIDADES(?,?);';
              mysqlConnection.query(query, [Cod_Cuidad,Descripcion], (err, rows, fields) => {
                   if (!err){
                     res.json({Status: 'USUARIO ACTUALIZADO...'});
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



//--------------------------------------------------------------------------------

//MOSTRAR

router_p.get('/Personas/',  verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (error, authData)=>{
       if (error) {
       res.send("ACCESO RESTRINGIDO)");
       } else {
       mysqlConnection.query('SELECT * FROM TIENDASM.TBL_PERSONAS', (err, rows, fields) => {
         if(!err) {
          res.json(rows);
          } else {
           console.log(err);
          }
        });
      }
    });
  });


  //SELECCIONAR

router_p.get('/personas/:COD_PERSONA',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
        res.send("ACCESO RESTRINGIDO)");
      } else {
  
      const {COD_PERSONA} = req.params;
      mysqlConnection.query('SELECT * FROM TIENDASM.TBL_PERSONAS WHERE COD_PERSONA= ?', [COD_PERSONA], (err, rows, fields) => {
        if(!err) {
          res.json(rows[0]);
        } else {
          console.log(err);
        }
      });
     }      
    });
  });


  //ELIMINAR

router_p.delete("/eliminarpersonas/:COD_PERSONA",  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
  
      const {COD_PERSONA} = req.body;
        console.log(req.body)   
      const sql = 'CALL TIENDASM.DELETE_PERSONAS (?);';
  
      mysqlConnection.query(sql, [COD_PERSONA], (err, rows, fields)=>{
        if(!err) {
          res.json({Status:'PERSONA ELIMINADA CORRECTAMENTE'});
        } else {
          console.log(err);
        }
      });
     }
    }); 
  });


  //MOSTRAR

router_p.get('/Mostrarclientes/', (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
  
      mysqlConnection.query('SELECT * FROM TIENDASM.TBL_CLIENTES', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
      });  
     }
    });
  });

  
  //SELECCIONAR

router_p.get('/clientes/:COD_CLIENTE',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
      const {COD_CLIENTE} = req.params;
      mysqlConnection.query('SELECT * FROM TIENDASM.TBL_CLIENTES WHERE COD_CLIENTE= ?', [COD_CLIENTE], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
      });
     }
    });
  });

  //ELIMINAR

router_p.delete("/eliminarclientes/:COD_CLIENTE",  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
  
    const {COD_CLIENTE} = req.params;  
    const sql = 'CALL TIENDASM.DELETE_CLIENTES (?);';
  
     mysqlConnection.query(sql, [COD_CLIENTE], (err, rows, fields)=>{
        if(!err) {
            res.json({Status:'CLIENTE ELIMINADO CORRECTAMENTE'});
        } else {
            console.log(err);
        }
      });
     }
    });  
  });

  
  //MOSTRAR

router_p.get('/Mostrarproveedor/',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
      mysqlConnection.query('SELECT * FROM TIENDASM.TBL_PROVEEDORES', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
      });
     }
    }); 
  });

  //SELECCIONAR

router_p.get('/proveedor/:COD_PROVEEDOR',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     const {COD_PROVEEDOR} = req.params;
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_PROVEEDORES WHERE COD_PROVEEDOR= ?', [COD_PROVEEDOR], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
      });
     }
    }); 
  });



  //ELIMINAR

router_p.delete("/eliminarproveedores/:COD_PROVEEDOR",  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
  
     const {COD_PROVEEDOR} = req.body;
       console.log(req.body)   
     const sql = 'CALL TIENDASM.DELETE_PROVEEDORES (?);';
  
      mysqlConnection.query(sql, [COD_PROVEEDOR], (err, rows, fields)=>{
        if(!err) {
            res.json({Status:'PROVEEDOR ELIMINADO CORRECTAMENTE'});
        } else {
            console.log(err);
        }
      });
     }
    }); 
  });


  //MOSTRAR

router_p.get('/Mostrarciudad/',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_CIUDADES', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
      });
     }
    }); 
  });



  //SELECCIONAR

router_p.get('/ciudad/:COD_CIUDAD',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     const {COD_CIUDAD} = req.params;
  
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_CIUDADES WHERE COD_CIUDAD= ?', [COD_CIUDAD], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
      });
     }
    }); 
  });


  //ELIMINAR

router_p.delete("/eliminarciudad/:COD_CIUDAD",  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
  
     const {COD_CIUDAD} = req.body;
       console.log(req.body)   
     const sql = 'CALL TIENDASM.DELETE_CIUDADES (?);';
  
     mysqlConnection.query(sql, [COD_CIUDAD], (err, rows, fields)=>{
        if(!err) {
            res.json({Status:'CIUDAD ELIMINADA CORRECTAMENTE'});
        } else {
            console.log(err);
        }
      });
     }
    }); 
  });


  //MOSTRAR

router_p.get('/Mostrarcorreos/',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_CORREOS', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
      });
     }
    }); 
  });


  //SELECCIONAR

router_p.get('/correo/:COD_CORREO',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     const {COD_CORREO} = req.params;
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_CORREOS WHERE COD_CORREO= ?', [COD_CORREO], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
      });
     }
    }); 
  });



//ELIMINAR

router_p.delete("/eliminarcorreo/:COD_CORREO",  verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (error, authData)=>{
    if (error) {
    res.send("ACCESO RESTRINGIDO)");
    } else {

   const {COD_CORREO} = req.body;
      console.log(req.body)   
   const sql = 'CALL TIENDASM.DELETE_CORREOS (?);';

   mysqlConnection.query(sql, [COD_CORREO], (err, rows, fields)=>{
      if(!err) {
          res.json({Status:'CORREO ELIMINADO CORRECTAMENTE'});
      } else {
          console.log(err);
      }
    });
   }
  }); 
});



//MOSTRAR

router_p.get('/Mostrardirecciones/',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_DIRECCIONES', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
      });
     }
    }); 
  });


  //SELECCIONAR

router_p.get('/direccion/:COD_DIRECCION',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     const {COD_DIRECCION} = req.params;
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_DIRECCIONES WHERE COD_DIRECCION= ?', [COD_DIRECCION], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
      });
     }
    }); 
  });

  

  //ELIMINAR

router_p.delete("/eliminardirecciones/:COD_DIRECCION",  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
  
     const {COD_DIRECCION} = req.body;
        console.log(req.body)   
     const sql = 'CALL TIENDASM.DELETE_DIRECCIONES (?);';
  
     mysqlConnection.query(sql, [COD_DIRECCION], (err, rows, fields)=>{
        if(!err) {
            res.json({Status:'DIRECCION ELIMINADA CORRECTAMENTE'});
        } else {
            console.log(err);
        }
      });
     }
    }); 
  });



  //MOSTRAR

router_p.get('/Mostrardiestados/',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_ESTADOS', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
      });
     }
    }); 
  });


  //SELECCIONAR

router_p.get('/estados/:COD_ESTADOS',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     const {COD_ESTADOS} = req.params;
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_ESTADOS WHERE COD_ESTADOS= ?', [COD_ESTADOS], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
      });
     }
    }); 
});

  //ELIMINAR

router_p.delete("/eliminarestados/:COD_ESTADOS",  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
  
     const {COD_ESTADOS} = req.body;
        console.log(req.body)   
     const sql = 'CALL TIENDASM.DELETE_ESTADOS (?);';
  
     mysqlConnection.query(sql, [COD_ESTADO], (err, rows, fields)=>{
        if(!err) {
            res.json({Status:'ESTADO ELIMINADO CORRECTAMENTE'});
        } else {
            console.log(err);
        }
      });
     }
    }); 
});



  
//MOSTRAR

router_p.get('/Mostrarpaises/',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_PAISES', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
      });
     }
    }); 
});


//SELECCIONAR

router_p.get('/paises:COD_PAIS',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     const {COD_PAIS} = req.params;
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_PAISES WHERE COD_PAIS= ?', [COD_PAIS], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
      });
     }
    }); 
});


//ELIMINAR

router_p.delete("/eliminarpaises/:COD_PAIS",  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
  
     const {COD_PAIS} = req.body;
      console.log(req.body)   
     const sql = 'CALL TIENDASM.DELETE_PAISES (?);';
  
     mysqlConnection.query(sql, [COD_PAIS], (err, rows, fields)=>{
        if(!err) {
            res.json({Status:'PAIS ELIMINADO CORRECTAMENTE'});
        } else {
            console.log(err);
        }
      });
     }
    }); 
});


//MOSTRAR

router_p.get('/Mostrarpreguntas/',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_PREGUNTAS', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
      });
     }
    }); 
});


//SELECCIONAR

router_p.get('/preguntas/:COD_PREGUNTA',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     const {COD_PREGUNTA} = req.params;
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_PREGUNTAS WHERE COD_PREGUNTA= ?', [COD_PREGUNTA], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
      });
     }
    }); 
});

//ELIMINAR

router_p.delete("/eliminarpregunta/:COD_PREGUNTA",  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
  
     const {COD_PREGUNTA} = req.body;
      console.log(req.body)   
     const sql = 'CALL TIENDASM.DELETE_PREGUNTAS (?);';
  
     mysqlConnection.query(sql, [COD_PREGUNTA], (err, rows, fields)=>{
        if(!err) {
            res.json({Status:'PREGUNTA ELIMINADA CORRECTAMENTE'});
        } else {
            console.log(err);
        }
      });
     }
    }); 
});


//MOSTRAR

router_p.get('/Mostrarpreguntausuario/',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_PREGUNTA_USUARIO', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
      });
     }
    }); 
});


//SELECCIONAR

router_p.get('/preguntausuaruio/:COD_PREGUNTA_USUARIO',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     const {COD_PREGUNTA_USUARIO} = req.params;
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_PREGUNTA_USUARIO WHERE COD_PREGUNTA_USUARIO= ?', [COD_PREGUNTA_USUARIO], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
      });
     }
    }); 
});


//ELIMINAR

router_p.delete("/eliminarproeguntausuario/:COD_PREGUNTA_USUARIO",  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
  
     const {COD_PREGUNTA_USUARIO} = req.body;
      console.log(req.body)   
     const sql = 'CALL TIENDASM.DELETE_PREGUNTA_USUARIO (?);';
  
     mysqlConnection.query(sql, [COD_PREGUNTA_USUARIO], (err, rows, fields)=>{
        if(!err) {
            res.json({Status:'PREGUNTA_USUARIO ELIMINADA CORRECTAMENTE'});
        } else {
            console.log(err);
        }
      });
     }
    }); 
});


//MOSTRAR

router_p.get('/Mostrarcorreopersonas/',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_REL_CORREOS_PERSONAS ',(err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
      });
     }
    }); 
});


//SELECCIONAR

router_p.get('/correopersonas/:COD_CORREO_PERSONA',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     const {COD_CORREO_PERSONA} = req.params;
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_REL_CORREOS_PERSONAS WHERE COD_CORREO_PERSONA= ?', [COD_CORREO_PERSONA], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
      });
     }
    }); 
});


//ELIMINAR

router_p.delete("/eliminarcorreopersonas/:COD_CORREO_PERSONA",  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
  
     const {COD_CORREO_PERSONA} = req.body;
       console.log(req.body)   
     const sql = 'CALL TIENDASM.DELETE_REL_CORREOS_PERSONAS (?);';
  
     mysqlConnection.query(sql, [COD_CORREO_PERSONA], (err, rows, fields)=>{
        if(!err) {
            res.json({Status:'CORREO PERSONA ELIMINADO CORRECTAMENTE'});
        } else {
            console.log(err);
        }
      });
     }
    }); 
});

//MOSTRAR

router_p.get('Mostrardireccionpersona',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_REL_DIRECCION_PERSONAS', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
      });
     }
    }); 
});


//SELECCIONAR

router_p.get('/direccionpersona/:COD_DIRECCION_PERSONA',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     const {COD_DIRECCION_PERSONA} = req.params;
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_REL_DIRECCION_PERSONAS WHERE COD_DIRECCION_PERSONA= ?', [COD_DIRECCION_PERSONA], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
      });
     }
    }); 
});

//ELIMINAR

router_p.delete("/eliminardireccionpersona/:COD_PROVEEDOR:COD_DIRECCION_PERSONA",  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
  
     const {COD_DIRECCION_PERSONA} = req.body;
      console.log(req.body)   
     const sql = 'CALL TIENDASM.DELETE_REL_DIRECCION_PERSONAS (?);';
  
     mysqlConnection.query(sql, [COD_DIRECCION_PERSONA], (err, rows, fields)=>{
        if(!err) {
            res.json({Status:'DIRECCION_PERSONA ELIMINADO CORRECTAMENTE'});
        } else {
            console.log(err);
        }
      });
     }
    }); 
});



//MOSTRAR

router_p.get('/Mostrarpertel/',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_REL_PERTEL', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
      });
     }
    }); 
});


//SELECCIONAR

router_p.get('/pertel/:COD_PER_TEL',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     const {COD_PER_TEL} = req.params;
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_REL_PERTEL WHERE COD_PER_TEL= ?', [COD_PER_TEL], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
      });
     }
    }); 
});


//ELIMINAR

router_p.delete("/eliminarpertel/:COD_PER_TEL",  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
  
     const {COD_PER_TEL} = req.body;
      console.log(req.body)   
     const sql = 'CALL TIENDASM.DELETE_REL_PERTEL (?);';
  
     mysqlConnection.query(sql, [COD_PER_TEL], (err, rows, fields)=>{
        if(!err) {
            res.json({Status:'PER_TEL ELIMINADO CORRECTAMENTE'});
        } else {
            console.log(err);
        }
      });
     }
    }); 
});



//MOSTRAR

router_p.get('/Mostrarrolusuario/',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_RELROL_USUARIO', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
      });
     }
    }); 
});


//SELECCIONAR

router_p.get('/rolusuario/:COD_RELROL_USUARIO',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     const {COD_RELROL_USUARIO} = req.params;
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_RELROL_USUARIO WHERE COD_RELROL_USUARIO= ?', [COD_RELROL_USUARIO], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
      });
     }
    }); 
});


//ELIMINAR

router_p.delete("/eliminarrolusuario/:COD_RELROL_USUARIO",  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
  
     const {COD_RELROL_USUARIO} = req.body;
      console.log(req.body)   
     const sql = 'CALL TIENDASM.DELETE_RELROL_USUARIO (?);';
  
     mysqlConnection.query(sql, [COD_RELROL_USUARIO], (err, rows, fields)=>{
        if(!err) {
            res.json({Status:'RELROL_USUARIO ELIMINADO CORRECTAMENTE'});
        } else {
            console.log(err);
        }
      });
     }
    }); 
});



//MOSTRAR

router_p.get('/Mostrarroles/',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_ROLES', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
      });
     }
    }); 
});


//SELECCIONAR

router_p.get('/roles/:COD_ROL',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     const {COD_ROL} = req.params;
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_ROLES WHERE COD_ROL= ?', [COD_ROL], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
      });
     }
    }); 
});


//ELIMINAR

router_p.delete("/eliminarroles/:COD_ROL",  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
  
     const {COD_ROL} = req.body;
      console.log(req.body)   
     const sql = 'CALL TIENDASM.DELETE_ROLES (?);';
  
     mysqlConnection.query(sql, [COD_ROL], (err, rows, fields)=>{
        if(!err) {
            res.json({Status:'ROL ELIMINADO CORRECTAMENTE'});
        } else {
            console.log(err);
        }
      });
     }
    }); 
});


//MOSTRAR

router_p.get('/Mostrartelefonos/',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_TELEFONOS', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
      });
     }
    }); 
});



//SELECCIONAR

router_p.get('/telefonos/:COD_TELEFONO',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     const {COD_TELEFONO} = req.params;
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_TELEFONOS WHERE COD_TELEFONO= ?', [COD_TELEFONO], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
      });
     }

    }); 

});
  
  
  //ELIMINAR

router_p.delete("/eliminartelefono/:COD_TELEFONO",  verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (error, authData)=>{
    if (error) {
    res.send("ACCESO RESTRINGIDO)");
    } else {

   const {COD_TELEFONO} = req.body;
    console.log(req.body)   
   const sql = 'CALL TIENDASM.DELETE_TELEFONOS (?);';

   mysqlConnection.query(sql, [COD_TELEFONO], (err, rows, fields)=>{
      if(!err) {
          res.json({Status:'TELEFONO ELIMINADO CORRECTAMENTE'});
      } else {
          console.log(err);
      }
    });
   }
  }); 
});



//MOSTRAR

router_p.get('/Mostrarusuarios/',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_USUARIOS', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
      });
     }
    }); 
});


//SELECCIONAR

router_p.get('/usuario/:COD_USUARIO',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     const {COD_USUARIO} = req.params;
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_USUARIOS WHERE COD_USUARIO= ?', [COD_USUARIO], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
      });
     }
    }); 
});



//ELIMINAR

router_p.delete("/eliminarprusuario/:COD_USUARIO",  verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (error, authData)=>{
    if (error) {
    res.send("ACCESO RESTRINGIDO)");
    } else {

   const {COD_USUARIO} = req.body;
    console.log(req.body)   
   const sql = 'CALL TIENDASM.DELETE_USUARIOS (?);';

   mysqlConnection.query(sql, [COD_USUARIO], (err, rows, fields)=>{
      if(!err) {
          res.json({Status:'USUARIO ELIMINADO CORRECTAMENTE'});
      } else {
          console.log(err);
      }
    });
   }
  }); 
});


//MOSTRAR

router_p.get('/Mostrarusuarios/',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_USUARIOS', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
      });
     }
    }); 
});


//SELECCIONAR

router_p.get('/usuario/:COD_USUARIO',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     const {COD_USUARIO} = req.params;
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_USUARIOS WHERE COD_USUARIO= ?', [COD_USUARIO], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
      });
     }
    }); 
});


//ELIMINAR

router_p.delete("/eliminarprusuario/:COD_USUARIO",  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
  
     const {COD_USUARIO} = req.body;
      console.log(req.body)   
     const sql = 'CALL TIENDASM.DELETE_USUARIOS (?);';
  
     mysqlConnection.query(sql, [COD_USUARIO], (err, rows, fields)=>{
        if(!err) {
            res.json({Status:'USUARIO ELIMINADO CORRECTAMENTE'});
        } else {
            console.log(err);
        }
      });
     }
    }); 
});


//MOSTRAR

router_p.get('/Mostrarbitacora/',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_BITACORAS', (err, rows, fields) => {
        if(!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
      });
     }
    }); 
});


//SELECCIONAR

router_p.get('/bitacora/:COD_BITACORA',  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
     const {COD_BITACORA} = req.params;
     mysqlConnection.query('SELECT * FROM TIENDASM.TBL_BITACORAS WHERE COD_BITACORA= ?', [COD_BITACORA], (err, rows, fields) => {
        if(!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
      });
     }
    }); 
});




  
  
  

//ELIMINAR

router_p.delete("/eliminarbitacora/:COD_BITACORA",  verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData)=>{
      if (error) {
      res.send("ACCESO RESTRINGIDO)");
      } else {
  
     const {COD_BITACORA} = req.body;
      console.log(req.body)   
     const sql = 'CALL TIENDASM.DELETE_BITACORAS (?);';
  
     mysqlConnection.query(sql, [COD_BITACORA], (err, rows, fields)=>{
        if(!err) {
            res.json({Status:'BITACORA ELIMINADA CORRECTAMENTE'});
        } else {
            console.log(err);
        }
      });
     }
    }); 
});






module.exports=router_p;