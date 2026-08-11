const mineflayer = require('mineflayer');

const host = process.argv[2] || 'localhost';
const port = parseInt(process.argv[3]) || 25565;
const username = process.argv[4] || 'BLAX_Bot';

const bot = mineflayer.createBot({
    host: host,
    port: port,
    username: username,
    version: false // اكتشاف تلقائي للإصدار
});

bot.on('spawn', () => {
    console.log(`[Bot] تم الدخول بنجاح إلى السيرفر باسم: ${username}`);
});

// العودة للحياة تلقائياً فوراً عند الموت لمنع تراكم الموتات
bot.on('death', () => {
    console.log('[Bot] لقد مات البوت، جاري العودة للحياة (Respawn)...');
    bot.emit('respawn');
});

// حركة خفيفة وقصيرة لمنع طرد البوت أو وقوفه عرضة للضرر المستمر
setInterval(() => {
    if (!bot.entity) return;
    // قفز عشوائي لمنع الموت في مكان ثابت
    bot.setControlState('jump', true);
    setTimeout(() => {
        bot.setControlState('jump', false);
    }, 250);
}, 10000);

bot.on('chat', (username, message) => {
    console.log(`[Chat] <${username}> ${message}`);
});

bot.on('error', (err) => {
    console.log(`[Bot Error] ${err}`);
});

// استقبال الأوامر من الـ Server عبر الـ Standard Input
process.stdin.on('data', (data) => {
    const input = data.toString().trim();
    
    if (input.startsWith('MOVE:')) {
        const action = input.split(':')[1];
        if (action === 'forward') bot.setControlState('forward', true), setTimeout(() => bot.setControlState('forward', false), 500);
        if (action === 'back') bot.setControlState('back', true), setTimeout(() => bot.setControlState('back', false), 500);
        if (action === 'left') bot.setControlState('left', true), setTimeout(() => bot.setControlState('left', false), 500);
        if (action === 'right') bot.setControlState('right', true), setTimeout(() => bot.setControlState('right', false), 500);
        if (action === 'jump') bot.setControlState('jump', true), setTimeout(() => bot.setControlState('jump', false), 300);
    } else if (input.startsWith('CHAT:')) {
        const msg = input.split('CHAT:')[1];
        bot.chat(msg);
    }
});
