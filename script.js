
$(document).ready(function(){

	$(".startButton").click(function(){
		$("#questionContainer").toggle()
		$(".tally").toggle()
		$(".startButton").hide()
	})


	$(".userAnswer").click(function(event){
		window.selectedAnswer = $(this).attr("id")
		window.selectedAnswerValue = $(this).attr("value")
	})


	// question object
	
	function Question (question, options, answer) {
	    this.question = question;
	    this.options = options;
	    this.answer = answer;
	}

	Question.prototype.isRightAnswer = function (option) {
		return this.answer === option
	}



	var questionsArray = []
	var question1 = new Question ("What is a sandbag?", ["An easy climb", "A horrendously hard climb", "A climb which receives a much lower grade than deserved", "A climb which receives a much higher grade than deserved"], "option2")

	var question2 = new Question("The crux of a climb is:", ["The end of a very long climb","The hardest part of a climb","The easiest part of a climb", "The part where you were stronger in the climb"], "option1")

	var question3 = new Question("What is free climbing?",["To climb without a rope","Climbing without unnatural aids other than used for protection","Climbing a route alone with an auto-belay","Climbing without natural aids used for protection"], "option1")

	var question4 = new Question("Which is the best description for a crimp?", ["A horrendously small and slippery hold" ,"A very large hold that you can grab easily", "A hold which is only just big enough to be grasped with the tips of the fingers", "A rounded and slippery hold"], "option2")

	var question5 = new Question("What is a flash?", ["To successfully complete a climbing route without falling on the first attempt after receiving beta of some form", "To fall off a climbing route too quickly", "To successfully complete a route without falling", "To complete a climbing route very quickly"], "option0")

	var question6 = new Question("When the climber shouts at a belayer 'take!', he is:", ["Requesting the belayer to go back down","Requesting the belayer to give them more slack", "Requesting to take a break", "Requesting that the belayer removes all slack"], "option3")

	var question7 = new Question("What is a redpoint?", ["Completing a climb successfully without falling while on a top rope after making previous unsuccessful attempts, done without falling or resting on the rope","To complete a climb while placing protection on a lead climb after making previous unsuccessful attempts, done without falling or resting on the rope","To complete a lead climb after making previous unsuccessful attempts, done without falling or resting on the rope","To complete a lead climb on the first attempt without falling"], "option1")

	var question8 = new Question("What is flagging?", ["Climbing technique where a leg is held in a position to maintain balance, rather than to support weight", "A technique to barndoor and climb more dynamically","A technique to prepare yourself for jumping onto another hold","To use friction on the sole of the climbing shoe, in the absence of any useful footholds"], "option0")

	var question9 = new Question("What is talus hopping?", ["Jumping from the highest part of a boulder problem to the ground", "A technique that is typically used while lowering and cleaning gear from an overhanging and/or traversing route", "Jumping or transitioning from rock to rock in an area of large rock fragments on a mountainside that may vary from house-size to as small as a small backpack", "Scrambling to get to the top of an oddly shaped boulder"], "option2")

	var question10 = new Question("What is a whipper?", ["When the rope slashes a part of your body",  "Falling to the ground while leading", "Getting rope burnt", "Any fall beyond the last placed or clipped piece of protection"], "option3")

	questionsArray.push(question1, question2, question3, question4, question5, question6, question7, question8, question9, question10)

	var counter = 0
	var currentAnswerPoints = 0
	var totalPoints = 0

	// <--* button that runs the function for next question upon click *-->

	document.getElementById("nextButton").onclick = function () {
		nextQuestion()
	}


	//<--* function to repeat the quiz after clicking the button newQuiz *-->

	function setQuestion(index){
		document.getElementById("question").innerHTML = questionsArray[index].question
		document.getElementById("option0text").innerHTML = questionsArray[index].options[0];
		document.getElementById("option1text").innerHTML = questionsArray[index].options[1];
		document.getElementById("option2text").innerHTML = questionsArray[index].options[2];
		document.getElementById("option3text").innerHTML = questionsArray[index].options[3];
	}	

	$("#newQuiz").click(function(){
		$("#results").hide()
		$(".startButton").show()
		counter = 0
		currentAnswerPoints = 0
		totalPoints = 0
		document.getElementById("count").innerHTML = counter + 1
		setQuestion(0)
	})

	setQuestion(0)

	function nextQuestion () {
		if (counter === 9){
			console.log("EXTRA QUESTION ACTIVATED!!!")
			var userAnswer = window.selectedAnswer
			var userAnswerCorrect = questionsArray[counter].isRightAnswer(userAnswer)
			if (questionsArray[counter].isRightAnswer(userAnswer)){
				currentAnswerPoints=1
			}
			else if(!userAnswer || questionsArray[counter].isRightAnswer(userAnswer)===false){
				currentAnswerPoints = 0
			}
			$("#results").hide()
			$("#resultButton").toggle();
			$("#questionContainer").hide();
			$(".tally").hide();
		} else {
			var userAnswer = window.selectedAnswer
			var userAnswerCorrect = questionsArray[counter].isRightAnswer(userAnswer)
			if (questionsArray[counter].isRightAnswer(userAnswer)){
				currentAnswerPoints=1
			}
			else if(!userAnswer || questionsArray[counter].isRightAnswer(userAnswer)===false){
				currentAnswerPoints = 0
			}
			counter++

			if(counter<10){
				setQuestion(counter)
			}

			$('input[name=option]').attr('checked',false);
			document.getElementById("count").innerHTML = counter + 1
			totalPoints = totalPoints + currentAnswerPoints
			currentAnswerPoints = 0
			document.getElementById("score").innerHTML = totalPoints
		}
	
	}

	//<--* function to get the results according to score *-->

	document.getElementById("resultButton").onclick = function (){
		$("#results").show()
		$("#resultButton").hide();
		$("#newQuiz").show(); 
		if (totalPoints<=2){
			$(".climbingRookie").show()
			$(".gymRat").hide()
			$(".master").hide()
			$(".ocassional").hide()
		} 
		else if (totalPoints >2 && totalPoints <= 3){
			$(".gymRat").show()
			$(".climbingRookie").hide()
			$(".master").hide()
			$(".ocassional").hide()
		}
		else if (totalPoints >3 && totalPoints <= 8){
			$(".ocassional").show()
			$(".climbingRookie").hide()
			$(".gymRat").hide()
			$(".master").hide()
		}
		else {
			$(".master").show()
			$(".climbingRookie").hide()
			$(".gymRat").hide()
			$(".ocassional").hide()
		}
	}

})