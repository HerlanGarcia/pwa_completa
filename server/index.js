const express=require('express');
const app=express();
const mysql=require('mysql');
const cors=require('cors');
const router = express.Router(); 

app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:'formulario_pwa'
});


app.post('/create',(req,res)=>{
    const nombre=req.body.nombre;
    const apellido=req.body.apellido;
    const correo=req.body.correo;

    db.query('INSERT INTO formulario(nombre,apellido,correo) VALUES(?,?,?)',[nombre,apellido,correo],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send('Usuario registrado');
        }
    }
    )
})

app.put('/update',(req,res)=>{
    const id=req.body.id;
    const nombre=req.body.nombre;
    const apellido=req.body.apellido;
    const correo=req.body.correo;
    db.query('UPDATE formulario SET nombre=?, apellido=?, correo=? WHERE id=?',
            [nombre, apellido, correo, id],
            (err,result)=>{
                if(err){
                    console.log(err);
                }else{
                    res.send('Usuario actualizado')
                }
            }
    )
})

app.delete('/delete/:id',(req, res)=>{
    const id = req.params.id;
    db.query('DELETE FROM formulario WHERE id = ?', [id], (err, result) =>{
        if(err){
            console.log(err);
            res.status(500).send('Error al eliminar')
        }else{if(result.affectedRows > 0) {
           res.send('Usuario eliminado'); 
        }else{
            res.status(404).send('Usuario no encontrado');
        }

        }
    })
})



app.get('/usuario', (req,res)=>{
    db.query('SELECT * FROM formulario',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    )
  })
app.listen(3001,()=>{
    console.log('corriendo en el puerto 3001');

})