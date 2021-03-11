const request = require('request');

module.exports = function senderAction(recipientId, messageText) {

    let odg = "alooooooooo"

    let message = {}

    messageText = messageText.toLowerCase();

    if (messageText == "hi") {
        odg = "Heloooo!";
        message = {
            text: odg
        };
    } else if (messageText == "color") {
        message = {
            text: "Pick a color:",
            quick_replies: [
                {
                    content_type: "text",
                    title: "Red",
                    payload: "its-red",
                    image_url: "http://example.com/img/red.png"
                }, 
                {
                    content_type: "text",
                    title: "Green",
                    payload: "its-green",
                    image_url: "http://example.com/img/red.png"
                }
            ]
        }
    } else {
        odg = "I don't understand";
        message = {
            text: odg
        };
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