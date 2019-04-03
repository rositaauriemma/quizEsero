const correctAnswerIcon = "https://www.atrattipercepisco.it/wp-content/uploads/2019/04/correct.png";
const wrongAnswerIcon= "https://www.atrattipercepisco.it/wp-content/uploads/2019/04/wrong.jpg";
const warningIcon = "https://www.atrattipercepisco.it/wp-content/uploads/2019/04/warning.jpeg";

let questionCounter = 0;
let score = 0;
let questionsArray = [
  {
    question: "1. Plants use carbon dioxide and water to make their own food through the process of photosynthesis. When they are doing a lot of photosynthesis, plants reflect light strongly in which of the following wavelengths? ",
    optionone: "Visible",
    optiontwo: "Ultraviolet",
    optionthree:"Near-infrared",
    
    correctAnswer: "Near-infrared"
  },
  {
     question: "2. Which of the following gases does not trap heat?",
    optionone: "Nitrogen",
    optiontwo: "Carbon dioxide",
    optionthree: "Water vapor",
    correctAnswer: "Nitrogen"
  
  },
  {
     question: "3. How does the sun produce energy?",
    optionone: "Nuclear fusion (fusing atoms together to form a larger atom)",
    optiontwo: "Nuclear fission (splitting atoms to form smaller atoms",
    optionthree: "Neither is correct",
    correctAnswer: "Nuclear fusion (fusing atoms together to form a larger atom)"
    
  },
  {
    question: "4. What is sea surface salinity?",
    optionone: "Salt concentration on the ocean's surface",
    optiontwo: "The light reflected off of the ocean's surface",
    optionthree: "The measure of tsunami strength",
    correctAnswer: "Salt concentration on the ocean's surface"
  },
  {
    question: "5.As average global temperature rises,?",
    optionone: "Average precipitation increases",
    optiontwo: "Average precipitation decreases",
    optionthree: "Average precipitation is unchanged",
    correctAnswer: "Average precipitation increases"
  },
  {
    question: "6. Which of these weather events can be worsened by global warming??",
    optionone: "Hurricanes",
    optiontwo: "Raining cats and dogs",
    optionthree: "Falling sky",
    correctAnswer: "Hurricanes"
  },
   {
    question: "7. What is a greenhouse gas?",
    optionone: "A gas made famous by its ability to strip green paint off of a house with its horrid smell.",
    optiontwo: "A gas that builds up in a greenhouse after the plants have had one too many burritos.",
    optionthree: "A gas that traps heat on Earth by preventing it from returning to space.",
    correctAnswer: "A gas that traps heat on Earth by preventing it from returning to space."
  },
  {
    question: "8. Which of the following can help reduce the amount of greenhouse gas released to the atmosphere?",
    optionone: "Spending your free time frantically running outside with a special carbon dioxide capturing net.",
    optiontwo: "Flying with a bunch of your friends to the beach, with each of you in your own private plane.",
    optionthree: "Carpooling",
    correctAnswer: "Carpooling"
  }
  ];

let questionsCount = questionsArray.length;

function handleStartClick(){
	$('.js-start-button').on('click',function(event){
		console.log("handleStartClick() ran");
		$('.progress-section').show();
		$('.start-section').hide();
		$('.end-section').hide();
		$('.quiz-box').fadeIn("slow");
		renderQuizBox(); 

	});
}

// This function displays the quizz box with the question, options, 
// score and question count
function renderQuizBox(){
  renderQuestionCount();
  renderQuestion();
  renderScore();
}
function renderScore(){
  $(".progress-section .score-card").text(`${score}/${questionsCount}`);
}
function renderQuestionCount(){
  $(".progress-section .question-count").text(`Question ${questionCounter+1} of ${questionsCount}`);
}

