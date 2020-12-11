const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: String,
    options: {
        a: String,
        b: String,
        c: String,
        d: String
    },
    section: String,
    image: String,
    answer: String,
    solution: String,
    examtype: String,
    examyear: String,
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    }
});

module.exports = mongoose.model("Question", questionSchema);