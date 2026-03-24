const quizData = [
    {
        q: "若對手場上（戰鬥場與備戰區）完全沒有寶可夢，會發生什麼事？",
        options: ["對手輸掉比賽", "對手從牌庫補一隻", "比賽暫停", "我方少拿一張獎賞卡"],
        correct: 0,
        cat: "勝利條件"
    },
    {
        q: "「支援者卡」在一回合內最多可以使用幾張？",
        options: ["無限張", "2張", "1張", "3張"],
        correct: 2,
        cat: "卡牌種類"
    },
    {
        q: "當你的寶可夢「撤退」到備戰區時，身上附著的能量卡該如何處理？",
        options: ["全部丟棄", "保留在原位置", "支付撤退所需的數量後丟棄", "移給新的戰鬥寶可夢"],
        correct: 2,
        cat: "對戰流程"
    }
];

let currentQ = 0;
let score = 0;

function loadQuestion() {
    const q = quizData[currentQ];
    document.getElementById('q-text').innerText = q.q;
    document.getElementById('q-category').innerText = q.cat;
    document.getElementById('quiz-progress').style.width = `${(currentQ / quizData.length) * 100}%`;
    
    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';
    
    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = "w-full text-left p-5 rounded-2xl border-2 border-slate-100 hover:border-blue-500 hover:bg-blue-50 transition-all font-bold text-slate-700 flex justify-between items-center group";
        btn.innerHTML = `${opt} <i class="fas fa-chevron-right opacity-0 group-hover:opacity-100 transition"></i>`;
        btn.onclick = () => checkAnswer(idx);
        grid.appendChild(btn);
    });
}

function checkAnswer(idx) {
    if(idx === quizData[currentQ].correct) score += (100 / quizData.length);
    
    currentQ++;
    if(currentQ < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('question-box').classList.add('hidden');
    document.getElementById('result-box').classList.remove('hidden');
    document.getElementById('quiz-progress').style.width = `100%`;
    
    const title = score >= 100 ? "頂尖訓練家！" : "繼續努力！";
    const desc = `你的最終得分為 ${Math.round(score)} 分。`;
    document.getElementById('result-title').innerText = title;
    document.getElementById('result-desc').innerText = desc;
    document.getElementById('result-icon').innerText = score >= 100 ? "👑" : "🎒";
}

// 記得在 showPage(5) 時呼叫 loadQuestion()
