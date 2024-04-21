const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const app = express();

app.use(cors(
    {
        origin: 'http://localhost:3000',
        methods: ['GET','POST'],
        credentials: true,
    }
));

// Recive json data
app.use(bodyparser.json());


const downloadImageRouter = require('./sections/download-files/download-file.route');
const { PORT } = require('./config/environment/environments');

app.use('/api/v1/' , downloadImageRouter);



app.listen(PORT , ()=>{
    console.log("Server is running on port  8700");
})