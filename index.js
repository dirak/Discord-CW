const Discord = require('discord.js')
const fs = require('fs')
const request = require('request')

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){    
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};


const client = new Discord.Client()

client.on('ready', () => {
	console.log('Client is ready.')
})

client.login('MzUwMDY0NzU3MTg2NzU2NjE4.DpexnA.P17eWG6TIHmiuIXzNgXSHknLHeI')

client.on('message', message => {
	if(message.content.startsWith('!cw')) {
		let cw = message.content.split('!cw')[1]
		let user = message.author
		let fields = message.attachments.map((a) => {
			download(a.url, `./files/${a.filename}`, () => {

			});
			return {
				"name": `${a.filename}`,
				"value": `<${a.url}>`
			}
		})

		message.delete(500)
		message.channel.send({
			embed: {
				"title": "This is an auto-generated attachment for content warnings",
				"description": cw,
				"color": 13148428,
				"timestamp": Date.now(),
				"author": {
					"name": user.username,
					"icon_url": user.avatarURL
				},
				"fields": fields
			}
		})
	}
	else if(message.content === '!dab') {
		let dab = client.emojis.find('name', 'transdab')
		message.channel.send(`${dab}`)
	}
})
