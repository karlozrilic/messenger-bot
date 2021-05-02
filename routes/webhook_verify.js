import request from 'request';
import { processPostback } from '../processes/postback.js';
import { processMessage } from '../processes/messages.js';
import { processQuickReply } from '../processes/quickReply.js';

export const verifyWebhook = (app, chalk) => {

   	request({
		url: "https://graph.facebook.com/v10.0/me/messenger_profile",
		qs: {
			access_token: process.env.PAGE_ACCESS_TOKEN
		},
		method: "POST",
		json: {
			greeting:[
				{
				  locale: "default",
				  text: "Choose language bellow:"
				}
			],
			ice_breakers:[
				{
					question: "English",
					payload: "en"
				},
				{
					question: "Deutsche",
					payload: "de"
				},
				{
					question: "Español",
					payload: "es"
				},
				{
					question: "Français",
					payload: "fr"
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