const Discord = require('discord.js')
const config = require('./config.json')
const client = new Discord.Client()

client.on('ready', () => {
	console.log('Client is ready.')
})

client.login(config.client_secret)

client.on('message', message => {
	if(message.content.startsWith('!cw')) {
		let cw = message.content.split('!cw')[1]
		let user = message.author
		let attachment = message.attachments.first()
		let original_message = message
		message.delete(500)
		client.channels.get(config.cw_channel).send({file: attachment.url})
		.then((message) => {
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
})
