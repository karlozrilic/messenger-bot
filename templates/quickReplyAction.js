import { sendMessage } from '../messageSender/sendMessage.js';
import { changeLanguage } from '../functions/handleLanguage.js';
import responses from '../responses/responses.js';

export const quickReplyAction = (recipientId, payload) => {

    let message = {};

    if (Object.keys(responses.languages).includes(payload)) {
        changeLanguage(recipientId, payload);
        message = {
            text: responses.commands["change language"].quick_replies.filter(el => el.payload == payload)[0].title
        }
    } else {
        // TODO change to accept languges
        message = {
            text: "You didn't select anything"
        }
    }
    sendMessage(recipientId, message);
}