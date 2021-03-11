const processPostback = require('../processes/postback');
const processMessage = require('../processes/messages');
const processQuickReply = require('../processes/quickReply');

module.exports = function(app, chalk) {
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

      request({
            url: "https://graph.facebook.com/v2.6/me/messages",
            qs: {
               access_token: process.env.PAGE_ACCESS_TOKEN
            },
            method: "POST",
            json: {
               ice_breakers:[
                  {
                     question: "Where are you located?",
                     payload: "LOCATION_POSTBACK_PAYLOAD"
                  },
                  {
                     question: "What are your hours?",
                     payload: "HOURS_POSTBACK_PAYLOAD"
                  },
                  {
                     question: "What are your hours?",
                     payload: "HOURS_POSTBACK_PAYLOAD"
                  },
                  {
                     question: "Can you tell me more about your business?",
                     payload: "MORE_POSTBACK_PAYLOAD"
                  },
                  {
                     question: "What services do you offer? eeeeee",
                     payload: "SERVICES_POSTBACK_PAYLOAD"
                  }
               ]
            }
         }, function(error, response) {
            if (error) {
               console.log("Error sending message: " + response.error);
            }
         });

       /* Iterate over each entry, there can be multiple entries 
       if callbacks are batched. */
       req.body.entry.forEach(function(entry) {
       // Iterate over each messaging event
          entry.messaging.forEach(function(event) {
             console.log(event)
          if (event.postback){
             processPostback(event);
          } else if (event.message){
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
}