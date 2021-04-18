const express = require('express')
const router = express.Router()
const Appointment = require('../models/appointmentModel');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload')

router.post('/appointment/add', auth.verifiedUser, upload.single('docimage'), (req, res) => {
    console.log(req.file)
    if (req.file == undefined) {
        return res.status(400).json({ message: "Invalid file format. PNG and JPEG accepted" })
    }
    const DocName = req.body.DocName;
    const department = req.body.department;
    const rating = req.body.rating;
    const date = req.body.date;
    const time = req.body.time;
    const docimage = req.file.path;
    const Description = req.body.Description;

    const appointmentData = new Appointment({ DocName: DocName, department: department, rating: rating, date: date, time: time, docimage: docimage, Description: Description })
    appointmentData.save().then((result) => {
        res.status(201).json({ message: "appointment added" })
    }).catch((err) => {
        res.status(500).json({ error: err })
    })
})

router.put('/appointment/update', upload.single('docimage'), (req, res) => {

        const DocName = req.body.DocName;
        const department = req.body.department;
        const date = req.body.date;
        const time = req.body.time;
        const docimage = req.file.path;
        const Description = req.body.Description;
        const id = req.body.id;

        Appointment.updateOne({ _id: id }, {
            DocName: DocName,
            department: department,
            date: date,
            time: time,
            docimage: docimage,
            Description: Description


        }).then((result) => {
            res.status(200).json({ message: "Updated!" })
        }).catch((err) => {
            res.status(500).json({ error: err })

        })
    })
    //delete
router.delete('/appointment/delete/:id', (req, res) => {
    const id = req.params.id;
    Appointment.deleteOne({ _id: id })
        .then((resut) => {
            res.status(200).json({ message: "success" })
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
})
router.get('/doctor', (req, res) => {
    Appointment.find()
        .then((data) => {
            res.status(200).json(data)
        }).catch((err) => {
            res.status(500).json({ error: err })
        })
})

router.get('/doctor/:id', (req, res) => {
    const id = req.params.id;
    Appointment.findOne({ _id: id })
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })
})

module.exports = router;