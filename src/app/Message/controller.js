const config = require("../../config");

const accountSid = config.TWILIO_ACCOUNT_SID;
const authToken = config.TWILIO_AUTH_TOKEN;
const phoneNumber = config.TWILIO_PHONENUMBER;
const client = require('twilio')(accountSid, authToken);

const sendMessage = (req,res) => {
    const { message, sendTo } = req.body;
    try {
        if(message && sendTo){
            client.messages
                .create({
                    body: message,
                    from: phoneNumber,
                    to: sendTo
                })
                .then(message => res.send(message))
                .catch(error => res.status(400).send({ error }));
        }else{
            res.status(400).send({ error: "Please pass valid parameters" })
        }
    } catch (error) {
        res.status(400).send({ error })
    }
};

module.exports ={
    sendMessage
};
