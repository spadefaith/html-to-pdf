require('dotenv').config();
const express = require('express');
const app = express();
const formidable = require('express-formidable');
const pdfGenerate = require('./pdf-generate.js');
const stream = require("stream");



app.use(express.json());

app.post('/generate/json', async (req, res, next) => {
    try {
        const { html,name } = req.body;
        if (!html) throw new Error('html is required')
        const generated = await pdfGenerate(req.body);
        const readStream = new stream.PassThrough();
        readStream.end(generated);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader("Content-Disposition", `attachment; filename=${name}.pdf`);
        readStream.pipe(res);
    } catch(err){
        next(err);
    }
});

app.post('/generate', formidable(), async (req, res, next) => {
    try {
        const { html,name } = req.fields;
        if (!html) throw new Error('html is required')
        const generated = await pdfGenerate(req.fields);
        const readStream = new stream.PassThrough();
        readStream.end(generated);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader("Content-Disposition", `attachment; filename=${name}.pdf`);
        readStream.pipe(res);
    } catch(err){
        next(err);
    }
});

app.get('/', (req, res) => res.json({ message: 'Html to pdf API' }));

app.use("*", (req, res) => res.json("404 Not Found"));
app.use((err, req, res, next) => {
    console.log(err);
    
    res.status(400).json({ message: err.message })
});

app.listen(process.env.PORT,'0.0.0.0',(err)=>{
    if(err){
        console.log(err);
    }
    console.log(`Server is running on port ${process.env.PORT}`);
});