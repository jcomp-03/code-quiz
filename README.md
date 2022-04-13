# Code Quiz (Focus: JavaScript)
###### GitHub Pages Deployment: https://jcomp-03.github.io/code-quiz/
A timer-based coding quiz application that stores high scores using client-side storage.
 - Create variables to store the quiz questions
 - Use mouse-click events to start the quiz
 - Write for loops to cycle through quiz questions
 - Use key-press events to receive user input in the form of answers to quiz questions
 - Create a time limit for the game using time functions
 - Write conditional statements to determine wrong and right answers
 - Use client-side storage to store high scores
 - Use GitHub Pages to publish the page to the web

Below are a few screenshots which provide visual guide to how the program looks:

#### Screen upon page loading
![Screen on loading](/assets/images/capture-front-page.JPG)


#### Program as it looks progressing through the quiz
![Screen midway through the program](/assets/images/capture-choice-progression.JPG)

#### Final page view
![Final page display](/assets/images/capture-final-page.JPG)

A few aspects about the code I'm proud of having written is that the order in which the multiple-choices answers populate the screen is randomly generated for each question each instance. The easier method would have been to statically assign the order. Also, I incorporated the use of an object class for the questions. So, there are as many instances of object *Question* as there are questions in the question source file. Each object *Question* has five properties: interrogative, answRight, answWrong1, answWrong2, and answWrong3. These property-value pairs are used for giving the **\<h1\>** and **\<li\>** elements their text content.
