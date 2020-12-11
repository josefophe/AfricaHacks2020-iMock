const mongoose = require('mongoose');


const subjectSchema = new mongoose.Schema({
    subject: String,
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question"
        }
    ]
});

module.exports = mongoose.model('Subject', subjectSchema);