import request from 'request';
import { processPostback } from '../processes/postback';
import { processMessage } from '../processes/messages';
import { processQuickReply } from '../processes/quickReply';
/*
const request = require('request');
const processPostback = require('../processes/postback');
const processMessage = require('../processes/messages');
const processQuickReply = require('../processes/quickReply');
*/

export const verifyWebhook = (app, chalk) => {

   	request({
		url: "https://graph.facebook.com/v10.0/me/messenger_profile",
		qs: {
			access_token: process.env.PAGE_ACCESS_TOKEN
		},
		method: "POST",
		json: {
			ice_breakers:[
				{
					question: "I want in! (only one that currently works)",
					payload: "WELCOME"
				},
				{
					question: "Where are you located?",
					payload: "LOCATION_POSTBACK_PAYLOAD"
				},
				{
					question: "What are your hours?",
					payload: "HOURS_POSTBACK_PAYLOAD"
				},
				{
					question: "Can you tell me more about your business?",
					payload: "MORE_POSTBACK_PAYLOAD"
				}
			]
		}
   	}, function(error, response) {
		if (error) {
			console.log("Error sending message: " + response.error);
		}
   	});

	app.get('/webhook', function(req, res) {
		if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN){
			console.log('webhook verified');
			res.status(200).send(req.query['hub.challenge']);
		} else {
			console.error('verification failed. Token mismatch.');
			res.sendStatus(403);
		}
	});
  
	app.post('/webhook', function(req, res) {
		//checking for page subscription.
		if (req.body.object === 'page') {
			/* Iterate over each entry, there can be multiple entries 
			if callbacks are batched. */
			req.body.entry.forEach(function(entry) {
			// Iterate over each messaging event
				entry.messaging.forEach(function(event) {
					//console.log(event)
					if (event.postback){
						processPostback(event);
					} else if (event.message){
						console.log(event.message.nlp);
						if (event.message.quick_reply) {
							processQuickReply(event);
						} else {
							processMessage(event);
						}
					}
				});
			});
			res.sendStatus(200);
		}
	});
};