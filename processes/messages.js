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
            senderAction(senderID, text);
        }
    }
}