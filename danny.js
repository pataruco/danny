const Botkit = require('botkit');
require('moment-precise-range-plugin');
moment().format();

const controller = Botkit.slackbot({
  debug: false
  //include "log: false" to disable logging
  //or a "logLevel" integer from 0 to 7 to adjust logging verbosity
});

// connect the bot to a stream of messages
controller.spawn({
  token: 'xoxb-81725368998-YFmGmso3od5cN1oX7HtTNVo6',
}).startRTM()

// give the bot something to listen for.


controller.hears(['asap'], 'ambient', (bot, msg) => {

  bot.reply(msg, 'como estas');

  controller.storage.asap = {};

})




// controller.hears(['hello', 'hi'], 'direct_message,direct_mention,mention', function(bot, message) {
//
//     bot.api.reactions.add({
//         timestamp: message.ts,
//         channel: message.channel,
//         name: 'robot_face',
//     }, function(err, res) {
//         if (err) {
//             bot.botkit.log('Failed to add emoji reaction :(', err);
//         }
//     });
//
//
//     controller.storage.users.get(message.user, function(err, user) {
//         if (user && user.name) {
//             bot.reply(message, 'Hello ' + user.name + '!!');
//         } else {
//             bot.reply(message, 'Hello.');
//         }
//     });
// });
