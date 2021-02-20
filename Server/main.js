const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
let userState = {
    schedule : [
        {
            id:'01',
            work:"Morning UpStairs",
            roster:{
                Monday:'',
                Tuesday:'',
                Wednesday:'',
                Thursday:'',
                Friday:''
            }
            
        },
        {
            id:'02',
            work:"Morning Down Stairs",
            roster:{
                Monday:'',
                Tuesday:'',
                Wednesday:'',
                Thursday:'',
                Friday:''
            }
        },
        {
            id:'03',
            work:"Morning Parking Lot",
            roster:{
                Monday:'',
                Tuesday:'',
                Wednesday:'',
                Thursday:'',
                Friday:''
            }
        },
        {
            id:'04',
            work:"Lunch A",
            roster:{
                Monday:'',
                Tuesday:'',
                Wednesday:'',
                Thursday:'',
                Friday:''
            }
        },
        {
            id:'05',
            work:"Lunch B",
            roster:{
                Monday:'',
                Tuesday:'',
                Wednesday:'',
                Thursday:'',
                Friday:''
            }
        },
        {
            id:'06',
            work:"Lunch C",
            roster:{
                Monday:'',
                Tuesday:'',
                Wednesday:'',
                Thursday:'',
                Friday:''
            }
        },
        {
            id:'07',
            work:"Lunch D",
            roster:{
                Monday:'',
                Tuesday:'',
                Wednesday:'',
                Thursday:'',
                Friday:''
            }
        },
        {
            id:'08',
            work:"Afternoon Up Stairs",
            roster:{
                Monday:'',
                Tuesday:'',
                Wednesday:'',
                Thursday:'',
                Friday:''
            }
        },
        {
            id:'09',
            work:"Afternoon Down Stairs",
            roster:{
                Monday:'',
                Tuesday:'',
                Wednesday:'',
                Thursday:'',
                Friday:''
            }
        },
        {
            id:'10',
            work:"Afternoon Parking Lot",
            roster:{
                Monday:'',
                Tuesday:'',
                Wednesday:'',
                Thursday:'',
                Friday:''
            }
        },

    ],
    loads:[
        {
            member:'X1',
            load:{
                Monday: 0,
                Tuesday: 0,
                Wednesday: 0,
                Thursday: 0,
                Friday: 0,
                Total: 0
            }
        },
        {
            member:'X2',
            load:{
                Monday: 0,
                Tuesday: 0,
                Wednesday: 0,
                Thursday: 0,
                Friday: 0,
                Total: 0
            }
        },
        {
            member:'X3',
            load:{
                Monday: 0,
                Tuesday: 0,
                Wednesday: 0,
                Thursday: 0,
                Friday: 0,
                Total: 0
            }
        },
        {
            member:'X4',
            load:{
                Monday: 0,
                Tuesday: 0,
                Wednesday: 0,
                Thursday: 0,
                Friday: 0,
                Total: 0
            }
        },
        {
            member:'X5',
            load:{
                Monday: 0,
                Tuesday: 0,
                Wednesday: 0,
                Thursday: 0,
                Friday: 0,
                Total: 0
            }
        },
        {
            member:'X6',
            load:{
                Monday: 0,
                Tuesday: 0,
                Wednesday: 0,
                Thursday: 0,
                Friday: 0,
                Total: 0
            }
        },
        {
            member:'X7',
            load:{
                Monday: 0,
                Tuesday: 0,
                Wednesday: 0,
                Thursday: 0,
                Friday: 0,
                Total: 0
            }
        }
    ]
};

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,'build')));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api/state',(req,res)=>{
    res.send(userState);
});

app.post('/api/state',(req,res)=>{

    userState = req.body;
    res.send("success");

});

const port = process.env.PORT || 3000; 
app.listen(port);