const Discord = require('discord.js');
const superagent = require("superagent");
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
     props.conf.aliases.forEach(alias => {
    client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};
/////////////////////Komutlar Burdan Sonra Başlıyo//////////////////

//////////SelamınAleyküm-AleykümSelam//////////
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm Selam');
  }
});
////////////////////gelengiden////////////////////
client.on('guildMemberAdd', member => {
  let guild = member.guild;
  let joinRole = guild.roles.find('name', 'Üye');
  member.addRole(joinRole);

  const channel = member.guild.channels.find('name', 'sonsoz');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(member.user.username, member.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setTitle('📥 | Sunucuya katıldı')
  .setTimestamp()
  channel.sendEmbed(embed);
});
// SUNUCUYA ÇIKIŞ
client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', 'sonsoz');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(member.user.username, member.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setTitle('📤 | Sunucudan Ayrıldı')
  .setTimestamp()
  channel.sendEmbed(embed); 
});


//////////Çekiliş-yapma/////////////
client.on('message', msg => {
  if (msg.content.startsWith(prefix + "çekiliş")) {
    msg.channel.send(`Çekilişi Kazanan: ${msg.guild.members.random().displayName}`);
  }
});

////////////Botla Konuşma//////////
client.on('message', msg => {
  if (msg.author.bot) return;
  if (msg.content.toLowerCase().includes('sonsöz')) msg.reply('Efendim canım?');
  if (msg.content.toLowerCase().includes('eoo')) msg.reply('Neoo!');
  if (msg.content.toLowerCase().includes('seni seviyorum')) msg.reply(':heart: Bende Seni Seviyorum :heart:');
  if (msg.content.toLowerCase().includes('ömer')) msg.reply('Patron Seni Çağrıyolar');
  if (msg.content.toLowerCase().includes('hayalet')) msg.reply('Patron Seni Çağrıyolar');
});

////////////Matematik//////////////
client.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;

  let command = message.content.split(' ')[0];
  command = command.slice(ayarlar.prefix.length);

  let args = message.content.split(' ').slice(1);

  if (command === 'topla') {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p+c);
    message.channel.sendMessage(total);
    message.react('✅')
  }
  if (command === 'çıkar') {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p-c);
    message.channel.sendMessage(total);
    message.react('✅')
  }
  if (command === 'çarp') {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p*c);
    message.channel.sendMessage(total);
    message.react('✅')
  }
  if (command === 'böl') {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p/c);
    message.channel.sendMessage(total);
    message.react('✅')
  }
});

////////////////caps//////////////////
client.on('message' , msg => {
  if (msg.content.toLowerCase() === (ayarlar.prefix) + "caps") {
  var cumleler= [ 'düzgün item seç http://prntscr.com/h0ob8s','siker vallaha http://prntscr.com/h0oaif', 'zengin oldun http://prntscr.com/h0o52a', 'yarragımıda yeseydin http://prntscr.com/h0o3ei', 'ezan okunuyor kafir. http://prntscr.com/h0o26p', 'desteklemeyen kaldımı :D http://prntscr.com/h0o0ii','20 tane lahmacun ver http://prntscr.com/h0nz1e', 'eueueue 😄 http://prntscr.com/gwm1du', 'eueueue 😄 http://prntscr.com/gwm24r', 'eueueueu 😄 http://prntscr.com/gwm2m6', 'qudur 😄 http://prntscr.com/gwm3aa', 'uçuyorum amk 😄 http://prntscr.com/gwm3sy', 'dedeye bak hele 😄 http://prntscr.com/h0nuxw' ];

var cumle = cumleler[Math.floor(Math.random() * cumleler.length)];
msg.channel.sendMessage(cumle);
  }
 });
 ////////////////Zeka//////////////////////
 client.on('message', message => {
if (message.content.toLowerCase() === prefix + "zekam") {
    var sans = ["11", "15", "20", "24", "28", "32", "39", "45", "49", "54", "58", "63", "67", "77", "73", "84", "80", "83", "96", "94", "99", "Albert Einstein mısın krdşm"];
    var sonuc = sans[Math.floor((Math.random() * sans.length))];
    const embed = new Discord.RichEmbed()
    .addField(`***___Zekan___***`, `${sonuc}`)
    return message.channel.sendEmbed(embed);
}
});
////////////////////nasılsın////////////////////////
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'nasılsın') {
    msg.channel.sendMessage(`**İYİYİM SEN NASILSIN?** :ghost: `);
  }
});

