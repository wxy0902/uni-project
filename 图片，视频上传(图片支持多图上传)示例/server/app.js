const express = require('express');
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest : 'uploads'});
const path = require('path')

const app = express()
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads',express.static('uploads'))
//设置跨域，可以自行百度
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
  });
//单文件上传
app.post('/upload', upload.single('file'), (req, res) =>{
    let files = req.file;
    try {
        fs.renameSync(files.path,'uploads/' + files.originalname)
    } catch (error) {
        res.send(error)
    }
    files.url = `http://localhost:3000/uploads/${files.originalname}`
    res.send(files)
})
//可以上传单文件 也可以上传多文件
app.get('/upload',(req,res) => {
    let images = [],videos = [];
    fs.readdir('./uploads',(err,files) => {
        if(err) return console.log(err);
        for (let index = 0; index < files.length; index++) {
            if(path.extname(files[index]) == '.png' || path.extname(files[index]) == '.jpg'){
                images.push(files[index])
            }else{
                videos.push(files[index])
            }
        }
        images = images.map((i) => `http://localhost:3000/uploads/${i}`)
        videos = videos.map((i) => `http://localhost:3000/uploads/${i}`)
        res.send(req.query.category == 'image' ? images : videos)
    })
})
app.delete('/upload',(req,res) => {
    fs.unlink('.' + req.body.image.substring(21),(err) => {
        if(err) return res.send(err);
        res.send({
            status: 1
        })
    }) 
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))