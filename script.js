
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const Product = require('./models/productModel')

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req,res)=>{
    res.send('HI myself Node api');
})

app.get('/body',async(req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json(products)
    }
    catch(e){
        res.status(500).json({message: e.message})
    }
})

app.get('/body/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    }
    catch(e){
        res.status(500).json({message: e.message})
    }
})

app.post('/body',async(req, res)=>{
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product);

    }catch(e){
        console.log(e.message);
        res.status(500).json({message : error.message})
    }
})

//update
app.put('/body/:id', async(req,res)=>{
    try{
        const{id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            return res.status(404).json({message:`cannot find any by id ${id}`})
        }
        const updated = await Product.findById(id);
        res.status(200).json(updated)
    }
    catch(e){
        res.status(500).json({message: e.message})
    }
})

app.delete('/body/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        const prod = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: e.message})
        }
        res.status(200).json(prod);
    }
    catch(e){
        res.status(500).json({message:e.message})
    }
})



mongoose.
connect('mongodb+srv://kavin_s:Kaviabi@clusternode.lo8m8um.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=>{
    console.log('Collection is created and MongoDB connected')
    app.listen(3000,()=>{
        console.log("Server started and Api running on http://localhost:3000")
    })
}).catch(()=>{
    console.log('Error occured')
})

