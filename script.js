const questions=[
    {
        question:"Which is the largest animal in the world?",

        answers:[
            {text:"shark",correct:false},
            {text:"Blue Whale",correct:true},
            {text:"Elephant",correct:false},
            {text:"Giraffe",correct:false},
        ]
    },

    {
        question:"What is the tallest mountain in the world?",

        answers:[
            {text:"Mount Everest",correct:true},
            {text:"K2",correct:false},
            {text:"Mount Kilimanjaro",correct:false},
            {text:"Mount Mckinley(Denali)",correct:false},
        ]
    },
    {
        question:"Who painted the Mona Lisa?",

        answers:[
            {text:"Vincent van Gogh",correct:false},
            {text:"Pablo Picasso",correct:false},
            {text:"Leonardo da Vinci",correct:true},
            {text:"Michelangelo",correct:false},
        ]
    },
    {
        question:"Which planet is known as the Red planet",

        answers:[
            {text:"Venus",correct:false},
            {text:"Mars",correct:true},
            {text:"Jupiter",correct:false},
            {text:"Saturn",correct:false},
        ]
    },


];

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");
let currentQuestionIndex=0;
let score=0;

//! starting quix by score 0
function startQuiz(){
    let currentQuestionIndex=0;
    let score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}


//! show question
function showQuestion(){
    //! donot show previous questions
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+'. '+currentQuestion.question;

    currentQuestion.answers.forEach(answers=>{
        const button=document.createElement("button");
        button.innerHTML=answers.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        //* adding correct dataset to button element
        if(answers.correct){
            button.dataset.correct=answers.correct;//!adding a dataset named correct in each button
        }
        button.addEventListener("click",selectAnswer);
    })
}

//! function to hide previous questions

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);        
    }
    
}

 
function selectAnswer(event){
    const selectedbtn=event.target;//?selected button by clicking event
    const isCorrect=selectedbtn.dataset.correct==="true";
    if (isCorrect){
        selectedbtn.classList.add("correct");
        score++;
    }
    else{
        selectedbtn.classList.add("incorrect")
    }
    //* adding disable functionality when onclicking any event if it the dataset is true or false
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    //! on clicking button it will display next button
    nextButton.style.display="block";

}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

//! function to show score
function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again!";
    nextButton.style.display="block";
    currentQuestionIndex = -1;
    
}



//! adding event to next button to show next questions
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
        
})



startQuiz();



