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

Upon the <button> Start Quiz being clicked, the first question appears dynamically. This will happen by the current <div>
which holds the <h1>/<p>/<button> elements being removed and replaced by a new <div> which contains the first question
and the multiple choices. Thinking intelligently, the question and its multiple choices should be stored as an object inside
an array, with that object having the following properties and methods:
    - questionText: "Commonly used data types do not include:"
    - answRight: "alerts"
    - answWrong1: "strings"
    - answWrong2: "booleans"
    - answWrong3: "numbers"
    - someUnknownMethod1: function () {...block code here}
    - someUnknownMethod2: function () {...more block code}
*/

// Requiring fs module in which readFile function is defined.
// import * as fs from 'fs';

// global variables here
var questionObjectArray = []; // empty array to hold instances of object Question
var fileDataArray = [] // empty array to hold split string
var numQuestionObjects;
var quizMainEl = document.querySelector("#id-quiz-main");
var quizWrapperEl = document.querySelector("#id-quiz-wrapper");
var startButtonEl = document.querySelector("#start-my-quiz");
// string variables which holds the quiz questions
var data = "Commonly used data types do NOT include:,alerts,strings,booleans,numbers,"+
"The condition in an if/else statement is enclosed with:,quotes,curly brackets,parenthesis,"+
"square brackets,Arrays in JavaScript can be used to store:,all of the above,numbers and"+
" strings,other arrays,booleans,String values must be enclosed with ___ when being assigned"+
" to variables., quotes, commas, curly brackets, parenthesis,A very useful tool used during"+
" development and debugging for printing content to the debugger is:,console.log,JavaScript,"+
"terminal/bash,for loops"

// Constructor function
class Question {
    constructor(interrogative, answRight, answWrong1, answWrong2, answWrong3) {
        this.interrogative = interrogative;
        this.answRight = answRight;
        this.answWrong1 = answWrong1;
        this.answWrong2 = answWrong2;
        this.answWrong3 = answWrong3;
    }
}

function displayQuestionAndChoices(container) {

    // some additional code above the for loop may be necessary
    // I need to build out the handleSelectChoice() callback function on newDivWrapper and match the <li> element which is selected


    // loop through as many times as there are objects in questionObjectArray. In the future look to using array.forEach perhaps.
    for (let i = 0; i < numQuestionObjects; i++) {
    
        // create dynamically <h1> element and append to div wrapper
        var questionTitle = document.createElement("h1");
        questionTitle.setAttribute("data-index-question-object", i);
        questionTitle.className = "title-question";
        questionTitle.innerText = questionObjectArray[i].interrogative;
        container.appendChild(questionTitle);

        // create dynamically <ul> and append to div wrapper
        var choiceList = document.createElement("ul");
        choiceList.setAttribute("data-index-question-object", i);
        choiceList.className = "style-choice-list";
        choiceList.textContent = "This is <ul> number " + i;
        container.appendChild(choiceList);

        // repopulate this array after every iterating through an individual object's properties
        var propertiesArray = ["answRight", "answWrong1", "answWrong2", "answWrong3"];
        
        for (let j = 0; j < 4; j++) {
            // get some random number to cycle through object properties
            someRandomNum = randomNumber(0, propertiesArray.length-1);
            
            // create dynamically <ul> and append to div wrapper
            choiceListItem = document.createElement("li");

            // assign the current object to a variable
            currObj = questionObjectArray[i];
            // assign the current randomly-selected object property to a variable
            currProperty = propertiesArray[someRandomNum];
            // assign the innerText property the value of the randomly-selected property from the current object
            choiceListItem.innerText = currObj[currProperty];
            // remove that currently-selected random property from the propertiesArray
            propertiesArray.splice(someRandomNum, 1);
            // console.log(`Contents of propertiesArray is ${propertiesArray}.`);
            console.log(propertiesArray);
            // append the choice list item to the choice list
            choiceList.appendChild(choiceListItem);
        }

    }
    // append the choice list to the div wrapper
    container.appendChild(choiceList);
    
}

// callback function handleStartQuiz()
function handleStartQuiz() {
    // let the quiz begin!
    console.log("The Start Quiz button has been pressed!");
    
    // create new div wrapper for quiz question title and choices
    var newDivWrapper = document.createElement("div");
    newDivWrapper.innerText = "Hello I am some text that is inside my parent div "+
                                "Hello I am some text that is inside my parent div "+
                                "Hello I am some text that is inside my parent div "+
                                "Hello I am some text that is inside my parent div "+
                                "Hello I am some text that is inside my parent div "+
                                "Hello I am some text that is inside my parent div "+
                                "Hello I am some text that is inside my parent div "+
                                "Hello I am some text that is inside my parent div "+
                                "Hello I am some text that is inside my parent div "+
                                "Hello I am some text that is inside my parent div "+
                                "Hello I am some text that is inside my parent div ";
    newDivWrapper.className = "quiz-wrapper";

    // append new elements in the correct order
    quizWrapperEl.replaceWith(newDivWrapper);
    
    // run function displayQuestionAndChoices() and take as parameter the new div element
    displayQuestionAndChoices(newDivWrapper);
}

storeFileData();

function storeFileData() {
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
    // console.log(quizQuestionsArray);
}

// generate random number between min and max inclusive
function randomNumber(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
};


// event listeners
// on click of <button> Start Quiz, run callback handleStartQuiz()
startButtonEl.addEventListener('click', handleStartQuiz);

// this event listener may need to move location due to scoping? tbd
newDivWrapper.addEventListener('click', handleSelectChoice);

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

