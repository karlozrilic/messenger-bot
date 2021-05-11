import request from 'request';
/*
const request = require('request');
*/

export const sendMessage = (recipientId, message) => {
    return new Promise(function(resolve, reject) {
        request({
            url: "https://graph.facebook.com/v10.0/me/messages",
            qs: {
                access_token: process.env.PAGE_ACCESS_TOKEN
            },
            method: "POST",
            json: {
                recipient: {id: recipientId},
                message: message
            }
        }, function(error, response, body) {
            if (error) {
                console.log("Error sending message: " + response.error);
                reject(response.error);
            } else {
                resolve(body);
            }
        });
    })
}