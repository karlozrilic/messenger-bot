const request = require('request');
const senderAction = require('../templates/senderAction');

module.exports = function processMessage(event) {
    if (!event.message.is_echo) {
        const message = event.message;
        const senderID = event.sender.id;
        console.log("Received message from senderId: " + senderID);
        console.log("Message is: " + JSON.stringify(message));
        if (message.text) {
            let text = message.text;
            request({
                url: "https://graph.facebook.com/v2.6/me/messages",
                qs: {
                    access_token: process.env.PAGE_ACCESS_TOKEN
                },
                method: "POST",
                json: {
                    recipient: {id: senderID},
                    sender_action: "typing_on"
                }
            }, function(error, response) {
                if (error) {
                    console.log("Error sending message: " + response.error);
                }
                console.log("Odg :" + response);
            });
            senderAction(senderID, text);
        }
    }
}