import request from 'request';
import { sendMessage } from '../messageSender/sendMessage.js';
import { changeLanguage } from '../functions/handleLanguage.js';
import responses from '../responses/responses.js';
/*
const request = require('request');
const sendMessage = require('../messageSender/sendMessage');
*/

export const processPostback = (event) => {
    const senderID = event.sender.id;
    const payload = event?.postback?.payload;
    //const message = event?.message?.text.toLowerCase();

    let lang;

    switch (payload) {
        case "de":
            lang = "de";
            break;
        case "es":
            lang = "es";
            break;
        case "fr":
            lang = "fr";
            break;
        default:
            lang = "en";
            break;
    }

    request({
        url: "https://graph.facebook.com/v10.0/" + senderID,
        qs: {
            access_token: process.env.PAGE_ACCESS_TOKEN,
            fields: "first_name"
        },
        method: "GET"
    }, (error, response, body) => {
        let senderName = "";
        if (error) {
            console.error("Error getting user name: " + error);
        } else {
            let bodyObject = JSON.parse(body);
            console.log(bodyObject);
            senderName = bodyObject.first_name;
        }
        const messages = responses.greetings[lang].messages;
        const commands = "\n-"+Object.keys(responses.commands).join("\n-");
        console.error(messages);
        let message = messages[0].replace("$", senderName ? senderName : "");
        let message2 = messages[1];
        let message3 = messages[2].replace("$", commands);
        sendMessage(senderID, {text: message}).then(() => {
            sendMessage(senderID, {text: message2}).then(() => {
                sendMessage(senderID, {text: message3}).then(() => {
                    sendMessage(senderID, {text: '🎈'}).then(() => {
                        changeLanguage(senderID, lang);
                    });
                });
            });
        });
    });
}