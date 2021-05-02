import { senderAction } from '../templates/senderAction.js';
import { checkLanguage, changeLanguage, clearLanguage } from '../functions/handleLanguage.js';
import responses from '../responses/responses.js';

export const processMessage = (event) => {
    if (!event.message.is_echo) {
        const message = event.message;
        const senderID = event.sender.id;
        if (message.text) {
            let text = message.text.toLowerCase();

            let response;

            let flag;
        
            if (text.includes("-")) {
                text = text.split(" ")[0];
                flag = text.split(" -")[1];
            }
        
            if (Object.keys(responses.commands).includes(text)) {
                if (flag) {
                    if (responses.commands[text]) {
                        response = {
                            text: responses.commands[text].description
                        };
                    } else {
                        response = {
                            text: "No description for that command!"
                        }
                    }
                    senderAction(senderID, response, event);
                } else {
                    if (messageText == "hi" || messageText == "hello") {
                        response = {
                            text: checkLanguage(userID)
                        };
                        senderAction(recipientId, response, event);
                    } else if (messageText == "color") {
                        response = {
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
                        senderAction(recipientId, response, eent);
                    } else if (messageText == "de" || messageText == "es") {
                        response = {
                            text: changeLanguage(userID, messageText)
                        };
                        senderAction(recipientId, response, event);
                    } else if (messageText == "lang") {
                        response = {
                            text: checkLanguage(recipientId)
                        }
                        senderAction(recipientId, response, event);
                    } else if (messageText == "clear") {
                        clearLanguage();
                        response = {
                            text: "Local storage cleared"
                        };
                        senderAction(recipientId, response, event);
                    } else {
                        response = {
                            text: "I don't understand"
                        };
                        senderAction(recipientId, response, event);
                    }
                }
            } else {
                senderAction(senderID, "Cant find that command", event);
            }

            //senderAction(senderID, text, event);
        }
    }
};