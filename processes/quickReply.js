import { quickReplyAction } from '../templates/quickReplyAction';
/*
const quickReplyAction = require('../templates/quickReplyAction');
*/

export const processQuickReply = (event) => {
    if (!event.message.is_echo) {
        const message = event.message;
        const senderID = event.sender.id;
        if (message.quick_reply) {
            let payload = message.quick_reply.payload;
            quickReplyAction(senderID, payload);
        }
    }
}