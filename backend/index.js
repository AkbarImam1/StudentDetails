const express = require('express') //importing express
const students = require('./students')
const cors = require('cors')
 
const app = express() //creating instance of express
app.use(cors())
//middleware-> req se JSON read karke req.body me us JSON ko object bnake store kr lega
app.use(express.json())

app.listen(5000 , () => {
    console.log('Listening on Port 5000');
});

app.get('/' , (req, res) => {
    res.json({message : "API is working"})
})

app.get('/api/students' , (req, res) => {
    res.json(students)
})

app.post('/api/students' , (req, res) => {
    //creating object

    const user = {
        roll_no : req.body.roll_no,
        name : req.body.name,
        email : req.body.email,
        group : req.body.group
    }
    students.push(user) //appending the data in students wala array that is in another folder named "students"
    res.json(user)
})

app.put('/api/students/:roll_no' , (req, res) => {

    //reading what req user is sending to update
    let roll_no = req.params.roll_no
    let name = req.body.name
    let email = req.body.email
    let group = req.body.group

    let index = students.findIndex((students) => {
        return (students.roll_no == Number.parseInt(roll_no))
    })

    if(index >= 0){
        const std = students[index]
        std.name = name
        std.email = email
        std.group = group
        res.json(std)
    } else{
        res.status(404)
        res.end()
    } 
})


app.get('/api/students/:roll_no', (req, res) => {
    let roll_no = req.params.roll_no;
  
    let student = students.find((student) => {
        return student.roll_no == Number.parseInt(roll_no);
    });


    if (student) {
        res.json(student);
    } else {
        
        res.status(404).json({ message: 'Student not found' });
    }
});




app.delete('/api/students/:roll_no' , (req, res) => {
    let roll_no = req.params.roll_no;
    let index = students.findIndex((students) => {
        return (students.roll_no == Number.parseInt(roll_no))
    })

    if(index >= 0){
        let std = students[index] //konsa object delete krre
        students.splice(index , 1) //isse index pe rkha ya 1 object delete ho jayega
        res.json(std)
    } else{
        res.status(404)
        res.end()
    } 
})

