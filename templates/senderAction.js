import { sendMessage } from '../messageSender/sendMessage.js';
import { processMessage } from '../processes/messages.js';
import { processPostback } from '../processes/postback.js';
/*
const sendMessage = require('../messageSender/sendMessage');
const messages = require('../processes/messages');
const processPostback = require('../processes/postback');
*/

import { LocalStorage } from 'node-localstorage';

const localStorage = new LocalStorage('./scratch'); 

export const senderAction = (recipientId, messageText, event) => {

    let odg;

    let message = {};

    messageText = messageText.toLowerCase();

    let userID = recipientId.toString();

    if (messageText == "hi" || messageText == "hello") {
        console.log("ID: " +localStorage?.getItem('Users')?.[userID]);
        if (localStorage?.getItem('Users')?.[userID]) {
            if (localStorage.getItem('Users')?.[userID] == "de") {
                odg = "Halooo";
            } else {
                odg = "Heloooo!";
            }
        } else {
            odg = "Heloooo!";
        }
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
    } else if (messageText == "de") {
        localStorage.setItem('Users', {[userID]: "de"});
        console.log("HERE: "+localStorage.getItem('Users'))
        message = {
            text: "Willkommen"
        };
        sendMessage(recipientId, message);
    } else if (messageText == "clear") {
        localStorage.clear();
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
    }
}