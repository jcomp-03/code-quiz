// global variables here
var questionObjectArray = []; // hold instances of object Question
var fileDataArray = [] // hold split string from var data
var numQuestionObjects; // defined in storeFileData()
var questionIndex = 0; // position in object array
var userScore = 100; // begin timer at 100
var userScoreArray = [] // hold user scores
var myIntervalId;

// variable references to HTML elements
var divWrapperEl = document.querySelector("#id-div-wrapper");
var startButtonEl = document.querySelector("#id-start-my-quiz");
var submitButtonEl = document.createElement("button");
var nameInputEl = document.createElement('input');
var choiceListEl = document.createElement("ul");
var quizFooterEl = document.querySelector("footer");
var timerEl = document.getElementById("id-timer-element");
var viewHighScoreEl = document.querySelector("header p");

var positiveResponse = ["Good job!", "Nice! You're correct.", "Well done!", "That's correct!"];

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
    var clickedEl = e.target;
        // check if event target matches <li> element
        if (clickedEl.matches('li')) {
            // store <li>'s text in variable userSelection
            var userSelection = clickedEl.textContent.split('.')[1].trim();
            // compare <li> textContent value to the value of the property answRight of the current object
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
                createQuestionAndChoices();
            } else {
                // user has cycled through all the quiz questions. End game and show results
                return showScore(divWrapperEl, quizFooterEl);
            }
        // if the thing clicked on is not an <li> element, alert the user
        } else {
            console.log("The user did not select an <li> element");
            alert('Please select a choice');
            return false;
        }
}

createQuestionAndChoices = function() {
    // clear out div container and ul of any children
    divWrapperEl.replaceChildren();
    choiceListEl.replaceChildren();
    // dynamically create <h1> element
    var questionTitle = document.createElement("h1");
    questionTitle.className = "title-question";
    questionTitle.innerText = questionObjectArray[questionIndex].interrogative;
    choiceListEl.className = "style-choice-list crosshair";
    // repopulate this array after iterating through an individual object's properties
    // since it is gradually reduced to an empty array at the end of the for loop below
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
    divWrapperEl.append(questionTitle, choiceListEl);
}

showRight = function(footer) {
    // clear the footer of children first
    footer.replaceChildren();
    // create <h2> to display grade comment
    var choiceResultMessage = document.createElement("h2");
    choiceResultMessage.textContent = positiveResponse[randomNumber(0,positiveResponse.length-1)];
    choiceResultMessage.className = "choice-result-message";
    footer.appendChild(choiceResultMessage);
}

showWrong = function(footer) {
    // clear the footer of children first
    footer.replaceChildren();
    // create <h2> to display grade comment
    var choiceResultMessage = document.createElement("h2");
    choiceResultMessage.textContent = "Wrong";
    choiceResultMessage.className = "choice-result-message font-red";
    footer.appendChild(choiceResultMessage);
}

// callback function startQuiz() called when start button is clicked
startQuiz = function() {
    // let the quiz begin!
    console.log("The Start Quiz button has been pressed!");
    // create question and choices to begin
    createQuestionAndChoices();
}

// run this when timer finishes or user answers all quiz questions
showScore = function(container, footer) {
    setTimeout( function() {
        // clear out the timer id value created when the setTimeout
        // function runs initially in the function beginTimer()
        // In retrospect, not certain this does anything meaningful
        if(myIntervalId) {
            clearInterval(myIntervalId);
        }
        // clear out the quizWrapperEl and quizFooterEl (if latter even exists)
        container.replaceChildren();
        if(footer != undefined){
            footer.replaceChildren();
        }
        // create the wrapper div to hold the remaining elements below
        var divWrapper = document.createElement('div');
        divWrapper.className = "end-game-save-user-info";
        
        var titleEl = document.createElement('h3');
        titleEl.className = "title-question";
        titleEl.innerText = "You finished the quiz OR the quiz time is expired!";
        
        var scoreEl = document.createElement('p');
        scoreEl.className = "quiz-paragraph end-game-score-text";
        scoreEl.textContent = "Your score is: " + userScore + ".";
        
        var inputLabelEl = document.createElement('label');
        inputLabelEl.setAttribute("for", "user-initials");
        inputLabelEl.className = "end-game-input-label";
        inputLabelEl.innerText = "Enter name here:";

        nameInputEl.setAttribute("id", "user-initials");
        nameInputEl.setAttribute("type", "text");
        nameInputEl.className = "end-game-input";
        nameInputEl.setAttribute("placeholder", "First and last name");

        submitButtonEl.setAttribute("id", "id-submit-user-info");
        submitButtonEl.setAttribute("type", "submit");
        submitButtonEl.className = "end-game-button-submit";
        submitButtonEl.innerText = "Submit";
        // append elements to container here
        divWrapper.append(inputLabelEl, nameInputEl, submitButtonEl);
        container.append(titleEl, scoreEl, divWrapper);
    }, 500);
}

