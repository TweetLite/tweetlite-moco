exports.use = function () {
	return function (args) {
		if (!args.message && !args.mention) {
			throw new Error('Message or Mention must be set')
		}

		var commands = null
		if (args.commands) {
			commands = require(args.commands)
		} else {
			throw new Error('Commands not found!')
		}

		this.use({
			userStream: {
				path: 'user',
				method: 'stream'
			},
			sendMessage: {
				path: 'direct_messages/new',
				method: 'post'
			},
			sendMention: {
				path: 'statuses/update',
				method: 'post'
			}
		})

		if (args.message) {
			var stream = this.userStream({stringify_friend_ids: true, with: 'following'})

			stream.on('direct_message', event => {
				if (event.direct_message) {
					var mesaj = event.direct_message
					var sender_id = mesaj.sender.id_str // eslint-disable-line camelcase
					var sender_name = mesaj.sender.screen_name // eslint-disable-line camelcase
					var text = mesaj.text

					var check = send(control(text, commands))

					if (check !== null && check.message === true && sender_name !== args.account) { // eslint-disable-line camelcase
						this.sendMessage({user_id: sender_id, screen_name: sender_name, text: check.reply}).then(result => { // eslint-disable-line camelcase
							if (!result.recipient_id) {
										// houston we have a problem
							}
						}).catch(err => {
							console.log(err)
						})
					}
				}
			})

			stream.on('disconnect', disconnectMessage => {
				console.log(disconnectMessage)
				stream.start()
			})
		}

		if (args.mention) {
			var id = args.mention
			var mention = this.tweetStream({follow: id})

			mention.on('tweet', twet => {
				if (twet.in_reply_to_user_id === id) {
					var text = twet.text
					var sender = twet.user.screen_name
					var check = send(control(text, commands))
					if (check !== null && check.mention !== false && sender !== args.account) {
						var reply = {}
						if (twet.in_reply_to_status_id === null) {
							reply.status = `@${twet.user.screen_name} ${check.reply}`
						} else {
							reply.in_reply_to_status_id = twet.in_reply_to_status_id
							reply.status = `@${twet.user.screen_name} ${check.reply}`
						}

						this.sendMention(reply).then(result => {
							if (!result.created_at) {
								// houston we have a problem
							}
						}).catch(err => {
							console.log(err)
						})
					}
				}
			})

			mention.on('disconnect', disconnectMessage => {
				console.log(disconnectMessage)
				mention.start()
			})
		}
	}
}

function control(msg, commands) {
	return commands.map(command => {
		var dump = null
		if (command.texts) {
			dump = command.texts.map(text => msg.toLowerCase().includes(text.toLowerCase()))
		}
		if (command.matchs) {
			dump = command.matchs.map(matc => msg.match(matc) !== null)
		}

		if (dump.indexOf(true) !== -1) {
			return {
				status: true,
				reply: command.reply(msg),
				message: command.message,
				mention: command.mention
			}
		}
		return {
			status: false,
			reply: null,
			message: false,
			mention: false
		}
	})
}

function send(que) {
	return (que.find(result => {
		return result.status === true && result.reply !== null
	}) || null)
}

exports.control = control
exports.send = send
