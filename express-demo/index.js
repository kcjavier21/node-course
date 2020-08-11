const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'Computer Science' },
    { id: 2, name: 'Business Management' },
    { id: 3, name: 'Mechanical Engineering' }
];

// Home Page
app.get('/', (req, res) => {
    res.send('Hello World!');
});

/*
app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
});
*/

// Get Course By ID

app.get('/api/courses/:id', (req, res) => {
   const course = courses.find(c => c.id === parseInt(req.params.id));

   if(!course) {
       res.status(404);
       res.send('ERROR 404. Course not found! :(');
   }

   res.send(course);

 });

// HTTP Post Request || Create New Course

app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);

    if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});


















//PORT

const port = process.env.PORT||3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

