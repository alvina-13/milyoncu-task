const questions = [
    {
        question: "Bu ölkələrdən hansı Azərbaycanla quru sərhədə sahib deyil?",
        variants: ["Gürcüstan", "Türkiyə", "İran", "Qazaxıstan"],
        answer: 3
    },
    {
        question: "Yer kürəsinin neçə qütbü var?",
        variants: ["2", "4", "yoxdur", "5"],
        answer: 0
    },
    {
        question: "Hansı ölkə Böyük Britaniya ilə quru sərhədi bölüşür?",
        variants: ["İrlandiya", "Vyetnam", "Almaniya", "Portuqaliya"],
        answer: 0
    },
    {
        question: "Maşınqayırma sənayesinə görə Mərkəzi Asiyada birinci yer tutan ölkə hansıdır?",
        variants: ["Türkiyə", "Özbəkistan", "Qazaxıstan", "Türkmənistan"],
        answer: 1
    },
    {
        question: "Hansı tibb sahəsi dəri xəstəlikləri ilə məşğul olur?",
        variants: ["Nevrologiya", "Onkologiya", "Nefrologiya", "Dermatologiya"],
        answer: 3
    },
    {
        question: "20-ci əsrin ilk günü hansıdır?",
        variants: ["1 yanvar 2000", "1 yanvar 1900", "1 yanvar 2001", "1 yanvar 1901"],
        answer: 3
    },
    {
        question: "Almaniyanın pul vahidi:",
        variants: ["Avro", "Leone", "Dollar", "Funt sterlinq"],
        answer: 0
    },
    {
        question: "Kosmik gəmidəki kosmonavt səmanı hansı rəngdə görür?",
        variants: ["Ağ", "Qara", "Mavi", "Yaşıl"],
        answer: 1
    },
    {
        question: "Xlorun kimyəvi işarəsi nədir?",
        variants: ["CC", "Cl", "CO", "CK"],
        answer: 1
    },
    {
        question: "Nil çayı haradan axır?",
        variants: ["Hindistan", "Çin", "Misir", "Mesopotamiya"],
        answer: 2
    },
    {
        question: "İnsanın yerə baxanı...",
        variants: ["ulduzun aya baxanı", "suyun lal axanı", "heyvanın göyə baxanı", "çayın lal axanı"],
        answer: 1
    },
    {
        question: "Sahəsinə görə ən böyük türk respublikası:",
        variants: ["Türkmənistan", "Özbəkistan", "Türkiyə", "Qazaxıstan"],
        answer: 3
    },
    {
        question: "Məhz bu Azərbaycan filmində 4 dost mahnını eşitmək olar?",
        variants: ["Ulduz", "Gün keçdi", "Bəxtiyar", "Bəxt üzüyü"],
        answer: 3
    },
    {
        question: "Göyçay rayonu hansı meyvə ilə tanınır?",
        variants: ["Armud", "Nar", "Alma", "Heyva"],
        answer: 1
    },
    {
        question: "Termometr cihazı nəyi ölçür?",
        variants: ["təzyiqi", "temperaturu", "sürəti", "sıxlığı"],
        answer: 1
    },
];

let currentQuestion = 0;
let score = 0;
let fiftyUsed = false;
let timer;
let timeLeft = 30;

const questionEl = document.getElementById("question");
const optionBtns = [
    document.getElementById("variantA"),
    document.getElementById("variantB"),
    document.getElementById("variantC"),
    document.getElementById("variantD"),
];
const scoreEl = document.getElementById("score");
const resultEl = document.getElementById("result");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const backgroundMusic = document.getElementById("backgroundMusic");
const fiftyBtn = document.querySelector(".fiftyFifty");
const restartBtn = document.getElementById("restartBtn");
const timerEl = document.getElementById("timer");

const startPage = document.getElementById("startPage");
const startBtn = document.getElementById("startBtn");
const gamePage = document.getElementById("gamePage");


startBtn.addEventListener("click", () => {
    startPage.style.display = "none";
    gamePage.style.display = "block";
    backgroundMusic.play();
    loadQuestion();
});

function getPoints(index) {
    if (index < 5) return 10;
    else if (index < 10) return 100;
    else return 1000;
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 30;
    timerEl.innerHTML = `<i class="fa-solid fa-clock"></i> Zaman: ${timeLeft}`;
    timer = setInterval(() => {
        timeLeft--;
        timerEl.innerHTML = `<i class="fa-solid fa-clock"></i> Zaman: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeout();
        }
    }, 1000);
}

function handleTimeout() {
    optionBtns.forEach(btn => btn.disabled = true);
    const q = questions[currentQuestion];
    optionBtns[q.answer].classList.add("correct");
    resultEl.textContent = `Zaman bitdi! Xal: ${score}`;
    wrongSound.play();
    restartBtn.style.display = "inline-block";
}


function loadQuestion() {
    if (currentQuestion >= questions.length) {
        resultEl.textContent = `Təbriklər! Siz Milyonçu oldunuz! Xal: ${score}`;
        optionBtns.forEach(btn => btn.style.display = "none");
        restartBtn.style.display = "inline-block";
        clearInterval(timer);
        return;
    }

    const q = questions[currentQuestion];
    questionEl.textContent = q.question;

    optionBtns.forEach((btn, i) => {
        btn.textContent = q.variants[i];
        btn.disabled = false;
        btn.style.display = "inline-block";
        btn.classList.remove("correct", "incorrect");
    });

    resultEl.textContent = "";
    startTimer();
}

function handleAnswer(index) {
    clearInterval(timer);
    optionBtns.forEach(btn => btn.disabled = true);
    const q = questions[currentQuestion];
    const isCorrect = index === q.answer;

    if (isCorrect) {
        optionBtns[index].classList.add("correct");
    } else {
        optionBtns[index].classList.add("incorrect");
        optionBtns[q.answer].classList.add("correct");
    }

    setTimeout(() => {
        if (isCorrect) {
            correctSound.play();
            score += getPoints(currentQuestion);
            scoreEl.textContent = `Xal: ${score}`;
            currentQuestion++;
            loadQuestion();
        } else {
            wrongSound.play();
            resultEl.textContent = `Uduzdunuz! Xal: ${score}`;
            restartBtn.style.display = "inline-block";
        }
    }, 3000);
}

optionBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => handleAnswer(i));
});

fiftyBtn.addEventListener("click", () => {
    if (fiftyUsed) return;
    fiftyUsed = true;

    const q = questions[currentQuestion];
    let incorrectIndexes = [0, 1, 2, 3].filter(i => i !== q.answer);
    incorrectIndexes.sort(() => Math.random() - 0.5);
    incorrectIndexes.slice(0, 2).forEach(i => {
        optionBtns[i].style.display = "none";
    });
});

restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    fiftyUsed = false;
    scoreEl.textContent = "Xal: 0";
    resultEl.textContent = "";
    restartBtn.style.display = "none";

    optionBtns.forEach(btn => {
        btn.style.display = "inline-block";
        btn.classList.remove("correct", "incorrect");
        btn.disabled = false;
    });

    loadQuestion();
});
const backToStartBtn = document.getElementById("backToStartBtn");

backToStartBtn.addEventListener("click", () => {
    clearInterval(timer); 
    backgroundMusic.pause(); 
    backgroundMusic.currentTime = 0;
    gamePage.style.display = "none";
    startPage.style.display = "flex"; 
});
