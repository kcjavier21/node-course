const express = require('express');
const router = express.Router();
const Joi = require('joi');

// ======== List of Courses ==========

const courses = [
    { id: 1, name: 'Computer Science' },
    { id: 2, name: 'Business Management' },
    { id: 3, name: 'Mechanical Engineering' }
];


// View Courses
router.get('/', (req, res) => {
    res.send(courses);
});


// View Course By ID

router.get('/:id', (req, res) => {
   const course = courses.find(c => c.id === parseInt(req.params.id));

   if(!course) {
       res.status(404);
       res.send('ERROR 404. Course not found! :(');
   }

   res.send(course);

 });

// HTTP Post Request || Create New Course

router.post('/', (req, res) => {
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


//HTTP PUT Request || Update Course

 router.put('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if(!course) {
        res.status(404);
        res.send('ERROR 404. Course not found! :(');
    }

    const result = validateCourse(req.body);

    if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);
 });

 function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
 }

 // HTTP Delete Request
 
router.delete('/:id', (req, res) => {
    //Look up the course
    //Not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if(!course) {
        res.status(404);
        res.send('ERROR 404. Course not found! :(');
    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

module.exports = router;