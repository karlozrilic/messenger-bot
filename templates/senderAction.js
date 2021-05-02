import { sendMessage } from '../messageSender/sendMessage.js';
import { processMessage } from '../processes/messages.js';
import { processPostback } from '../processes/postback.js';
import { checkLanguage, changeLanguage, clearLanguage } from '../functions/handleLanguage.js';
import responses from '../responses/responses.js';

export const senderAction = (recipientId, messageText, event) => {
    sendMessage(recipientId, messageObject);
/*
    let odg;

    let message = {};

    messageText = messageText.toLowerCase();
    let flag;

    if (messageText.includes("-")) {
        messageText = messageText.split(" ")[0];
        flag = messageText.split(" -")[1];
    }

    if (Object.keys(responses.commands).includes(messageText)) {
        if (flag) {
            message = {
                text: responses.commands[messageText].description
            };
            sendMessage(recipientId, message);
        } else {

        }
    } else {
        sendMessage(recipientId, "Cant find that command");
    }

    let userID = recipientId.toString();

    if (messageText == "hi" || messageText == "hello") {
        odg = checkLanguage(userID);
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
    } else if (messageText == "de" || messageText == "es") {
        let response = changeLanguage(userID, messageText);
        message = {
            text: response
        };
        sendMessage(recipientId, message);
    } else if (messageText == "lang") {
        message = {
            text: checkLanguage(recipientId)
        }
        sendMessage(recipientId, message);
    } else if (messageText == "clear") {
        clearLanguage();
        message = {
            text: "Local storage cleared"
        };
        sendMessage(recipientId, message);
    } else {
        odg = "I don't understand";
        message = {
            text: odg
        };
        sendMessage(recipientId, message);
    }*/
}