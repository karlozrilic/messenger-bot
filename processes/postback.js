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
    const message = event?.message?.text.toLowerCase();

    let lang;

    switch (payload) {
        case "de":
            lang = "de";
            break;
        case "es":
            lang = "es";
            break;
        case "es":
            lang = "fr";
            break;
        default:
            lang = "en";
            break;
    }

    request({
        url: "https://graph.facebook.com/v2.6/" + senderID,
        qs: {
            access_token: process.env.PAGE_ACCESS_TOKEN,
            fields: "first_name"
        },
        method: "GET"
    }, (error, response, body) => {
        if (error) {
            console.error("Error getting user name: " + error);
        } else {
            let bodyObject = JSON.parse(body);
            console.log(bodyObject);
            let senderName = bodyObject.first_name;
        }
        let message = responses.greetings[lang][0].replace("$", senderName ? senderName : "");
        let message2 = responses.greetings[lang][1];
        let message3 = responses.greetings[langg][2].replace("$", `
        -color
        -hi`);
        sendMessage(senderID, {text: message}).then(() => {
            sendMessage(senderID, {text: message2}).then(() => {
                sendMessage(senderID, {text: message3}).then(() => {
                    sendMessage(senderID, {text: '🎈'});
                });
            });
        });
    });

    /*
    if (payload === 'WELCOME') {
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
                let senderName = bodyObject.first_name;
                greeting = "Hello " + senderName  + ". ";
            }
            let message = greeting + "Welcome to Digital nomads - Zadar. Hope you are doing good today";
            let message2 = "I am here to help you :-)"
            let message3 = `please type in one of the following commands:
                            - color
                            - hi`;
            sendMessage(senderID, {text: message}).then(() => {
                sendMessage(senderID, { text: message2 }).then(() => {
                    sendMessage(senderID, {  text: message3}).then(() => {
                        sendMessage(senderID, { text: '🎈' });
                    })
                });
            });
        });
    }
    */
}