// This function renders a new question
function renderQuestion(){
  $(".questions-form p").text(questionsArray[questionCounter].question);
  $(".questions-form #option-one").val(questionsArray[questionCounter].optionone);
  $(".questions-form #option-two").val(questionsArray[questionCounter].optiontwo);
  $(".questions-form #option-three").val(questionsArray[questionCounter].optionthree);
  $(".questions-form #option-four").val(questionsArray[questionCounter].optionfour);
   
  $(".questions-form #option-one").next().text(questionsArray[questionCounter].optionone);
  $(".questions-form #option-two").next().text(questionsArray[questionCounter].optiontwo);
  $(".questions-form #option-three").next().text(questionsArray[questionCounter].optionthree);
  $(".questions-form #option-four").next().text(questionsArray[questionCounter].optionfour);
}

function handleSubmitAnswer(){
  $('.js-submit-button').on('click',function(event){
    console.log("handleSubmitAnswer() ran");
    let selectedOption = $('input[type=radio]:checked').val();
    if(selectedOption === undefined) {
       displayPopup(false, selectedOption);
    }
    else{
     //reset radio button
      $('input[type=radio]:checked').attr('checked',false);
      checkAnswer(selectedOption);
    }
 });
}


// This function checks whether the answer selected by the
// user is correct or not
function checkAnswer(selected){
  let rightAnswer = questionsArray[questionCounter].correctAnswer;
  
  if(selected === rightAnswer){
    score++;
    displayPopup(true, rightAnswer);
  } 
  else{
   displayPopup(false, rightAnswer);
  }
}

//This function gives feedback to the user whether 
//the option selected in correct or wrong. 
//It also alerts the user if no option is selected
function displayPopup(statusFlag, answer){
  $('.feedback-section').show();
  if(statusFlag){
    $(".popup-box img").attr("src",correctAnswerIcon);
    $(".popup-box #popup-text").text("You are right!");
    $(".popup-box").show();
  }
  else{
      if(answer === undefined) {
         questionCounter--;
         $(".popup-box img").attr("src",warningIcon);
         $(".popup-box #popup-text").text('Please select an option');
       }
      else{
         $(".popup-box img").attr("src",wrongAnswerIcon);
        $(".popup-box #popup-text").text(`Sorry, the correct answer was: ${answer}`);
      }
    }
     $(".popup-box").show();
}

//This function will proceed to the next question or display the final score
//based on the question count.
function handlePopupClose(){
  $('.js-close-button').on('click', function(event){
    console.log("handlePopupClose() ran");
    $('.popup-box').hide();
    $('.feedback-section').hide();
    $('.quiz-box').hide().fadeIn();
    questionCounter++;
    if(questionCounter < questionsArray.length) {
       $('.quiz-box').fadeIn();
       renderQuizBox();
    }
    else{
      $('.quiz-box').hide();
      displayFinalScore();
    }
  });
}

//This function displays the final score once the quiz is completed
function displayFinalScore(){
   $('.end-section').fadeIn(1000);
    if(score ==questionsCount){
       $('.end-section h4').text(`Congratulations! You got 
        a good score!: ${score}/${questionsCount}`);
  
  } 
 else 
  if(score <="4"){
     $('.end-section h4').text(`Try again: ${score}/${questionsCount}`);

     } 
  else {
    if (score>"4" && score<"8")
    {
     $('.end-section h4').text(`Good score: ${score}/${questionsCount}`);
       } 
    }
   $('.correct .count' ).text(score);
   $('.wrong .count').text(questionsCount - score);

   resetQuiz();
}

//This function resets the questions and score
function resetQuiz(){
  questionCounter = 0;
  score = 0;
}

//This function will start over the quiz
function handleStartOver(){
  $('.js-startover-button').on('click',function(event){
    console.log("handleStartOver() ran");
    $('.end-section').hide();
    $('.quiz-box').fadeIn();
    renderQuizBox();
  });
}

function init(){
  $('.end-section').hide();
  $('.progress-section').hide();
  $('.quiz-box').hide();
  $('.feedback-section').hide();
  handleStartClick();
  handleSubmitAnswer();
  handlePopupClose();
  handleStartOver()
}
$(init());
