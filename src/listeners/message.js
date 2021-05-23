const { Listener } = require('discord-akairo');
class messageListener extends Listener {
  constructor() {
    super('message', {
      emitter: 'client',
      event: 'message'
    });
  };

  async exec(msg) {
    if (msg.author.bot) return;
    const { prefix } = this.client.commandHandler;
    if (msg.content === `<@!${this.client.user.id}>`) return msg.reply(`My prefix is \`${prefix}\``);

    return;
  };
};

module.exports = messageListener;