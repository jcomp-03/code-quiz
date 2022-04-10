# Code Quiz (Focus: JavaScript)
###### GitHub Pages Deployment: https://jcomp-03.github.io/code-quiz/

The purpose of this week's challenge is to build out a code quiz utilizing predominantly JavaScript, its event listener methods, and then taking action when that event is observed. In order to develop the code for completing this assignment, I relied heavily on dynamic HTML markup creation by way of JavaScript.

The code quiz prompts the user to click on the start button. Once this 'click' from the user is observed, a callback function is executed which begins to show multiple-choice questions associated with general coding knowledge that the user must then respond to. The event listener for the user selecting a choice (i.e. an **\<li\>** element within a **\<ul\>** list) is attached to the **\<ul\>** element and then a .match method is used to check if the event.target (that is, the *thing* that was clicked on) matches the HTML element **\<li\>**; if this results as true then grade the user's choice by comparing against *that* question object's property __answRight__. If the user selected incorrectly, subtract some time from the timer and move on to the next question. In either case, the next question appears via dynamic creation of HTML elements. At the end of the code quiz, the user is shown their score (the time remaining) and allowed to enter their name for saving their score.

Below are a few screenshots which provide visual guide to how the program looks:

#### Screen upon page loading
![Screen on loading](/assets/images/capture-front-page.JPG)


#### Program as it looks progressing through the quiz
![Screen midway through the program](/assets/images/capture-choice-progression.JPG)

#### Final page view
![Final page display](/assets/images/capture-final-page.JPG)

A few aspects about the code I'm proud of having written is that the order in which the multiple-choices answers populate the screen is randomly generated for each question each instance. The easier method would have been to statically assign the order. Also, I incorporated the use of an object class for the questions. So, there are as many instances of object *Question* as there are questions in the question source file. Each object *Question* has five properties: interrogative, answRight, answWrong1, answWrong2, and answWrong3. These property-value pairs are used for giving the **\<h1\>** and **\<li\>** elements their text content.
