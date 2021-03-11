const request = require('request');
const messages = require('../processes/messages');

module.exports = function quickReplyAction(recipientId, payload) {

    let message = {};
    
    switch (payload) {
        case "its-red":
            message = {
                text: "You selected Red"
            }
            break;
        case "its-green":
            message = {
                text: "You selected Green"
            }
            break;
        default:
            message = {
                text: "You didn't select anything"
            }
    }

    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: {
            access_token: process.env.PAGE_ACCESS_TOKEN
        },
        method: "POST",
        json: {
            recipient: {id: recipientId},
            message: message
        }
    }, function(error, response) {
        if (error) {
            console.log("Error sending message: " + response.error);
        }
    });
}