//////////////////////Espiri//////////////////////////////
client.on('message', message => {
if (message.content.toLowerCase() === prefix + "espriyap") {
    var sans = ["Geçen gün geçmiş günlerimi aradım ama meşguldü.", "Yağmur yağmış kar peynir", "Dünya dönermiş ay da köfte…", "Bu erikson başka erik yok.", "Yıkanan Ton a ne denir Washington", "Hadi oyun oynayalım. Vazgeçtim oymadan oynayalım!", "Geçen gün kamyonu sürdüm Leonardo da Vinci.", "Doğumdan sonra çok kilo aldım. Doğduğumda 2 kiloydum şimdi 62.", "Adam 7 gün boyunca nezle olmuş. Sıkılmış bugün de Petek le olayım demiş.", "Yarasa yararlı bir hayvandır. Yararlı bir hayvan olmasaydı yaramasa derlerdi.", " Benim neden kardeşim yok baba  Seni görünce ikincisine cesaret edemedik.", "Tatlı yiyip, tatlı konuşuluyorsa bundan sonra mantı yiyip mantıklı konuşacağız.", "Babamı sahura kaldırmayı unuttuk anneme masada ne eksik diyorum tuzluk mu diyor.", "+Okeyde kıza elin nasıl dedim. Ojeli dedi. Ben Şoka girdim. O Migrosa.", "Canım sıkkın kanka sonra gel"];
    var sonuc = sans[Math.floor((Math.random() * sans.length))];
    const embed = new Discord.RichEmbed()
    .addField(`***___Espri___***`, `${sonuc}`)
    .setColor("RANDOM")
    return message.channel.sendEmbed(embed);
}
});
//////////////////sa-as-Tepki/////////////////////////////////
client.on('message', async msg => {
  if (msg.content.toLowerCase() === 'sa') {
    await msg.react('🇦');
    msg.react('🇸');
  }
  });
 ///////////////////Sözler//////////////////////////////////
  client.on('message', message => {
    if (message.content.toLowerCase() === prefix + "söz") {
    var sans = ["Belki hiç bir şey yolunda gitmedi ama hiçbir şey de beni yolumdan etmedi!.", "Gül biraz; bunca keder, bunca gözyaşı dinsin, gül biraz; şu gök kubbe kahkahanı işitsin. Her gidenin ardından koşmaya değmez hayat, gelecekleri bekle, gidecek varsın gitsin", "Herkes kendi kaderinin demircisidir", "Eğer aç ve kimsesiz bir köpeği alıp bakar ve rahata kavuşturursanız sizi ısırmaz. İnsan ve köpek arasındaki temel fark budur.", "Yalnızca kültürlü insanlar öğrenmeyi sever cahiller ders vermeyi tercih eder", "Tek başına hayatı öğrenen insanı kimse yokluğuyla korkutamaz!", "Farklı değilim ama, kimseye de benzemem..", "Hayatımda virgüle ve noktaya çok dikkat ederim.. Virgül gibi nerde duracağımı, nokta nibi nerde bitireceğimi iyi bilirim.", "Bazı insanlar hep “kaptan” olurlar; Söz konusu dümen çevirmek olunca!..."];
    var sonuc = sans[Math.floor((Math.random() * sans.length))];
    const embed = new Discord.RichEmbed()
    .addField(`***___Söz___***`, `${sonuc}`)
    .setColor("RANDOM")
    return message.channel.sendEmbed(embed);
}
});
//////////////////Sigara///////////////////////
client.on('message', msg => {
if (msg.content.toLowerCase() === prefix + "sigara") {
msg.channel.send(':smoking: :cloud::cloud::cloud:')
.then(nmsg => nmsg.edit(':smoking: :cloud::cloud::cloud:'))
.then(nmsg => nmsg.edit(':smoking: :cloud::cloud:'))
.then(nmsg => nmsg.edit(':smoking: :cloud::cloud:'))
.then(nmsg => nmsg.edit(':smoking: :cloud:'))
.then(nmsg => nmsg.edit(':smoking: :cloud:'))
.then(nmsg => nmsg.edit('**Sigaram bitti** | **Sigara İçmeyiniz.** :no_smoking: **Sigara Sağlığa Zararlıdır**'));
}
});

