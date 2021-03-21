const request = require('request');
const sendMessage = require('./sendMessage');

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
    } else if (message == "i want in!") {
        let message = greeting + "Welcome to Healthbot. Hope you are doing good today";
        let message2 = "I am your nutrition tracker :-)"
        let message3 = "please type in what you ate like: I ate chicken birayani and 2 chapatis with dal.";
        /*senderAction(senderID);*/
        sendMessage(senderID, {text: message}).then(() => {
            sendMessage(senderID, { text: message2 }).then(() => {
                sendMessage(senderID, {  text: message3}).then(() => {
                    sendMessage(senderID, { text: '🎈' });
                })
            });
        });
        return;
    } else {
        odg = "I don't understand";
        message = {
            text: odg
        };
    }

    sendMessage(recipientId, message);
}