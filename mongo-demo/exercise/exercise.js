const mongoose = require('mongoose');

// ======= Connect to MongoDB =========

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB', err))

// ======= Schema ============
const courseSchema = new mongoose.Schema({
    name: String,
    author: String, 
    tags: [ String ],
    date: Date,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

// =============== Querying Documents ==============

async function getCourses() {
    const courses = await Course
        .find({ isPublished: true, tags: "backend" })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 });

    return courses;
}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}

run();
