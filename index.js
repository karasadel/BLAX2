<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>لوحة تحكم بوتاتي</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, sans-serif; }
        body { 
            background: #0b0e14; 
            color: #fff; 
            min-height: 100vh; 
            padding: 30px;
        }
        /* الهيدر العلوي */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 40px;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            padding-bottom: 20px;
        }
        .title-area {
            text-align: left;
        }
        .title-area h1 {
            font-size: 24px;
            color: #fff;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .title-area p {
            font-size: 13px;
            color: #8a99ad;
            margin-top: 4px;
        }
        .btn-add {
            background: linear-gradient(135deg, #00c6ff, #0072ff);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 10px;
            font-size: 15px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0, 114, 255, 0.4);
            transition: 0.3s;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .btn-add:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0, 114, 255, 0.6); }

        /* الكروت الإحصائية الثلاثة */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
        }
        .stat-card {
            background: #131823;
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 35px 20px;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .stat-card .number {
            font-size: 38px;
            font-weight: bold;
            color: #3b82f6;
            margin-bottom: 8px;
        }
        .stat-card .label {
            font-size: 14px;
            color: #8a99ad;
        }

        /* نافذة إضافة بوت المنبثقة (Modal) - مخفية افتراضياً وتظهر بالضغط */
        .modal-overlay {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(5px);
            display: none; /* مخفية حتى يتم الضغط على زر إضافة بوت */
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        .modal {
            background: #161b26;
            border: 1px solid rgba(255, 255, 255, 0.1);
            width: 100%;
            max-width: 480px;
            border-radius: 16px;
            padding: 25px;
            box-shadow: 0 10px 35px rgba(0,0,0,0.6);
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        .modal-header h3 {
            font-size: 20px;
            color: #fff;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .close-btn {
            background: #212631;
            border: none;
            color: #8a99ad;
            width: 32px; height: 32px;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            transition: 0.2s;
        }
        .close-btn:hover { background: #e53935; color: #fff; }

        /* صندوق التنبيه الإجباري */
        .warning-box {
            background: rgba(229, 57, 53, 0.12);
            border: 1px solid rgba(229, 57, 53, 0.3);
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 12px;
            line-height: 1.6;
            color: #ff8a80;
        }
        .warning-box b { color: #ff5252; }

        .form-group { margin-bottom: 15px; text-align: right; }
        .form-group label { display: block; font-size: 13px; color: #8a99ad; margin-bottom: 6px; }
        .form-group input {
            width: 100%;
            padding: 12px;
            background: #0b0e14;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 8px;
            color: #fff;
            font-size: 14px;
        }
        .form-group input:focus { outline: none; border-color: #3b82f6; }

        .modal-footer {
            display: flex;
            gap: 10px;
            margin-top: 20px;
        }
        .btn-submit {
            flex: 1;
            background: #3b82f6;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: 0.2s;
        }
        .btn-submit:hover { background: #2563eb; }
        .btn-danger {
            background: #e53935;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: 0.2s;
        }
        .btn-danger:hover { background: #c62828; }

        #statusMsg { text-align: center; margin-top: 15px; font-size: 13px; font-weight: bold; color: #3b82f6; }
    </style>
</head>
<body>

    <!-- الهيدر العلوي يحتوي على زر إضافة بوت -->
    <div class="header">
        <button class="btn-add" onclick="openModal()">+ إضافة بوت</button>
        <div class="title-area">
            <h1>بوتاتي 🤖</h1>
            <p id="subCount">0 بوت من أصل 2</p>
        </div>
    </div>

    <!-- الكروت الثلاثة الرئيسية -->
    <div class="stats-grid">
        <div class="stat-card">
            <div class="number" id="maxLimit">2</div>
            <div class="label">الحد الأقصى</div>
        </div>
        <div class="stat-card">
            <div class="number" id="onlineNow">0</div>
            <div class="label">متصل الآن</div>
        </div>
        <div class="stat-card">
            <div class="number" id="totalBots">0</div>
            <div class="label">إجمالي البوتات</div>
        </div>
    </div>

    <!-- النافذة المنبثقة (Modal) لإضافة البوت -->
    <div class="modal-overlay" id="botModal">
        <div class="modal">
            <div class="modal-header">
                <button class="close-btn" onclick="closeModal()">✕</button>
                <h3>إضافة بوت جديد +</h3>
            </div>

            <!-- رسالة التنبيه الإجبارية -->
            <div class="warning-box">
                ⚠️ <b>تنبيه هام جداً:</b> تأكد أن سيرفرك مثبّت عليه بلوقن <b>ViaVersion</b> و <b>ViaBackwards</b>، لأن البوت يتصل بإصدار 1.21.1 ثابت. بدون هذين البلوقنين، قد لا يستطيع البوت الاتصال إذا كان إصدار سيرفرك مختلفاً.
            </div>

            <div class="form-group">
                <label>🌐 IP السيرفر</label>
                <input type="text" id="host" value="blax2.play.hosting">
            </div>

            <div class="form-group">
                <label>🔌 المنفذ (Port)</label>
                <input type="number" id="port" placeholder="اتركه فارغاً إذا لم يوجد بورت">
            </div>

            <div class="form-group">
                <label>👤 اسم البوت</label>
                <input type="text" id="username" value="BLAX_BOT">
            </div>

            <div class="form-group">
                <label>⚙️ إصدار السيرفر</label>
                <input type="text" id="version" value="1.21.1">
            </div>

            <div class="modal-footer">
                <button class="btn-danger" onclick="stopBot()">إيقاف البوت 🛑</button>
                <button class="btn-submit" onclick="startBot()">تشغيل البوت 🚀</button>
            </div>

            <p id="statusMsg"></p>
        </div>
    </div>

    <script>
        const modal = document.getElementById('botModal');

        function openModal() {
            modal.style.display = 'flex'; // إظهار النافذة عند الضغط
        }

        function closeModal() {
            modal.style.display = 'none'; // إخفاء النافذة
        }

        async function updateStats() {
            try {
                const res = await fetch('/stats');
                const data = await res.json();
                document.getElementById('maxLimit').innerText = data.maxLimit;
                document.getElementById('onlineNow').innerText = data.onlineNow;
                document.getElementById('totalBots').innerText = data.totalBots;
                document.getElementById('subCount').innerText = `${data.totalBots} بوت من أصل ${data.maxLimit}`;
            } catch (e) {
                console.log('خطأ في جلب الإحصائيات');
            }
        }

        async function startBot() {
            const host = document.getElementById('host').value;
            const port = document.getElementById('port').value;
            const username = document.getElementById('username').value;
            const version = document.getElementById('version').value;
            const statusMsg = document.getElementById('statusMsg');

            statusMsg.style.color = "#ffeb3b";
            statusMsg.innerText = "⏳ جاري إرسال البوت للسيرفر...";

            const res = await fetch('/start-bot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ host, port, username, version })
            });

            const data = await res.json();
            statusMsg.style.color = "#00ffcc";
            statusMsg.innerText = data.message;
            updateStats();
        }

        async function stopBot() {
            const statusMsg = document.getElementById('statusMsg');
            statusMsg.style.color = "#ff9800";
            statusMsg.innerText = "⏳ جاري إيقاف البوت...";

            const res = await fetch('/stop-bot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await res.json();
            statusMsg.style.color = "#e53935";
            statusMsg.innerText = data.message;
            updateStats();
        }

        setInterval(updateStats, 2000);
        updateStats();
    </script>

</body>
</html>
