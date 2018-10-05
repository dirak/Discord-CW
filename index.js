const Discord = require('discord.js')
const fs = require('fs')
const request = require('request')

var download = function(uri, filename){
	return new Promise((resolve, reject) => {
		request.head(uri, function(err, res, body){    
			request(uri).pipe(fs.createWriteStream(filename)).on('close', (err, response, body) => {
				if(err) return reject(err)
				resolve(filename)
			})
		})
	})
}


const client = new Discord.Client()

client.on('ready', () => {
	console.log('Client is ready.')
	/*client.guilds.forEach((guild) => {
		if(guild.id == '497427504232005634')console.log(guild.channels.values())
	})*/
})

client.login('MzUwMDY0NzU3MTg2NzU2NjE4.DpexnA.P17eWG6TIHmiuIXzNgXSHknLHeI')

client.on('message', message => {
	if(message.content.startsWith('!cw')) {
		let cw = message.content.split('!cw')[1]
		let user = message.author
		let attachment = message.attachments.first()
		let original_message = message
		download(attachment.url, `./files/${attachment.filename}`)
		.then((filename) => {
			message.delete(500)
			return client.channels.get('497559630407532544').send({file: filename})
		}).then((message) => {
			let attachment = message.attachments.first()
			original_message.channel.send({
				embed: {
					"title": "This is an auto-generated attachment for content warnings",
					"description": cw,
					"color": 13148428,
					"timestamp": Date.now(),
					"author": {
						"name": user.username,
						"icon_url": user.avatarURL
					},
					"fields": [{
						"name": "image",
						"value": `${attachment.url}`
					}]
				}
			})
		}).catch((err) => {
			console.log(err)
		})
	}
	else if(message.content === '!dab') {
		let dab = client.emojis.find('name', 'transdab')
		message.channel.send(`${dab}`)
	}
})
