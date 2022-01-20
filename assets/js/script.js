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
// global variables here
var quizQuestionsArray = []; // empty array to hold instances of object Question
var fileDataArray = [] // empty array to hold split string
var numQuestionObjects;

// Constructor function
function Question(interrogative, answRight, answWrong1, answWrong2, answWrong3) {
    this.interrogative = interrogative;
    this.answRight = answRight;
    this.answWrong1 = answWrong1;
    this.answWrong2 = answWrong2;
    this.answWrong3 = answWrong3;
}

// Requiring fs module in which 
// readFile function is defined.
const fs = require('fs');

fs.readFile('questions.txt', 'ascii', function (err, data) {
    if (err) {
        throw err;
    }
    // run storeFileData() and store data in the empty string array fileDataStringArray
    storeFileData(data);
})


function storeFileData(data) {
    // populate empty array
    fileDataArray = data.split(",");
    
    // determine how many Questions object we will have
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
        quizQuestionsArray.push(myQuestion);
    }
}

// this is the callback function when the user clicks on <button> Start Quiz
function startGame() {

}


With respect to the JavaScript for this part, I will attach event listeners to the <button> Start Quiz on the homepage. When the event occurs,
the callback function will dynamically remove the <div class="front-page-wrapper"> and replace with a new <div class="quiz-question-wrapper">.
This callback could be called startQuiz(). Inside startQuiz(), ... 
*/


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

