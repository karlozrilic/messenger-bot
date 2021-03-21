const request = require('request');
const sendMessage = require('./sendMessage');
const processPostback = require('../processes/postback');

module.exports = function senderAction(recipientId, messageText, event) {

    let odg = "alooooooooo"

    let message = {}

    messageText = messageText.toLowerCase();

    if (messageText == "hi") {
        odg = "Heloooo!";
        message = {
            text: odg
        };
        sendMessage(recipientId, message);
    } else if (messageText == "color") {
        message = {
            text: "Pick a color:",
            quick_replies: [
                {
                    content_type: "text",
                    title: "Red",
                    payload: "its-red",
                    image_url: "https://www.iconsdb.com/icons/preview/red/circle-xxl.png"
                }, 
                {
                    content_type: "text",
                    title: "Green",
                    payload: "its-green",
                    image_url: "https://www.iconsdb.com/icons/preview/green/circle-xxl.png"
                }
            ]
        }
        sendMessage(recipientId, message);
    } else if (messageText == "i want in!") {
        const senderID = event.sender.id;
        request({
            url: "https://graph.facebook.com/v2.6/" + senderID,
            qs: {
                access_token: process.env.PAGE_ACCESS_TOKEN,
                fields: "first_name"
            },
            method: "GET"
        }, function(error, response, body) {
            let greeting = '';
            if (error) {
                console.error("Error getting user name: " + error);
            } else {
                let bodyObject = JSON.parse(body);
                console.log(bodyObject);
                name = bodyObject.first_name;
                greeting = "Hello " + name  + ". ";
            }
            let message = greeting + "Welcome to Digital nomads - Zadar. Hope you are doing good today";
            let message2 = "I am here to help you :-)"
            let message3 = `please type in one of the following commands:
                            - color
                            - hi`;
            /*senderAction(senderID);*/
            sendMessage(senderID, {text: message}).then(() => {
                sendMessage(senderID, { text: message2 }).then(() => {
                    sendMessage(senderID, {  text: message3}).then(() => {
                        sendMessage(senderID, { text: '🎈' });
                    })
                });
            });
        });
        console.error(event);
        //processPostback(event);
    } else {
        odg = "I don't understand";
        message = {
            text: odg
        };
        sendMessage(recipientId, message);
    }
}