// callback function beginTimer() called when start button is clicked
beginTimer = function() {
    // run the userScore timer down from 100
    myIntervalId = setInterval(() => {
        userScore--; // globally-scoped variable I define in the beginning of my JS file.
        timerEl.textContent = userScore; // timerEl is a div to which I print the current time/userScore
        // if at any point the userScore is 0 or < 0, then set userScore to 0 and run
        // the function showScore()
        if (userScore === 0 || userScore < 0) {
            clearInterval(myIntervalId);
            userScore = 0;
            timerEl.textContent = "Time expired";
            showScore(divWrapperEl); // in my showScore function, I render the user's score to the screen. This can be done many different ways, obviously.
        }
    }, 1000);
}

// split data and store it into fileDataArray. Use the array to populate my object Question instances
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

// generate random number between min and max inclusive. I love this function.
function randomNumber(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
}

// save the user's score to local storage
saveUserScore = function(e) {
    if(e.target.matches("#id-submit-user-info")) { 
        var userInfo = nameInputEl.value;
        // check that user entered something
        if (userInfo && userInfo != "") {
            // push the name and score to the object array userScoreArray
            userScoreArray.push( {
                name: userInfo,
                score: userScore
            });
            // save to local storage
            localStorage.setItem("savedScores", JSON.stringify(userScoreArray));
            // go to the quiz main page
            goToMainPage(divWrapperEl);
        } else {
            alert("Please enter your name in the input field");
            return false;
        }
    } else {
        return false;
    }
}

// load saved scores from local storage
loadUserScores = function() {
    var savedUserScores = localStorage.getItem("savedScores");
    // if there are no scores to load from local storage, print to console and exit function
    if (!savedUserScores) {
        return console.log("From loadUserScores(): There are no saved user scores to load");
    }
    console.log("From loadUserScores(): Saved user scores have been loaded");
    // parse savedUserScores into our globally-defined array of objects
    userScoreArray = JSON.parse(savedUserScores);
};

goToMainPage = function() {
    userScore = 100;
    questionIndex = 0;
    timerEl.textContent = "";
    divWrapperEl.replaceChildren();
    // dynamically create <h1> element
    var pageTitle = document.createElement("h1");
    pageTitle.className = "title-question";
    pageTitle.innerText = "Coding Quiz Challenge";
    // dynamically create <p> element
    var pageParagraph = document.createElement("p");
    pageParagraph.className = "quiz-paragraph";
    pageParagraph.innerHTML = 
            "Try to answer the following code-related questions within the time limit.<br>"+
            "Keep in mind that incorrect answers will penalize your score/time.<br>"+
            "by ten seconds!"
    // reassign classes, attributes, text to startButtonEl declared globally
    startButtonEl.className = "button-start-quiz hand-pointer background-change";
    startButtonEl.setAttribute("type", "button");
    startButtonEl.setAttribute("id", "id-start-my-quiz");
    startButtonEl.innerText = "Start Quiz";
    // append elements to div wrapper
    divWrapperEl.append(pageTitle, pageParagraph, startButtonEl);
}

showHighScores = function() {
    // run the function loadUserScores
    loadUserScores();
    // clear out container and footer
    divWrapperEl.replaceChildren();
    quizFooterEl.replaceChildren();
    // dynamically create <h1> element
    var pageTitle = document.createElement("h1");
    pageTitle.className = "title-question";
    pageTitle.innerText = "High Scores List";
    // dynamically create <ol> element
    var pageList = document.createElement("ol");
    // sort the user score array using the property score
    userScoreArray.sort((a, b) => parseInt(b.score) - parseInt(a.score));
    // splice the array to show just the top 5 scores
    if (userScoreArray.length > 5) {
        userScoreArray.splice(5, userScoreArray.length);
    }
    //for each object in array, do the following:
    userScoreArray.forEach(object => {
        var pageListItem = document.createElement("li");
        pageListItem.className = "style-top-score-item";
        pageListItem.innerText = object.name + ' ' + object.score;
        pageList.append(pageListItem);
    })
    // create buttons
    var goBackButton = document.createElement("button");
    goBackButton.className = "button-start-quiz hand-pointer background-change";
    goBackButton.setAttribute("id", "id-go-back");
    goBackButton.innerText = "Go Back to Main Page";
    goBackButton.addEventListener('click', goToMainPage);

    var clearScoresButton = document.createElement("button");
    clearScoresButton.className = "button-start-quiz hand-pointer background-change";
    clearScoresButton.setAttribute("id", "id-clear-scores");
    clearScoresButton.innerText = "Clear High Scores";
    clearScoresButton.addEventListener('click', () => {
        localStorage.setItem("savedScores", "");
        console.log("From showHighScores(): User scores cleared in local storage");
        goToMainPage();
    });
    // append the title, list, and buttons to the container
    divWrapperEl.append(pageTitle, pageList, goBackButton, clearScoresButton);
}


// event listeners
// on click of start button, run callback startQuiz
startButtonEl.addEventListener('click', startQuiz);
// on click of start button, run callback beginTimer
startButtonEl.addEventListener('click', beginTimer);
// on click of any <li> element, run callback gradeSelectedChoice
choiceListEl.addEventListener('click', gradeSelectedChoice);
// on click of submit button, run callback saveUserScore
divWrapperEl.addEventListener('click', saveUserScore);
// on click of <p> element in header, run callback showHighScores
viewHighScoreEl.addEventListener('click', showHighScores)


storeFileData();

loadUserScores();
