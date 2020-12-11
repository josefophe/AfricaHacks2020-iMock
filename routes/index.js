const express = require('express');
const router = express.Router({mergeParams: true});
const Subject = require('../models/subject');
const Question = require('../models/question');


// Create a new subject
router.post("/", (req, res, next) => {
    const subject = new Subject(req.body);

    subject.save()
        .then(newSubject => {
            return res.status(200).json(newSubject);
        })
        .catch(err => {
            return next(err)
        });
});

// Display all subjects
router.get("/", (req, res, next) => {
    Subject.find({})
    .then(subjects => {
        return res.status(200).json(subjects)
    })
    .catch(err => next(err))
});

//Display a single subject
router.get("/:subjectId", (req, res, next) => {
    Subject.findById(req.params.subjectId)
        .then(subject => {
            return res.status(200).json(subject)
        })
        .catch(err => {
            return next(err);
        })
});


// Create a question for a subject
router.post("/:subjectId/questions", (req, res, next) => {
    const newQuestion = new Question(req.body);
    const { subjectId } = req.params;

    newQuestion.subject = subjectId;

    return newQuestion
        .save()
        .then(ques => {
            return Subject.findByIdAndUpdate(
                subjectId,
                {$addToSet: {questions: ques._id}}
            )
        })
        .then(() => {
            return res.status(200).json({
                message: "Question succesfully added!"
            })
        })
        .catch(err => next(err))
});


// Display all questions for a subject
router.get("/:subjectId/questions", (req, res, next) => {
    return (
        Subject.findById(req.params.subjectId)
            .populate("questions")
            .exec()
            .then(questions => {
                return res.status(200).json(questions)
            })
            .catch(err => next(err))
    )
})

// Delete a question from a subject
router.delete("/:subjectId/questions/:questionId", (req, res, next) => {
    const { subjectId, questionId } = req.params;

    return Question.findByIdAndDelete(questionId)
        .then(ques => {
            return Subject.findByIdAndUpdate(
                subjectId,
                {$pull: {questions: ques._id}}
            )
        })
        .then(() => {
            return res.status(200).json({
                message: "Question successfully deleted"
            })
        })
        .catch(err => next(err))
});

//Display a single question
router.get("/:subjectId/questions/:questionId", (req, res, next) => {
    Question.findById(req.params.questionId)
        .then(question => {
            return res.status(200).json(question)
        })
        .catch(err => next(err))
});


module.exports = router;

