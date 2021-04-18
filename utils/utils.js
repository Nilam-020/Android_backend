
const formatTime = (hour)=>{
    if(hour < 10)
    {
        hour = '0'+hour;
    }
    return hour;
}

const checkTime = (hour)=>{
    let timeStamp = hour<12? "AM":"PM";
    return timeStamp;
}

module.exports = {formatTime,checkTime};