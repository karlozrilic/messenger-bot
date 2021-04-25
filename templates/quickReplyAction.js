import { sendMessage } from '../messageSender/sendMessage.js';
/*
const sendMessage = require('../messageSender/sendMessage');
*/

export const quickReplyAction = (recipientId, payload) => {

    let message = {};
    
    switch (payload) {
        case "its-red":
            message = {
                text: "You selected Red"
            }
            break;
        case "its-green":
            message = {
                text: "You selected Green"
            }
            break;
        default:
            message = {
                text: "You didn't select anything"
            }
    }
    sendMessage(recipientId, message);
}