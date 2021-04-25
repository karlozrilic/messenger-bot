import { senderAction } from '../templates/senderAction.js';
/*
const senderAction = require('../templates/senderAction');
*/

export const processMessage = (event) => {
    if (!event.message.is_echo) {
        const message = event.message;
        const senderID = event.sender.id;
        if (message.text) {
            let text = message.text;
            senderAction(senderID, text, event);
        }
    }
};