const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');

const Staff = require('../models/staffModel');

router.post('/staff/register', [
    check('firstname', 'first name is required!').not().isEmpty(),
    check('lastname', 'first name is required!').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
], (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const address = req.body.address;
        const date_of_birth = req.body.date_of_birth;
        const email = req.body.email;
        const gender = req.body.gender;
        const phone = req.body.phone;
        const position = req.body.position;
        const user_type = req.body.user_type;
        const password = req.body.password;

        bcryptjs.hash(password, 10, (err, hash) => {
            const data = new Staff({
                firstname: firstname,
                lastname: lastname,
                address: address,
                date_of_birth: date_of_birth,
                email: email,
                gender: gender,
                phone: phone,
                position: position,
                user_type: user_type,
                password: hash
            })
            data.save().then((result) => {
                res.status(200).json({ success: true, message: "staff account created!" })
            })

                .catch((err) => {
                    res.status(500).json({ error: err })
                })
        })
    } else {

        //invalid data from client
        res.status(400).json(errors.array())
    }
});
router.post('/staff/login', (req, res) => {
    const phone = req.body.phone
    const password = req.body.password
    Staff.findOne({ phone: phone })
        .then((staffData) => {
            if (patientData === null) {
                //email not found
                return res.status(401).json({ message: "Invalid Credentials!!" })
            }
            bcryptjs.compare(password, staffData.password, (err, result) => {
                if (result === false) {
                    //email not found
                    return res.status(401).json({ message: "Invalid Credentials!!" })
                }
                //generate token
                const token = jwt.sign({ staffId: staffData._id, phone: staffData.phone }, 'secretkey')
                res.status(200).json({ success: true, token: token, message: "Auth success" })

            })
        })
        .catch((e) => {
            res.status(500).json({ error: e })
        })
})

module.exports = router;