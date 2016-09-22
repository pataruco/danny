const Botkit = require('botkit');
const randomNumber = require('./helpers/random-number.js');
const request = require('request');

const controller = Botkit.slackbot({
  debug: false

});

// connect the bot to a stream of messages
controller.spawn({
  token: 'xoxb-81725368998-YFmGmso3od5cN1oX7HtTNVo6',
}).startRTM()

// *****************************************************************************
// Arnie quotes
// *****************************************************************************
const arnieQuotes = [
  `*To crush your enemies, see them driven before you, and to hear the lamentation of their women!* – _Conan the Barbarian_\n https://www.youtube.com/watch?v=Oo9buo9Mtos`,
  `*Your clothes, give them to me, now!* – _Terminator_ \n https://www.youtube.com/watch?v=x3pu25Eroi4`,
  `*If it bleeds, we can kill it* - _Predator_ \n https://www.youtube.com/watch?v=eNr0WXQ3Ho4`,
  `*See you at the party Richter!* - _Total Recall_ \n https://www.youtube.com/watch?v=q1FS_vKJl8U`,
  `*Let off some steam, Bennett* – _Commando_ \n https://www.youtube.com/watch?v=19R2fDXCzcM`,
  `*I’ll be back* – _Terminator_ \n https://www.youtube.com/watch?v=WgPePk3kGZk`,
  `*"Get to the chopper!* - _Predator_ \n https://www.youtube.com/watch?v=-9-Te-DPbSE`,
  `*Hasta La Vista, Baby!* - _Terminator_ \n https://www.youtube.com/watch?v=Q73gUUr8Zlw`,
  `*Now this is the plan: Get your ass to Mars!* - _Total Recall_ \n https://www.youtube.com/watch?v=dAX2H0hpOc4`,
  `*"It's not a tumor!* - _Kindergarten Cop_ \n https://www.youtube.com/watch?v=6ucfgdFrlho`,
  `*I live to see you eat that contract, but I hope you leave enough room for my fist, because I'm going to ram it into your stomach and break your goddamn spine! RAAGH!* - _The Running Man_ \n https://www.youtube.com/watch?v=9nz9-NWdsis`,
  `*"Dillon, you son of a bitch!* - _Predator_ \n https://www.youtube.com/watch?v=txuWGoZF3ew`,
  `*"You hit like a vegetarian!* - _Escape Plan_ \n https://www.youtube.com/watch?v=LLaOIXXalK8`,
  `*"What the fuck did I do wrong?!* - _Total Recall_ \n https://www.youtube.com/watch?v=oGcRTJK43OM`
];


controller.hears('arnie quote', 'ambient', (bot, msg)=> {
    let max = arnieQuotes.length;
    randomNumber( 0, max ).then((randomValue) => {
      let messageString = arnieQuotes[randomValue];
      bot.reply(msg, messageString);
    })
});

// *****************************************************************************
// Tea makers
// *****************************************************************************

const teaMakers = [`@elliott.evans :coffee:`, `@mike: :beer:`, `@pataruco :coffee:`, `@lewis: :coffee:`, `@ian.shaw: :coffee:`];

controller.hears('tea', 'ambient', (bot, msg)=> {
    let max = teaMakers.length;
    randomNumber( 0, max ).then((randomValue) => {
      let messageString = teaMakers[randomValue];
      bot.reply(msg, messageString);
    })
});

// *****************************************************************************
// Yoda quotes
// *****************************************************************************

const yodaQuotes = [
  "Agree with you, the council does. Your apprentice, Skywalker will be.",
  "Always two there are, no more, no less: a master and an apprentice.",
  "Fear is the path to the Dark Side. Fear leads to anger, anger leads to hate; hate leads to suffering. I sense much fear in you.",
  "Qui-Gon's defiance I sense in you.",
  "Truly wonderful the mind of a child is.",
  "Around the survivors a perimeter create.",
  "Lost a planet Master Obi-Wan has. How embarrassing. how embarrassing.",
  "Victory, you say? Master Obi-Wan, not victory. The shroud of the Dark Side has fallen. Begun the Clone War has.",
  "Much to learn you still have...my old padawan... This is just the beginning!", "Twisted by the Dark Side young Skywalker has become.",
  "The boy you trained, gone he is, consumed by Darth Vader.",
  "The fear of loss is a path to the Dark Side.",
  "If into the security recordings you go, only pain will you find.",
  "Not if anything to say about it I have.",
  "Great warrior, hmm? Wars not make one great.",
  "Do or do not; there is no try.",
  "Size matters not. Look at me. Judge me by my size, do you?",
  "That is why you fail.", "No! No different. Only different in your mind. You must unlearn what you have learned.",
  "Always in motion the future is.",
  "Reckless he is. Matters are worse.",
  "When nine hundred years old you reach, look as good, you will not.",
  "No. There is... another... Sky... walker..."
];

controller.hears('yoda quote', 'ambient', (bot, msg)=> {
    let max = yodaQuotes.length;
    randomNumber( 0, max ).then((randomValue) => {
      let messageString = yodaQuotes[randomValue];
      bot.reply(msg, messageString);
    })
});

// *****************************************************************************
// XKCD
// *****************************************************************************
controller.hears('xkcd', 'ambient', ( bot, msg )=> {
  randomNumber( 0, 1706 ).then( ( randomValue ) => {
    let optionsXkcd = {
      method: 'GET',
      url: `http://xkcd.com/${randomValue}/info.0.json`
    }

    request(optionsXkcd, (error, response, body) => {
      if (error) throw new Error(error);
      let xkcdData = JSON.parse(body);
      let title = xkcdData.safe_title;
      let img = xkcdData.img;
      let messageString = `*${title}*\n${img}`
      bot.reply(msg, messageString);
    });
  })
});

// *****************************************************************************
// Weather
// *****************************************************************************

controller.hears('weather (.*)', 'ambient', ( bot, msg) => {
  let options = {
    method: 'GET',
    url: 'http://api.openweathermap.org/data/2.5/weather',
    qs: { q: '',
      APPID: '4fd8ab9649f81ad2e6e9a02464bc6c3f',
      units: 'metric'
    }
  };

  let location = msg.match[1];
  options.qs.q = location;
  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    let condition = JSON.parse(body);
    let messageString = `*Condition:* ${condition.weather[0].description}\n*Temperature:* ${condition.main.temp}ºC\n*Wind:* ${condition.wind.speed}Km/h`;
    bot.reply(msg, messageString);
  });
});
