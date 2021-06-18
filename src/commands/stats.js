const { Command } = require('discord-akairo'),
    os = require('os');

class StatsCommand extends Command {
  constructor() {
    super('stats', {
      category: 'Utility',
      description: 'Get the bot usages.',
      aliases: ['monitor', 'monit', 'statistics', 'stats'],
      cooldown: 3e3
    });
  };

  async exec(msg) {
    const sent = await msg.util.reply('📶 Getting info...');
    return sent.edit([
      `📈 **CPU Usage**: ${cpu()}`,
      `📊 **RAM Usage**: ${ram()}`
    ]);
  };
};

function cpu() {
    // Take the first CPU, considering every CPUs have the same specs
    // and every NodeJS process only uses one at a time.
    let cpus = os.cpus(),
        cpu0 = cpus[0];

    // Accumulate every CPU times values
    const total = Object.values(cpu0.times).reduce((acc, tv) => acc + tv, 0);

    // Normalize the one returned by process.cpuUsage()
    // (microseconds VS miliseconds)
    let usage = process.cpuUsage(),
        currentCPUUsage = (usage.user + usage.system) * 1000;

    // Find out the percentage used for this specific CPU
    const perc = (currentCPUUsage / total * 100).toFixed(2);
    let bar = "";

    for (var i = 0; i < 100; i+= 10) {
        bar += i < perc ? "▓" : "░";
    }

    return `\n\`${bar} ${perc}%\``;
};

function ram() {
    let list = [];

    Object.entries(process.memoryUsage())
        .forEach(item => list.push(`${item[0]}: ${(item[1] / 1024 / 1024).toFixed(4)} MB`));

    return `\`\`\`${list.join('\n')}\`\`\``;
};

module.exports = StatsCommand;
