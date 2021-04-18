const jwt = require('jsonwebtoken');
const Patient = require('../models/userModel');
const Doctor = require('../models/DoctorModel');
const Staff = require('../models/staffModel')

module.exports.verifiedUser = ((req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const userData = jwt.verify(token, 'secretkey');

        Patient.findOne({ _id: userData.patientId })
            .then((result) => {
                req.send = result
                next()
            }).catch((err) => {
                res.status(500).json({ error: err })
            })
    } catch (err) {
        res.status(401).json({ message: "auth failed" })
    }
})

module.exports.verifiedDoctor = ((req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const DoctorData = jwt.verify(token, 'secretkey');

        Doctor.findOne({ _id: DoctorData.DocId })
            .then((result) => {
                req.send = result
                next()
            }).catch((err) => {
                res.status(500).json({ error: err })
            })
    } catch (err) {
        res.status(401).json({ message: "auth failed" })
    }
})
// module.exports.verifiedAdmin
module.exports.verifiedAdmin = ((req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const staffData = jwt.verify(token, 'secretkey');

        Staff.findOne({ _id: staffData.staffId })
            .then((result) => {
                req.send = result
                next()
            }).catch((err) => {
                res.status(500).json({ error: err })
            })
    } catch (err) {
        res.status(401).json({ message: "auth failed" })
    }
})