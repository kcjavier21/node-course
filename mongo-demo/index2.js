const mongoose = require('mongoose');

//======== Connect To MongoDB ===========

mongoose.connect('mongodb+srv://kcjavier21:justkc@cluster0.phyak.mongodb.net/playground?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB', err))

// ========== Schema =========== WITH INPUT VALIDATION ===========

const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255
    },

    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        trim: true
    },

    author: String,

    tags: {
        type: Array,
        validate: {
            validator: function(value) {
                return new Promise((resolve, reject) => {
                    //kick off some async work
                    setTimeout(() => {
                        resolve(value && value.length > 0)
                    }, 2000);
                });
            },
           // validator: () => Promise.resolve(false),
            message: 'A course should have at least one tag.'
        }
    },

    date: { 
        type: Date, 
        default: Date.now 
    },

    isPublished: Boolean,

    price: {
        type: Number,
        required: function() { return this.isPublished;}, 
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

const Course = mongoose.model('Courses', courseSchema);
// ========== Model =============

async function createCourse(){
    const course = new Course({
        name: 'CSS Course',
        category: 'Web',
        author: 'Ken',
        tags: ['frontend'],
        isPublished: true,
        price: 15.8 
    });

// =========== Saving a Document ====== Error Handling
    try {
        const result = await course.save();
        console.log(result);
    }
 
    catch (ex) {
        console.log(ex.message);
    }
}

createCourse();
