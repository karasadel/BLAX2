const { Telegraf } = require('telegraf');
// ضع التوكن الخاص بك هنا
const bot = new Telegraf('8982853504:AAGDUTrZIbFlKWzwEeW8lYf8Cj5HGHOtbnU');

// هذا سيسمح للبوت بالتحدث مع السيرفر الرئيسي (app.js)
// ملاحظة: تأكد أنك تقوم بتصدير متغير الـ users أو إدارته بشكل مشترك
bot.start((ctx) => {
    ctx.reply('⚡ أهلاً بك في BLAX HOSTING Telegram Bot!\n\nيمكنك التحكم في بوت ماين كرافت الخاص بك من هنا.\nالأوامر المتاحة:\n/chat <رسالة> - لإرسال رسالة في الشات\n/jump - لجعل البوت يقفز');
});

// أمر لإرسال شات
bot.command('chat', (ctx) => {
    const message = ctx.message.text.split('/chat ')[1];
    if (!message) return ctx.reply('يجب كتابة رسالة بعد الأمر، مثلاً: /chat Hello!');
    
    // هنا سنقوم بإرسال الأمر إلى البوت المشغل عبر الموقع
    // يجب أن يكون لديك وصول لعملية البوت (botProcess)
    ctx.reply(`✅ تم إرسال الرسالة: "${message}"`);
});

// أمر للقفز
bot.command('jump', (ctx) => {
    ctx.reply('🦘 جاري تنفيذ أمر القفز...');
    // هنا سنرسل أمر MOVE:jump للـ botProcess
});

bot.launch().then(() => console.log('🤖 بوت التليجرام متصل وجاهز!'));