//////////////////Sunucu-Bot-Bilgi/////////////////////////////
client.on("message", message => {
    if (message.content.toLowerCase() === prefix + "sunucubilgi") {
        const embed = new Discord.RichEmbed()
    .setTimestamp()
    .setAuthor(message.guild.name, message.guild.iconURL)
    .addField('Sunucu Adı:', message.guild.name)
    .addField('Sunucu ID:', message.guild.id)
    .addField('Ana kanal:', message.guild.defaultChannel)
    .addField('Sunucu Bölgesi:', message.guild.region)
    .addField('Üye sayısı:', message.guild.memberCount)
    .addField('Sahibi:', message.guild.owner + ' (' + message.guild.ownerID + ')')
    .addField('Kanal sayısı:', message.guild.channels.size)
    .addField('Oluşturulma tarihi:', message.guild.createdAt)
            .setColor("RANDOM")

        return message.channel.sendEmbed(embed)
    }
    
    if (message.content.toLowerCase() === prefix + "botbilgi") {
    const embed = new Discord.RichEmbed()
        .addField("Bot Sahibi", `<@349569673903210496><@349569673903210496>`, true)
        .addField("Version", "2", true)
        .addField("Toplam Sunucu Sayısı", client.guilds.size, true)
        .addField("Toplam Kullanıcı Sayısı", client.users.size, true)
        .addField("Toplam Kanal Sayısı", client.channels.size, true)
        .setColor("RANDOM")
        return message.channel.sendEmbed(embed)
    }
});
///////////////////////Döviz///////////////////////////////////
client.on('message', async message => {
    if (message.content.toLowerCase() === prefix + 'döviz') {
    var request = require('request');
    request('https://www.doviz.com/api/v1/currencies/USD/latest', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) { 
    var info = JSON.parse(body);
    request('https://www.doviz.com/api/v1/currencies/EUR/latest', function (error, response, body) {
    if (error) return console.log('Hata:', error); 
    else if (!error) { 
    var euro = JSON.parse(body);
    message.channel.send(new Discord.RichEmbed().setDescription(`Dolar satış: ${info.selling} \nDolar alış: ${info.buying} \n\nEuro satış: ${euro.selling}TL \nEuro alış: ${euro.buying}TL`).setColor('RANDOM').setTitle('Anlık Döviz Kurları'))    }
})
    }
})
    }
});
///////////////////Yazı-Tura/////////////////////////////////
client.on('message', message => {
if (message.content.toLowerCase() === prefix + "yazıtura") {
    var result = Math.floor((Math.random() * 2) + 1);
    if (result == 1) {
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('')
    .setDescription('Tura.')
    .setThumbnail('https://i.imgur.com/iUaWmhg.jpg')
    message.channel.send(embed);
    } else if (result == 2) {
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('')
    .setDescription('Yazı.')
    .setThumbnail('https://i.imgur.com/54JPj7Z.jpg')
    message.channel.send(embed);
    }
}});
////////////////////////Ördek//////////////////////////////
client.on('message', async message => {
if (message.content.toLowerCase() === prefix + "ördek") {

    let embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTitle("Vak Vak...")
    .setImage(("https://random-d.uk/api/v1/images/"+ Math.floor(Math.random() * (1 - 20) + 60)+".jpg"))
    message.channel.send(embed)

}});

/////////////////////Reklam///////////////////////////////////
client.on("message", msg => {
    const reklam = ["discordapp", "discord.gg", "discord.tk", "discordbots.org", "https://discordapp.com", "https://discord.gg", "http://discord.gg", "htpp:/discordapp.com", "https://discordbots.org"];
    if (reklam.some(word => msg.content.includes(word))) {
    try {
    if (!msg.member.hasPermission("BAN_MEMBERS")) {
    msg.delete();

    return msg.reply('Reklam Yapmamalısın :warning:').then(msg => msg.delete(3000));
    }              
    } catch(err) {
    console.log(err);
   }
   }
    });
	
/////////////////////Tavsiye////////////////////////////////////////
client.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(' ')[0];
  command = command.slice(prefix.length);

  let args = message.content.split(' ').slice(1);

  if (command === 'tavsiyeni-gönder' || command === 'tavsiye') {
    let str = '<@IDniz>';//@silmeyin!
    let id = str.replace(/[<@!>]/g, '');
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.reply(` ⚠ tavsiyeni yazmayı unuttun. ⚠ `);
    message.channel.sendEmbed(new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(''));
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Tavsiye bilgileri;')
    .addField('Tavsiye:', mesaj, true)
    .addField('Kullanıcı adı:', message.author.tag, true)
    .addField('Kullanıcı kimliği:', message.author.id, true)
    .addField('Sunucu adı:', message.guild.name, true)
    .addField('Sunucu kimliği:', message.guild.id, true)
    client.fetchUser(id)
    .then(user => {user.send({embed})})
  }
});
//////////////////////Gelen giden/////////////////////
client.on('guildMemberAdd', member => {
  member.addRole(member.guild.roles.find(r => r.name.startsWith('Üye')));
  const channel = member.guild.channels.find('name', 'sonsoz');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
 .setColor('RANDOM')
 .setAuthor(member.user.tag, member.user.avatarURL || member.user.defaultAvatarURL)
 .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
 .setTitle('Üye katıldı;')
 .setDescription(`Sunucuya katıldı [${member.guild.memberCount} üye]!`)
 .setFooter('SonSöz', client.user.avatarURL)
 .setTimestamp()
 channel.send(embed);
});
////////////////////Resimli Hg BB/////////////////////
client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', 'sonsoz');
  if (!channel) return;
 const embed = new Discord.RichEmbed()
 .setColor('RANDOM')
 .setAuthor(member.user.tag, member.user.avatarURL || member.user.defaultAvatarURL)
 .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
 .setTitle('Üye ayrıldı;')
 .setDescription(`Sunucudan ayrıldı [${member.guild.memberCount} üye]!`)
 .setFooter('SonSöz', client.user.avatarURL)
 .setTimestamp()
 channel.send(embed);
});
///////////////////Özel dm///////////////////////////////
 client.on("message", message => {
    const dmchannel = client.channels.find("name", "dm-sonsoz");
    if (message.channel.type === "dm") {
        if (message.author.id === client.user.id) return;
        dmchannel.sendMessage("", {embed: {
                color: 3447003,
                title: `SİZİ SAPIKLAR SIZI DM: ${message.author.tag}`,
                description: `${message.content}`
              }})
    }
    if (message.channel.bot) return;
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(pracess.env.bot_token);
