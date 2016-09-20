const Botkit = require('botkit');
require('moment-precise-range-plugin');
moment().format();

const controller = Botkit.slackbot({
  debug: true
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
})
