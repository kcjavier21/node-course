const mongoose = require('mongoose');

// ========== Connect to MongoDB ===========

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB', err))

// ========== Schema ============
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags:[ String ],
    date: Date,
    isPublished: Boolean,
    price: Number
});
// ========== Model =============
const Course = mongoose.model('Course', courseSchema);

//=========== Querying Documents ===========

async function getCourses() {
    const courses = await Course
       //.find({ price: { $gte: 15 } })
        .find( { isPublished: true } )
        .or([
            { price: { $gte: 15 } },
            { name: /.*by.*/i }
        ])
        .select({ author: 1, name: 1, price: 1 });

    return courses; 
}


async function run() {
    const courses = await getCourses();
    console.log(courses);
}

run();