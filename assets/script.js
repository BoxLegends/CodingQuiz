var quiz = [{question: "What operator is used to assign a value to a declared variable?", 
            choices: ["Colon (:)", "Equal sign (=)", "Question mark (?)", "Double-equal (==)"], 
            answer: "Equal sign (=)"},
            {question: "How do we declare a conditional statement in JavaScript?", 
            choices: ["while loop", "for each", "if...else", "for loop"], 
            answer:"if...else"},
            {question: "Commonly used data type do not include:", 
            choices: ["strings", "booleans", "alerts", "numbers"], 
            answer: "alerts"},
            {question: "The condition in an if/else statement is enclosed within ___.", 
            choices: ["quotes", "curly brackets", "parenthesis", "square brackets"], 
            answer: "parenthesis"},
            {question: "Arrays in JavaScript can be used to store ___.", 
            choices: ["numbers and strings", "other arrays", "booleans", "all of the above"], 
            answer: "all of the above"},
            {question: "String values must be enclosed within ___ when being assigned to variables.", 
            choices: ["commas", "curly brackets", "quotes", "parenthesis"], 
            answer: "quotes"}
    ]


var highscoreEl = document.getElementById("highscore");
var timerEl = document.querySelector("#timer");
var startquizBtn = document.querySelector("#startquiz");
var answersEl = document.querySelector("ol");
var titleEl = document.querySelector(".header");
var infoEl = document.querySelector("#info");
var messageEl =document.querySelector("#message");
var postscoreBtn = document.querySelector("#post-score");
var initialsEl = document.querySelector(".initials");
var highScoresPanelEl = document.querySelector(".highscores");
var backBtn = document.createElement("button");
var clearScoresBtn = document.createElement("button");


var timeRemanining = 40;
var index = 0;
var inccorectAnswers = 0;
var timeInterval;

const timeTitle = "Time Remaining: ";
const scoreCount = "View HighScore";
const h1Text = "Coding Quiz Timed Challenge";
const quizInstructions = "Try to answer the following code-related questions within the time limit. Keep in mind that incorect answers will penalize your score/time by ten seconds!";



function initalQuiz(){
    timeLeft = quiz.length * 12;
    titleEl.innerHTML = h1Text;
    infoEl.innerHTML = quizInstructions;
    highscoreEl.innerHTML = scoreCount;
    timerEl.innerHTML = timeTitle + timeRemanining;
    answersEl.innerHTML = "";
    startquizBtn.setAttribute("class", "button");
    highScoresPanelEl.innerHTML = ""; 
}

function initializeElements(){
    titleEl.innerHTML = "";
    infoEl.innerHTML = "";
    startquizBtn.setAttribute("stlye", "display:none;");
    answersEl.innerHTML = "";
    messageEl.innerHTML = "";

}

function renderQuestion(index){
    initializeElements();

    var quizQuest = quiz[index];
    infoEl.innerHTML = quizQuest.question;
    var choices = quizQuest.choices;
    var count = 0;

    for(var i =0; i < choices.length; i++){
        var choice =choices[i];
        var li = document.createElement("li");
        li.setAttribute("style","padding: 5px;");
        var a = document.createElement("a");
        a.setAttribute("href", "#");
        a.setAttribute("style", "background-color: purple; text-decoration: none; color: white;")
        a.setAttribute("data-index", index);
        count++;
        a.textContent = count + ".  " + choice;
        li.appendChild(a);
        answersEl.appendChild(li);
    }

}

function finalScore() {
    initializeElements();
    titleEl.innerHTML = "game over!";
    infoEl.innerHTML = "You finshed with a score of " + timeRemanining + ".";
    var initialsEl = document.querySelector(".initials");
    initialsEl.setAttribute("style", "display: block;");
    postscoreBtn.setAttribute("style", "display: block;");
    document.querySelector("#initials-input").value = "";
}

function renderQuizScores() {
    initialsEl.setAttribute("style", "display: none;");
    postscoreBtn.setAttribute("style", "display: none;");
    infoEl.innerHTML = "";
    timerEl.innerHTML = "";
    highScoresPanelEl.innerHTML = "";
    highscoreEl.innerHTML = "";

    titleEl.innerHTML = "highscores";

    var highscoreInfoEl = document.createElement("p");
    highscoreInfoEl.setAttribute("style", "highscoreinfo");

    backBtn.setAttribute("type", "submit");
    backBtn.setAttribute("class", "highscore-btn");
    backBtn.textContent = "RETURN";

    clearScoresBtn.setAttribute("type", "submit");
    clearScoresBtn.setAttribute("class", "highscore-btn")
    clearScoresBtn.textContent = "Clear Scores";

    highScoresPanelEl.appendChild(highscoreInfoEl);
    highScoresPanelEl.appendChild(backBtn);
    highScoresPanelEl.appendChild(clearScoresBtn);

    var myInitials = localStorage.getItem("intials");
    var score = localStorage.getItem("score");

    if (myInitials !== null){
        highscoreInfoEl.textContent = myInitials + " - " + score;
    }

}

function startTimer(){

    timeInterval = setInterval(function(){
        
        if (timeLeft > 0){
            timerEl.innerHTML = timeTitle + timeRemanining;
            timeLeft--;
        } else {
            clearInterval(timeInterval);
            timeLeft = 0;
            timerEl.innerHTML = timeTitle + timeRemanining;
            finalScore();
        }

    }, 1000)
}

backBtn.addEventListener("click", function(){
    initalQuiz();
});

clearScoresBtn.addEventListener("click", function(){

    localStorage.removeItem('initials');
    localStorage.removeItem('score');
    initializeElements();
    renderquizscores();

});

highscoreEl.addEventListener("click", function(event){
    if(timeInterval) {
        clearInterval(timeInterval);
    }
    initializeElements();
    renderQuizScores();
});

postscoreBtn.addEventListener("click", function(event){
    event.preventDefault();

    var myInitials = document.querySelector("#initials-input").value;
    if (myInitials === ""){
        alert("initials cannot be blank!")
        return;
    }

    var highscore = localStorage.getItem("score");
    if (highscore === null || highscore < timeRemanining) {
        highscore = timeRemanining;
    }

    myInitials = myInitials.toUpperCase();
    localStorage.setItem("initials", myInitials);
    localStorage.setItem("Score", highscore);
    renderQuizScores();

});

answersEl.addEventListener("click", function(event) {
    var element = event.target;
    if (element.matches("a") === false){
        return;
    }

    var choice = element.innerHTML.trim();
    var index = element.dataset.index; 

    if (choice.includes(quiz[index].answer)){
        messageEl.setAttribute("style", "color: green");
        messageEl.textContent = "Correct!";
    }else{
        timeRemanining = timeRemanining - 10;
        timerEl.innerHTML = timeTitle + timeRemanining;
        messageEl.setAttribute("style", "color: red");
        messageEl.textContent = "Wrong!";
    }

    var myTimeout = setTimeout(function() {
        index++;
        if (index < quiz.length) {
            renderQuestion(index);
        } else {
            clearInterval(timeInterval);
            clearTimeout(myTimeout);
            if (timeRemanining < 0) {
                timeRemanining = 0   
            }
            timerEl.innerHTML = timeTitle + timeRemanining;
            finalScore();
        }
        
    }, 500);

});

startquizBtn.addEventListener("click", function(event){
    event.preventDefault();

    startTimer();
    index = 0;
    renderQuestion(index);

});

initalQuiz();