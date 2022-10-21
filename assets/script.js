//1. display welcome screen with title and message asking user if they're ready to begin with 'OK' button
//2. once button is clicked, start timer in bottom right of Header and display first question
//3. if question is answered correctly, display 'correct' then display next question
//4. if question is answered incorrectly, reduce timer by 5 seconds, display 'incorrect', then move to next question
//5. after time runs out or all questions answered, game over message
//6. allow user to enter intitials to save score
//7. display top scores in order


var countdownTimer = document.getElementById("countdown");
var startBtn = document.getElementById("startQuiz");
var mainSection = document.querySelector("main");
var secondsLeft = 30;
var questionBox = document.getElementById("questionContainer");
var answerBox = document.getElementById("answerContainer");
var listEl = document.createElement("ol");
var li1 = document.createElement("li");
var li2 = document.createElement("li");
var li3 = document.createElement("li");
var li4 = document.createElement("li");
var divAnswer = document.createElement("div");
var questionNumber = 0;
var scoreTracker = 0;
var initialsContainer = document.createElement("div");
var initialsInput = document.createElement("input");
var scoreContainer = document.createElement("div");
var scoreSubmit = document.createElement("button");
var initials = localStorage.getItem("initials");
var finalScore = localStorage.getItem("finalScore");
var highScoreHeader = document.createElement("h2");
var highScore = document.createElement("div");


//start quiz button
startBtn.addEventListener("click", startQuiz);


//create a countdown function and end game when time runs out
function countdown() {
    var timeInterval = setInterval(function () {
        countdownTimer.textContent = "Time remaining: " + secondsLeft + "s";
        countdownTimer.setAttribute("style", "text-align: right; font-size = 2px; font-family: Helvetica");
        secondsLeft--;
        if (secondsLeft < 0) {
            countdownTimer.remove();
            clearInterval(timeInterval);
            mainSection.textContent = "Time is up!";
            saveScore ();
        }
    }, 1000);
}

//function to display question, options, display result, repeat for next questions
function askQuestion(question, choice1, choice2, choice3, choice4, correctChoice) {
    questionBox.innerText = question;
    answerBox.appendChild(listEl);

    listEl.appendChild(li1);
    listEl.appendChild(li2);
    listEl.appendChild(li3);
    listEl.appendChild(li4);
    listEl.appendChild(divAnswer);

    li1.textContent = choice1;
    li2.textContent = choice2;
    li3.textContent = choice3;
    li4.textContent = choice4;
    divAnswer.textContent = '';

    // Add styling to list element
    listEl.setAttribute("style", "background:rgb(28, 195, 117); padding:20px;");
    // Add styling to list items
    li1.setAttribute("style", " color:white; background: #666666; padding: 5px; margin-left: 35px;");
    li1.setAttribute("data-number", "1");
    li2.setAttribute("style", " color:white; background: #777777; padding: 5px; margin-left: 35px;");
    li2.setAttribute("data-number", "2");
    li3.setAttribute("style", " color:white; background: #888888; padding: 5px; margin-left: 35px;");
    li3.setAttribute("data-number", "3");
    li4.setAttribute("style", " color:white; background: #999999; padding: 5px; margin-left: 35px;");
    li4.setAttribute("data-number", "4");

    //trying to make answers clickable then append 'correct' or 'incorrect' message
    var questionResult = '';
    listEl.addEventListener("click", function (event) {
        var element = event.target;
        if (element.matches("li")) {
            var userChoice = element.getAttribute("data-number");
            console.log("User selected " + userChoice);
            //if the choice is a correct one, display "correct" then show next question or "you're done" if the last question
            if (userChoice == correctChoice) {
                divAnswer.textContent = "Correct";
                divAnswer.setAttribute("style", " color:black; background: white; padding: 5px; margin-left: 35px;");
                questionResult = 'correct';
                scoreTracker += 1;
                console.log(questionResult);
                questionNumber += 1;
                console.log("questionNumber is " + questionNumber);
                //1 second between questions
                setTimeout(function () {
                    if (questionNumber < 4) {
                        askQuestion(questions[questionNumber], choices1[questionNumber], choices2[questionNumber], choices3[questionNumber], choices4[questionNumber], answers[questionNumber]);
                    } else {
                        mainSection.textContent = "You're done!";
                        saveScore ();
                    }
                }, 1000)
                //if the choice is incorrect, display "incorrect" then show next question or "you're done" if the last question
            } else {
                divAnswer.textContent = "Incorrect";
                secondsLeft -= 10;
                divAnswer.setAttribute("style", " color:black; background: white; padding: 5px; margin-left: 35px;");
                questionResult = 'incorrect';
                console.log(questionResult);
                questionNumber += 1;
                console.log("questionNumber is " + questionNumber);
                //1 second between questions
                setTimeout(function () {
                    if (questionNumber < 4) {
                        askQuestion(questions[questionNumber], choices1[questionNumber], choices2[questionNumber], choices3[questionNumber], choices4[questionNumber], answers[questionNumber]);
                    } else {
                        mainSection.textContent = "You're done!";
                        saveScore ();
                    }
                }, 1000)
            }

        }
    })
}



//start quiz function
function startQuiz() {
    countdown();
    document.getElementById("startQuiz").remove();
    askQuestion(questions[questionNumber], choices1[questionNumber], choices2[questionNumber], choices3[questionNumber], choices4[questionNumber], answers[questionNumber]);
}

//function to save scores and initials
function saveScore () {
    var userScore = {
        initials,
        scoreTracker
    };
    mainSection.appendChild(initialsContainer);
    mainSection.appendChild(initialsInput);
    mainSection.appendChild(scoreContainer);
    initialsInput.setAttribute("style", "background-color: white; color: black; line-height: 8px; max-width: 180px; padding: 8px; text-align: center;");
    initialsContainer.innerHTML = "Initials Here: ";
    scoreContainer.textContent = "Your score: " + scoreTracker;
    mainSection.appendChild(scoreSubmit);
    scoreSubmit.setAttribute("style", "background-color: blue; color: white; border-radius: 8px; text-align: center; cursor: pointer; padding: 8px; line-height: 8px; mad-width: 350px");
    scoreSubmit.innerHTML = "Submit";
    scoreSubmit.addEventListener("click", function (event) {
        event.preventDefault();
        var initials = initialsInput.value;
        if (initials === "") {
            displayMessage("error", "Initials cannot be blank");
        } else {
            localStorage.setItem("userScore", JSON.stringify(userScore));
            setTimeout (function () {
                showScores();
            }, 500);
        }
    })
}

function showScores() {
    var showUserScore = JSON.parse(localStorage.getItem("userScore"));
    mainSection.appendChild(highScoreHeader);
    mainSection.appendChild(highScore);
    highScoreHeader.textContent = "High Scores";
    highScore.textContent = showUserScore.initials + ": " + showUserScore.scoreTracker;
}

//questions, choices, and answeres
var questions = ["Which of these characters immediately follows a function?", "this is question two", "this is question 3", "this is question 4"];
var choices1 = ["( )", "choice1", "another1", "4th 1"];
var choices2 = ["[ ]", "choice2", "another2", "4th 2"];
var choices3 = ["< >", "choice3", "another3", "4th 3"];
var choices4 = ["??", "choice4", "another4", "4th 3"];
var answers = ["1", "3", "1", "2"];







