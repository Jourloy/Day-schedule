const say = require('say');

/* PARAMS */
const shedule = {
    '11:00:00': `Let's go! Work don't wait.`,
    '14:00:00': `Stop work, you need some eat!`,
    '16:00:00': `Rested? Need work.`,
    '20:00:00': `Day is end. Good job, see you tommorow`
}
let formatedTime = '';

/* FUNCTIONS */
function toWork() {
    let _seconds = formatedTime.split(':')[2];
    let _minutes = formatedTime.split(':')[1];
    let _hours = formatedTime.split(':')[0];

    _seconds = parseInt(_seconds) + 1;
    _minutes = parseInt(_minutes);
    _hours = parseInt(_hours);

    if ((hours >= 14 && hours < 16) || hours < 11 || hours >= 20) return;

    if ((hours === 11 || hours === 16) && (minutes === 0 && seconds > 5 || minutes > 0)) say.speak(`Return to work, man`, `Alex`, 1, (err) => {});
    else if (hours !== 11 && hours !== 16) say.speak(`Return to work, man`, `Alex`, 1, (err) => {});
    console.log(`toWork | ${formatedTime}`);
    setTimeout(toRest, 1000 * 60 * 52);
}

function toRest() {
    let _seconds = formatedTime.split(':')[2];
    let _minutes = formatedTime.split(':')[1];
    let _hours = formatedTime.split(':')[0];

    _seconds = parseInt(_seconds) + 1;
    _minutes = parseInt(_minutes);
    _hours = parseInt(_hours);

    if ((hours >= 14 && hours < 16) || hours < 11 || hours >= 20) return;

    say.speak(`Need to rest, man`, `Alex`, 1, (err) => {});
    console.log(`toRest | ${formatedTime}`);
    setTimeout(toWork, 1000 * 60 * 17);
}

/* INTERVALS */
setInterval(() => {
    if ((formatedTime.split(':')[0] === '11' || formatedTime.split(':')[0] === '16') && formatedTime.split(':')[1] === '00' && formatedTime.split(':')[2] === '00') toWork();
}, 1000)

setInterval(() => {
    const date = new Date();
    const dateString = date.toTimeString().split(' G')[0];
    const time = dateString.split(':');
    let hours = time[0];
    let minutes = time[1]; 
    let seconds = time[2];

    seconds = parseInt(seconds) + 1;
    minutes = parseInt(minutes);
    hours = parseInt(hours);
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes === 60) {
        minutes = 0;
        hours++;
    }
    if (hours === 24) hours = 0;


    if (seconds < 10) seconds = `0${seconds}`;
    else seconds.toString();

    if (minutes < 10) minutes = `0${minutes}`;
    else minutes.toString();

    if (hours < 10) hours = `0${hours}`;
    else hours.toString();

    formatedTime = `${hours}:${minutes}:${seconds}`;

    if (shedule[`${hours}:${minutes}:${seconds}`] != null) {
        say.speak(shedule[`${hours}:${minutes}:${seconds}`], `Alex`, 1, (err) => {});
    }
}, 1000)