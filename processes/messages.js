const senderAction = require('../templates/senderAction');

module.exports = function processMessage(event) {
    if (!event.message.is_echo) {
        const message = event.message;
        const senderID = event.sender.id;
        if (message.text) {
            let text = message.text;
            senderAction(senderID, text, event);
        }
    }
}