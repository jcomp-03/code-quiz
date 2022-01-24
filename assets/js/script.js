/* I will begin the <body> with a <header> element which will hold inside a <p> element tucked in the top left corner of the <body>.
The <a> will link to a separate html page which stores the scores saved locally within the current browser session. 
The top 5 highest scores will be listed in descending order. There will be two buttons to go back to the start page
and to clear out the locally-saved score list. With respect to the JavaScript for this part, I will need to utilize
localStorage.setItem and localStorage.getItem methods; I will create a function to handle receiving a current user score and
determining if it merits saving locally, i.e. the score obtained breaks into the top 5 highest scores. The list will be an 
<ol> element.
The proposed functions so far are:
1. function gradeScoreObtained() or similar
2. function goToStartPage() or similar
3. function clearOutHighScores() or similar
The <header> will also have a <div> element which will hold the running time. This <div> will be tucked into the upper left
corner. The running time will start at the value of 110 and begin to count down the moment the user presses the <button>
Start Quiz. For every wrong answer the user selects, the running time will decrease by 10 instantaneously.
Next, the <body> will have a <main> element which presents front page of the code quiz. The <main> will have an <h1>
element, a <p> element, and the <button> element labeled "Start Quiz". I think I should contain the <h1>, <p>, and <button>
elements inside a <div class="front-page-wrapper">, for easier manipulation later on.
*/

// Requiring fs module in which readFile function is defined.
// import * as fs from 'fs';

// global variables here
var questionObjectArray = []; // hold instances of object Question
var fileDataArray = [] // hold split string from var data
var numQuestionObjects; // defined in storeFileData()
var questionIndex = 0; // position in object array
var userScore = 100; // begin timer at 100
var myIntervalId;

// variable references to HTML elements
var quizMainEl = document.querySelector("#id-quiz-main");
var quizWrapperEl = document.querySelector("#id-quiz-wrapper");
var startButtonEl = document.querySelector("#id-start-my-quiz");
var choiceListEl = document.createElement("ul");
var quizFooterEl = document.querySelector("footer");
var timerEl = document.getElementById("timer-element");

var positiveResponse = ["Correct! Good job.", "Nice! You are correct.", "That's correct!"];

// string variables which holds the quiz questions
var data = "Commonly used data types do NOT include:,alerts,strings,booleans,numbers,"+
"The condition in an if/else statement is enclosed with:,parenthesis,quotes,curly brackets,"+
"square brackets,Arrays in JavaScript can be used to store:,all choices,numbers and"+
" strings,other arrays,booleans,String values must be enclosed with ___ when being assigned"+
" to variables.,quotes,commas,curly brackets, parenthesis,A very useful tool used during"+
" development and debugging for printing content to the debugger is:,console log,JavaScript,"+
"terminal/bash,for loops"

// class declaration object Question
class Question {
    constructor(interrogative, answRight, answWrong1, answWrong2, answWrong3) {
        this.interrogative = interrogative;
        this.answRight = answRight;
        this.answWrong1 = answWrong1;
        this.answWrong2 = answWrong2;
        this.answWrong3 = answWrong3;
    }
}

gradeSelectedChoice = function(e) {
    // debugger;
    var clickedEl = e.target;
    // execute block statement while the user still has time
    // while (userScore > 0) {
        // check if event target matches <li> element
        if (clickedEl.matches('li')) {
            // store <li>'s text in variable userSelection
            var userSelection = clickedEl.textContent.split('.')[1].trim();
            // compare <li> textContent value to the property answRight of the current object
            if (userSelection === questionObjectArray[questionIndex].answRight) {
                showRight(quizFooterEl);
            } else {
                showWrong(quizFooterEl);
                userScore -= 10;
            }
            // increment counter by 1 to move to next object in questionObjectArray
            questionIndex++;
            
            // logic to determine if more questions remain to be asked
            if (questionIndex < numQuestionObjects){
                createQuestionAndChoices(quizWrapperEl);
            } else {
                // user has cycled through all the quiz questions. End game and show results
                return showScoreAndSaveToLocal(quizWrapperEl);
            }
        } else {
            console.log("The user did not select an <li> element");
            alert('Please select a choice');
        }
    // }
    // setTimeout(timeExpired(), 5000);


}


// timeExpired = function (container) {
//     if (userScore == 0) {
//         console.log('This console.log ran through the timeExpired() function.');
//     }
// }
    

