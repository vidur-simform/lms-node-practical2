const scheduleArr = require('./data/schedule.json');
const weekArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const weekArrayIndex = {};

//object of index for day
weekArray.forEach((day, index) => {
    weekArrayIndex[day] = index;
});

//may change values for testing purpose
//eg. 
// const curDate = new Date(2023, 2, 28, 22, 00, 00);

const curDate = new Date(); //current date

//get day in short format(eg. Mon)
const curDay = curDate.toLocaleString("en-us", { weekday: "short" });

const main = () => {
    let status = 'Closed', i = 0, n = scheduleArr.length, diff = 0, ind = 0;
    
    for (i = 0; i < n; i++) {
        if (scheduleArr[i].day == curDay) {
            const openTime = new Date(curDate.toLocaleDateString('en-US') + " " + scheduleArr[i].open).getTime();
            const curTime = curDate.getTime();
            const closeTime = new Date(curDate.toLocaleDateString('en-US') + " " + scheduleArr[i].close).getTime();
            if (openTime <= curTime && curTime <= closeTime) {
                status = 'Open';
                diff = (closeTime - curTime) / (60 * 60 * 1000);
                break;
            } else if (curTime <= openTime) {
                ind = i;
                break;
            }
        } else if (weekArrayIndex[scheduleArr[i].day] > weekArrayIndex[curDay]) {
            ind = i;
            break;
        }
    }
    if (status == 'Open') {
        console.log(`Open, The shop will be closed within ${diff.toFixed(2)} Hrs.`);
    } else {
        const nextOpenTime = new Date(curDate.toLocaleDateString('en-US') + " " + scheduleArr[ind].open).getTime();
        const curTime = curDate.getTime();
        diff = (nextOpenTime - curTime) / (60 * 60 * 1000) + ((weekArrayIndex[scheduleArr[ind].day] - weekArrayIndex[curDay] + 7) % 7) * 24;
        console.log(`Closed, The shop will be open after ${diff.toFixed(2)} Hrs.`);
    }
};

main();