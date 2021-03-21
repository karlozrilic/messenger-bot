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
    } else if (messageText == "i want in!") {
        processPostback(event);
    } else {
        odg = "I don't understand";
        message = {
            text: odg
        };
    }

    sendMessage(recipientId, message);
}