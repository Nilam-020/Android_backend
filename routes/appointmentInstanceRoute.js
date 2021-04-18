const express = require('express');
const router = express.Router();
const AppointmentInstance = require('../models/appointmentInstance');
const Doctor = require('../models/DoctorModel');
const Schedule = require('../models/ScheduleModel');
const {formatTime,checkTime} = require('../utils/utils');

router.post('/schedule/add/:id',(req,res)=>{
    const docId = req.params.id;
    const startdate = req.body.startdate;
    const enddate = req.body.enddate;
    const endTime = parseInt(req.body.endTime);
    const startTime = parseInt(req.body.startTime);

    let startAt = new Date(startdate);
    let endAt = new Date(enddate);
        
    
    
    while(startAt < endAt)
    {
    let startHours = new Date(startAt);
    let endHours = new Date(startAt);
    let midTime = new Date(startAt);
    
    startHours.setHours(startTime,0,0);
    endHours.setHours(endTime,0,0);
    midTime.setHours(startTime,0,0);
  
        while(startHours < endHours)
        {
           
            midTime.setMinutes(midTime.getMinutes()+30);
            let drTime = `${startHours.getHours()}:${formatTime(startHours.getMinutes())}${checkTime(startHours.getHours())}-${midTime.getHours()}:${formatTime(midTime.getMinutes())}${checkTime(midTime.getHours())}`;
            let date = `${startAt.getFullYear()}-${formatTime(startAt.getMonth()+1)}-${formatTime(startAt.getDate())}`;
           
        const appointmentInstance = new AppointmentInstance({doctor_id:docId,time:drTime,date:date,hour:startHours.getHours()});
            appointmentInstance.save();
            startHours.setMinutes(startHours.getMinutes()+30);
        }
       
        startAt.setDate(startAt.getDate()+1);
    }
    const scheduleDate = new Schedule({ DocId: docId, startdate: startdate, enddate: enddate, startTime: startTime, endTime: endTime })
    scheduleDate.save()
 .then((result) => {
           return res.status(200).json({ success: true, message: "appointment scheduled", scheduleDate })
        })
        .catch((err) => {
            res.status(500).json({ error: err })

        })
})



module.exports = router;