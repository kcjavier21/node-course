const mongoose = require('mongoose');

//======== Connect To MongoDB ===========

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB', err))

// ========== Schema ===========

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Courses', courseSchema);
// ========== Model =============

/*
async function createCourse(){
    const course = new Course({
        name: 'React Course',
        author: 'Ken',
        tags: ['node', 'frontend'],
        isPublished: true
    });

// =========== Saving a Document ============

    const result = await course.save();
    console.log(result);
}
*/

//createCourse();

// ============ Querying Documents ============
/*
async function getCourses() {
    const courses = await Course
        .find({ author: 'Ken', isPublished: true })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    console.log(courses);
}

//getCourses();
*/

// ============= Comparison Query Operators ==========
/*
    eq - equal to                       lt - less than
    ne - not equal to                   lte - less than or equal to
    gt - greater than                   in - in 
    gte - greater than or equal to      nin - not in
*/

/*
async function getCourses() {

    const courses = await Course
      //.find({ author: 'Ken', isPublished: true })
      //.find({ price: { $gte: 10, $lte: 20 } })
      //.find({price: { $in: [10, 15, 20] } })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    console.log(courses);
}
*/

//getCourses();

// ============ Logical Query Operators ==============
/*
async function getCourses() {
    const courses = await Course
      //  .find({ author: 'Ken', isPublished: true })
        .find()
        .or([ {author: 'Ken'}, {isPublished: true} ])
        .and([ ])
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    console.log(courses);
}

//getCourses();
*/

// =============== Regular Expressions ==================
/*
async function getCourses() {
    const courses = await Course
      //  .find({ author: 'Ken', isPublished: true })

      //Starts with Ken
        .find({ author: /^Ken/ })

      //Ends with Javier
        .find({ author: /Javier$/i })
        
      //Contains Ken
        .find({ author: /.*Ken.*/ //i })
/*
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    
    console.log(courses);
}
*/

//getCourses();

// ============== Counting ===================
/*
async function getCourses() {
    const courses = await Course
        .find({ author: 'Ken', isPublished: true })
        .limit(10)
        .sort({ name: 1 })
        .count();
    console.log(courses);
}
*/
//getCourses();

// ================ Pagination ===============

async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;
    // /api/courses?PageNumber=2&pageSize=10

    const courses = await Course
        .find({ author: 'Ken', isPublished: true })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    console.log(courses);
}

//getCourses();

// ========= Updating Document - Query First ==========

/*
async function updateCourse(id){
    const course = await Course.findById(id);
    if (!course) return;
    course.isPublished = true;
    course.author = 'Ken Javier';

    const result = await course.save();
    console.log(result);
}

updateCourse('5f49c00ae902fc2b748e8265'); 
*/

// ========= Updating Document - Update First ==========
/*
async function updateCourse(id){
    const result = await Course.update({ _id: id }, {
        $set: {
            author: 'Kenken',
            isPublished: false
        }
    });

    console.log(result);
}

updateCourse('5f49c00ae902fc2b748e8265'); 
*/
// ============= Removing Documents ================

async function removeCourse(id){
    const result = await Course.deleteOne({ _id: id });
    console.log(result);
}

removeCourse('5f49c00ae902fc2b748e8265');