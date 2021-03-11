const request = require('request');
const quickReplyAction = require('../templates/quickReplyAction');

module.exports = function processQuickReply(event) {
    if (!event.message.is_echo) {
        const message = event.message;
        const senderID = event.sender.id;
        if (message.quick_reply) {
            let payload = message.quick_reply.payload;
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
                /*quickReplyAction(senderID, payload);*/
            });
        }
    }
}