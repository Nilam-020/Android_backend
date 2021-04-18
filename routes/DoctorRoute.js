const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')

const Doctor = require('../models/DoctorModel');
const Rating = require('../models/ratingModel');

router.post('/doctor/register', [
    check('firstname', 'first name is required!').not().isEmpty(),
    check('lastname', 'first name is required!').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
], (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const address = req.body.address;
        const department = req.body.department;
        const nmc = req.body.nmc;
        const email = req.body.email;
        const gender = req.body.gender;
        const phone = req.body.phone;
        const password = req.body.password;
        const worked = req.body.worked;
            bcryptjs.hash(password, 10, (err, hash) => {
                const data = new Doctor({
                    firstname: firstname,
                    lastname: lastname,
                    address: address,
                    department: department,
                    nmc: nmc,
                    email: email,
                    gender: gender,
                    phone: phone,
                    worked: worked,
                    password: hash
                })
                data.save().then((result) => {
                    res.status(200).json({ success: true, message: "Doctor account created!", data: data })
                })

                    .catch((err) => {
                        res.status(500).json({ error: err })
                    })
            })
    } else {

    }
});





router.get('/doctors', (req, res) => {
    Doctor.find()
        .then((data) => {

            return res.status(200).json({ success: true, data: data })
        })
        .catch((err) => {
            return res.status(500).json({ error: err })
        })
})


router.post('/doctor/login', (req, res) => {
    const phone = req.body.phone
    const password = req.body.password
    Doctor.findOne({ phone: phone })
        .then((DoctorData) => {
            if (DoctorData === null) {
                //email not found
                return res.status(401).json({ message: "Invalid Credentials!!" })
            }
            bcryptjs.compare(password, DoctorData.password, (err, result) => {
                if (result === false) {
                    //email not found
                    return res.status(401).json({ message: "Invalid Credentials!!" })
                }
                //generate token
                const token = jwt.sign({ DocId: DoctorData._id, phone: DoctorData.phone }, 'secretkey')
                res.status(200).json({ success: true, token: token, message: "Auth success" })

            })
        })
        .catch((e) => {
            res.status(500).json({ error: e })
        })
})


router.post('/doctor/rating', (req, res) => {
    const docId = req.body.docId;
    const Uid = req.body.Uid;
    const rating = req.body.rating;

    const ratingData = new Rating({
        DocID: docId,
        UID: Uid,
        rating: rating
    })
    ratingData.save()
        .then((result) => {
            var rating = 0
            var total = 0
            Rating.find({ DocID: docId }).then((data) => {
        
                if (data.length > 0) {
                    for (r of data) {
                        total += r.rating
                    }
                    rating = total / data.length
                    Doctor.updateOne({"_id":docId},{"rating":rating}).then((result)=>{
                        res.status(200).json({ success: true, message: "updated" })
                    }).catch((err)=>{
                        res.status(404).json({ success: false, message: err, data: rating })
                    })
                   // res.status(200).json({ success: true, message: "calcuated", data: rating })
                } else {
                    res.status(200).json({ success: true, message: "calcuated", data: rating })
        
                }
            }).catch((err) => {
                res.status(500).json({ error: err })
            })
            
            res.status(200).json({ success: true, mesage: "rating added", data: ratingData })
        }).catch((err) => {
            res.status(500).json({ error: err })
        })


})

router.post('/doctor/rating/total', auth.verifiedUser, (req, res) => {
    const docId = req.body.DocID;
    var rating = 0
    var total = 0
    Rating.find({ DocID: docId }).then((data) => {

        if (data.length > 0) {
            for (r of data) {
                total += r.rating
            }
            rating = total / data.length
            Doctor.updateOne({"_id":docId},{"rating":rating}).then((result)=>{
                res.status(200).json({ success: true, message: "updated" })
            }).catch((err)=>{
                res.status(404).json({ success: false, message: err, data: rating })
            })
           // res.status(200).json({ success: true, message: "calcuated", data: rating })
        } else {
            res.status(200).json({ success: true, message: "calcuated", data: rating })

        }
    }).catch((err) => {
        res.status(500).json({ error: err })
    })
})


router.put('/doctor/rating/:id', (req, res) => {
    const id = req.params.id;

    const rating = req.body.rating;


    Doctor.updateOne({ _id: id }, {
        rating: rating
    }).then((result) => {
        res.status(200).json({ success: true, mesage: "Doctor data update", data: result })
    }).catch((err) => {
        res.status(500).json({ error: err })
    })
})


router.put('/doctor/update/:id', (req, res) => {
    const id = req.params.id;
    const specialisation = req.body.specialisation;
    const description = req.body.description;
    const consultationFee = req.body.consultationFee;

    Doctor.updateOne({ _id: id }, {
        specialisation: specialisation,
        description: description,
        consultationFee: consultationFee
    }).then((result) => {
        res.status(200).json({ success: true, mesage: "doctor data update", data: result })
    }).catch((err) => {
        res.status(500).json({ error: err })
    })
})

module.exports = router;