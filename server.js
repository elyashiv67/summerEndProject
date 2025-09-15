const express = require('express');
const app = express();
const port = 3894;

app.use(express.static(__dirname))
app.use(express.json());

app.get('/',(req,res)=>{res.sendFile(__dirname+'/public/index.html')})
app.use('/c',require('./routes/corses'))

app.listen(port,()=>{console.log(`http://localhost:${port}`)})