createQuestionAndChoices = function(container) {
    
    // clear out div container and ul of any children
    container.replaceChildren();
    choiceListEl.replaceChildren(); 

    // dynamically create <h1> element
    var questionTitle = document.createElement("h1");
    questionTitle.setAttribute("data-index-question-object", questionIndex); // IN RETROSPECT DID NOT NEED CUSTOM DATA ATTRIBUTE!
    questionTitle.className = "title-question";
    questionTitle.innerText = questionObjectArray[questionIndex].interrogative;

    choiceListEl.setAttribute("data-index-question-object", questionIndex);
    choiceListEl.className = "style-choice-list crosshair";

    // repopulate this array after iterating through an individual object's properties
    // since it is gradually reduced to an empty array at the end of the next for loop
    var propertiesArray = ["answRight", "answWrong1", "answWrong2", "answWrong3"];
    
    for (let j = 0; j < 4; j++) {
        // get some random number to cycle through object properties
        someRandomNum = randomNumber(0, propertiesArray.length-1);
        
        // create dynamically <li> and append to choiceListEl
        choiceListItem = document.createElement("li");
        choiceListItem.setAttribute("data-index-question-object", questionIndex);
        choiceListItem.className = "style-choice-list-item hand-pointer background-change";
        choiceListEl.appendChild(choiceListItem);

        // assign <li> innerText property to value of the randomly-selected current object property
        choiceListItem.innerText = (j+1) + '. ' + questionObjectArray[questionIndex][propertiesArray[someRandomNum]]
        // remove that currently-selected random property from the propertiesArray
        propertiesArray.splice(someRandomNum, 1);
    }

    // Append <h1> and <ul> here
    container.append(questionTitle, choiceListEl);
}

showRight = function(container) {
    // clear the footer of children first
    quizFooterEl.replaceChildren();
    // create <h2> to display grade comment
    var choiceResultMessage = document.createElement("h2");
    choiceResultMessage.textContent = positiveResponse[randomNumber(0,positiveResponse.length-1)];
    choiceResultMessage.className = "choice-result-message";
    container.appendChild(choiceResultMessage);
}
showWrong = function(container) {
    // clear the footer of children first
    quizFooterEl.replaceChildren();
    // create <h2> to display grade comment
    var choiceResultMessage = document.createElement("h2");
    choiceResultMessage.textContent = "Wrong";
    choiceResultMessage.className = "choice-result-message font-red";
    container.appendChild(choiceResultMessage);
}

// callback function handleStartQuiz()
handleStartQuiz = function() {
    // let the quiz begin!
    console.log("The Start Quiz button has been pressed!");
    
    // create question and choices to begin
    createQuestionAndChoices(quizWrapperEl);
}

showScoreAndSaveToLocal = function(container) {
    setTimeout( function(){
        if(myIntervalId) {
            clearInterval(myIntervalId);
        }
        container.replaceChildren();
        quizFooterEl.replaceChildren();
        var divWrapper = document.createElement('div');
        var titleEl = document.createElement('h3');
        var scoreEl = document.createElement('p');
        var inputEl = document.createElement('input');
        var inputLabelEl = document.createElement('label');
        divWrapper.className = "end-game-save-user-info"
        inputEl.setAttribute("id", "user-initials");
        inputEl.setAttribute("type", "text");
        inputEl.className = "end-game-input";
        inputEl.setAttribute("placeholder", "Enter your first and last name here");
        inputLabelEl.setAttribute("for", "user-initials");
        inputLabelEl.className = "end-game-input-label"
        inputLabelEl.innerText = "Enter your name here:"
        titleEl.className = "title-question";
        titleEl.innerText = "You finished the quiz OR the quiz time is expired!"
        scoreEl.className = "quiz-paragraph end-game-score-text";
        scoreEl.textContent = "Your score is: " + userScore + ".";
        
        // append elements to container here
        divWrapper.append(inputLabelEl,inputEl);
        container.append(titleEl, scoreEl, divWrapper);
    }, 500);
}

beginTimer = function() {
    // run the timer down from 100
    myIntervalId = setInterval(() => {
        userScore--;
        timerEl.textContent = userScore;
        // if at any point the userScore is 0 or < 0, then set userScore to 0 and run
        // the function showScoreAndSaveToLocal()
        if (userScore === 0 || userScore < 0){
            clearInterval(myIntervalId);
            userScore = 0;
            timerEl.textContent = "Time expired";
            // add code to alert user time is up and give back score
            showScoreAndSaveToLocal(quizWrapperEl);
        }
    }, 1000);
}

storeFileData = function() {
    // populate empty array
    fileDataArray = data.split(",");
    
    // determine how many Question objects we will have
    numQuestionObjects = fileDataArray.length / 5; 

    // run this for loop for the length of fileDataArray
    for (let j = 0; j < fileDataArray.length; j++) {
        // create instance of object inside for loop;
        let myQuestion = new Question;
        // assign the property the corresponding value at index position j of fileDataArray
        myQuestion.interrogative = fileDataArray[j], j++;
        myQuestion.answRight = fileDataArray[j], j++;
        myQuestion.answWrong1 = fileDataArray[j], j++;
        myQuestion.answWrong2 = fileDataArray[j], j++;
        myQuestion.answWrong3 = fileDataArray[j];
        // push the object instance to the array quizQuestionsArray
        questionObjectArray.push(myQuestion);
    }

}

// generate random number between min and max inclusive
function randomNumber(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
}

// event listeners
// on click of start button, run callback handleStartQuiz()
startButtonEl.addEventListener('click', handleStartQuiz);
// on click of start button, begin timer
startButtonEl.addEventListener('click', beginTimer);
// on click of any <li> element, run callback gradeSelectedChoice()
choiceListEl.addEventListener('click', gradeSelectedChoice);

storeFileData();
// timeExpired();

/*
***** USER STORY *****
AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers

***** ACCEPTANCE CRITERIA *****
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score
*/