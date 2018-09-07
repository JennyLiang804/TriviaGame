var questions = [{
    question: "1. This kind of common, square pasta is stuffed with ground meat or vefetables. What kind of pasta is this?",
    choices: [" Orzo", " Alphabet", " Ravioli", " Lasagna"],
    correctAnswer: 2
}, {
    question: "2. What is the technical name for the red sauce commonly used on spaghetti and pizza?",
    choices: [" Red sauce", " Ketchup", " Pasta sauce", " Marinara sauce"],
    correctAnswer: 3
}, {
    question: "3. What kind of flat pasta, found in sheets with fluted edges, is often mixed with cheese and meat sauce in layers?",
    choices: [" Spaghetti", " Lasagna", " Fettuccine", " Orzo"],
    correctAnswer: 0
}, {
    question: "4. This type of pasta is long and stringy, and very popular throughout the west. It can be topped with tomato sauce, Parmesan cheese, and meatballs.",
    choices: [" Fettuccine", " Angle hair", " Spaghetti", " Bucatini"],
    correctAnswer: 2
}, {
    question: "5. Which of these is not an ingredient in pasta?",
    choices: [" Flour", " Cream", " Water", " egg"],
    correctAnswer: 1
}, {
    question: "6. Which continent does not sell pasta?",
    choices: [" Antarctica", " Africa", " Asia", " Australia"],
    correctAnswer: 0
}, {
    question: "7. The average American ate 20lbs of pasta in 1957. How much pasta did the average Italian eat?",
    choices: [" 100 lbs", " 80 lbs", " 65 lbs", " 40 lbs" ],
    correctAnswer: 1
}, {
    question: "8. Udon, Somen, Rice sticks, and Ramen are all types of pasta.",
    choices: [" True", " False"],
    correctAnswer: 0
}, {
    question: "9. In 18th century England, which of the following was a synonym for macaroni?",
    choices: [" Spiral", " Cheese", " Perfection", " Moist"],
    correctAnswer: 2
}, {
    question: "10. Do you think pasta is fattening? How many grams of fat does one cup of cooked pasta have?",
    choices: [" 1 gram", " 15 grams", " 40 grams", " 100 grams"],
    correctAnswer: 0
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;
var secs = 200;
var intervalId;



$(document).ready(function () {
    $("#start").on("click", run);
    $(".quizContainer").hide();

    function run() {
        intervalId = setInterval(decrement, 1000);
        $("#start").hide();
        $(".intro").hide();
    }

    function decrement() {
        secs--;
        $("#show-number").html("<h1> Time Left: " + secs + "</h1>");
        $(".quizContainer").show();



        if (secs === 0) {
            stop();
            alert("Time Up!");

            displayScore();
            $(".question").hide();
            $(".choiceList").hide();
            $("#show-number").hide();
            $(document).find(".nextButton").text("play Again?");
            quizOver = true;
        }
    }

    function stop() {
        clearInterval(intervalId);

    }

    //display first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    //on click next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {
            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("please select an answer");
                $(document).find(".quizMessage").show();
            } else {

                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++;
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    stop();
                    $(".question").hide();
                    $(".choiceList").hide();
                    $("#show-number").hide();
                    $(document).find(".nextButton").text("play Again?");
                    quizOver = true;
                }
            }
        } else {
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
            $("#show-number").hide();


        }
    });
});

//displays the current question and the choices
function displayCurrentQuestion() {

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    $(questionClass).text(question);
    //only shows the choices to current question
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    // whatever makes the page reload. 
    // location.reload();
    console.log("reset!")
    currentQuestion = 0;
    correctAnswers = 0;
    $(".question").hide();
    $(".choiceList").hide();
    $("#start").show();
    $(".quizContainer").hide();
    $("#start").on("click", run);
    var secs = 200;
    function run() {
        intervalId = setInterval(decrement, 1000);
        $("#start").hide();
        $('#show-number').show();
    }
    function decrement() {
        secs--;
        $("#show-number").html("<h1> Time Left: " + secs + "</h1>");
        // $(".quizContainer").show();
        $(".question").show();
        $(".choiceList").show();


        if (secs === 0) {
            stop();
            alert("Time Up!");

            displayScore();
            $(".question").hide();
            $(".choiceList").hide();
            $(document).find(".nextButton").text("play Again?");
            quizOver = true;
        }
    }

    function stop() {
        clearInterval(intervalId);
        $("#show-number").hide();
    }

    
    hideScore();
    console.log(correctAnswers)


}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You Scored: " + correctAnswers + " out of " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}

function playAgain() {
    $("#start").on("click", run);
    $(".quizContainer").show();

}






