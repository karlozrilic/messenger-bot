const request = require('request');

module.exports = function senderAction(recipientId, messageText) {

    let odg = "alooooooooo"

    if (messageText.toLowerCase == "hi") {
        odg = "Helooooo!";
    } else {
        odg = "I don't understand";
    }

    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: {
            access_token: process.env.PAGE_ACCESS_TOKEN
        },
        method: "POST",
        json: {
            recipient: {id: recipientId},
            message: {
                text: odg
            }
        }
    }, function(error, response, body) {
        if (error) {
            console.log("Error sending message: " + response.error);
        }
    });
}