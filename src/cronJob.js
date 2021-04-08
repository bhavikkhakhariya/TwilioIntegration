const moment = require("moment");
const config = require("./config");

const { CronJob } = require("cron");
const jobs = require("./utils/data.json");

const accountSid = config.TWILIO_ACCOUNT_SID;
const authToken = config.TWILIO_AUTH_TOKEN;
const phoneNumber = config.TWILIO_PHONENUMBER;
const client = require('twilio')(accountSid, authToken);

new CronJob("0 0 */24 * * *", () => {
    const currentDate = moment(new Date()).format('MM/DD/YYYY');
    try {
        const todaysJob = jobs.filter(item => item.date === currentDate);
        for (let i in todaysJob) {
            client.messages
                .create({
                    body: "Today's Reminder",
                    from: phoneNumber,
                    to: todaysJob[i].mobileNumber
                })
                .then(message => console.log(message))
                .catch(error => console.log(error) );
        }
    } catch (error) {
        console.log("error from cron:-", error);
    }
}, null, true, process.env.PLATFORM_TIMEZONE);
