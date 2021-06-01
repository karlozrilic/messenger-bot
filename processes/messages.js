import { senderAction } from '../templates/senderAction.js';
import { checkLanguageCode, checkLanguage, changeLanguage, clearLanguage } from '../functions/handleLanguage.js';
import responses from '../responses/responses.js';

const  WEBVIEW_HEIGH_RATIO = "compact";

export const processMessage = (event) => {
    if (!event.message.is_echo) {
        const message = event.message;
        const senderID = event.sender.id;
        if (message.text) {
            let original = message.text.toLowerCase();
            let text = original;

            let response;

            let flag;

            if (text.includes("-")) {
                const split = text.split(" -");
                flag = split[1];
                text = split[0];
            }
        
            if (Object.keys(responses.commands).includes(text)) {
                if (flag) {
                    response = {
                        text: responses.commands[text].descriptions[checkLanguageCode(senderID)]
                    };
                    senderAction(senderID, response, event);
                } else {
                    if (original == "visa" || original == "family" || original == "life" || original == "events" || original == "culture") {
                        response = {
                            attachment: {
                                type: "template",
                                payload: {
                                    template_type: "button",
                                    text: responses.commands[original].answers[checkLanguageCode(senderID)].message,
                                    buttons: [
                                        {
                                            type: "web_url",
                                            url: responses.commands[original].answers[checkLanguageCode(senderID)].link,
                                            title: responses.commands[original].answers[checkLanguageCode(senderID)].buttonText,
                                            webview_height_ratio: WEBVIEW_HEIGH_RATIO
                                        }
                                    ]
                                }
                            }
                        };
                        senderAction(senderID, response, event);
                    } else if (original == "change language") {
                        response = {
                            text: responses.commands[original].answers[checkLanguageCode(senderID)].message,
                            quick_replies: responses.commands[original].quick_replies.map(element => {
                                return {
                                    content_type: "text",
                                    title: element.title,
                                    payload: element.payload
                                }
                            })
                        };
                        senderAction(senderID, response, event);
                    } else if (original == "language") {
                        response = {
                            text: checkLanguage(senderID)
                        }
                        senderAction(senderID, response, event);
                    } else if (original == "clear") {
                        clearLanguage();
                        response = {
                            text: "Local storage cleared"
                        };
                        senderAction(senderID, response, event);
                    }
                }
            } else if (!Object.keys(responses.commands).includes(text) && flag) {
                senderAction(senderID, {text: "Cant find description for that command!"}, event);
            } else {
                senderAction(senderID, {text: "Sorry I didn't understand that!"}, event);
            }

            //senderAction(senderID, text, event);
        }
    }
};