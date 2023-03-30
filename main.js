const scheduleArr = require('./data/schedule.json');
const weekArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//may change values for testing purpose
//eg. const curDate = new Date(2023,2,30,06,59,59); 

const curDate = new Date(); //current date

//get day in short format(eg. Mon)
const curDay = curDate.toLocaleString("en-us", { weekday: "short" });

const main = () => {
    let status = 'Closed', i = 0, n = scheduleArr.length;
    for (i = 0; i < n; i++) {
        if (scheduleArr[i].day == curDay) {
            const openTime = new Date(curDate.toLocaleDateString('en-US') + " " + scheduleArr[i].open).getTime();
            const curTime = curDate.getTime();
            const closeTime = new Date(curDate.toLocaleDateString('en-US') + " " + scheduleArr[i].close).getTime();
            if (openTime <= curTime && curTime <= closeTime) {
                status = 'Open';
                break;
            }
        }
    }
    console.log(`Shop is ${status}`);
};

main();