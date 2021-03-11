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
    } else {
        odg = "I don't understand";
        message = {
            text: odg
        };
    }

    sendMessage(recipientId, message).then(
        sendMessage(recipientId, {text: "👍🏼"})
    );
}