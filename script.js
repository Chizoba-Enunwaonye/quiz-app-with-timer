let start = document.querySelector("#start");


let guide = document.querySelector("#guide");
let exit = document.querySelector("#exit");
let continueBtn = document.querySelector("#continue");

let quiz = document.querySelector("#quiz");
let time = document.querySelector("#time");

let questionNo = document.querySelector("#questionNo");
let questionText = document.querySelector("#questionText");

let option1 = document.querySelector("#option1");
let option2 = document.querySelector("#option2");
let option3 = document.querySelector("#option3");
let option4 = document.querySelector("#option4");

let total_correct = document.querySelector("#total_correct");
let next_question = document.querySelector("#next_question");

let result = document.querySelector("#result");
let points = document.querySelector("#points");
let quit = document.querySelector("#quit");
let startAgain = document.querySelector("#startAgain");

let choice_que = document.querySelectorAll(".choice_que");


let index = 0;
let timer = 0;
let interval = 0;

let correct = 0;


let UserAns = undefined;

    start.addEventListener("click" , ()=>{
        start.style.display = "none";
        guide.style.display = "block";
    });
    
    
    exit.addEventListener("click" , () =>{
        start.style.display = "block";
        guide.style.display = "none";
    });

//Creating Timer for the Quiz Timer Section

let countDown = () => {
    if(timer === 20) {
        clearInterval(interval);
        next_question.click();
    }
    else
    {
        timer++;
        time.innerText = timer;
        
    }
}

//setInterval(countDown,1000);
let loadData = () => {
   questionNo.innerText = index + 1 + ". ";
   questionText.innerText = HCQS[index].question;
   option1.innerText = HCQS[index].choice1;
   option2.innerText = HCQS[index].choice2;
   option3.innerText = HCQS[index].choice3;
   option4.innerText = HCQS[index].choice4;
 
  
   //Timer start
 timer = 0;
 
}


 //what happen when "continue" button is click
 continueBtn.addEventListener("click" , () =>{
    quiz.style.display = "block";
    guide.style.display = "none";

    interval = setInterval(countDown, 1000);  
    loadData();

    
    //remove All active classes when continue button is click

    choice_que.forEach(removeActive =>{
         removeActive.classList.remove("active"); 
    })
    total_correct.innerHTML = `${correct = 0} out of ${HCQS.length} questions`;
});


choice_que.forEach((choices,choiceNo) =>{
    choices.addEventListener("click" , ()=>{
      choices.classList.add("active");
      //check answer
      if(choiceNo === HCQS[index].answer) 
      {
        correct++;
        
      }
      else
     {
        correct += 0;
     }
 
      //stop counter

      clearInterval(interval);

      //disable All Options when user select an option

for(i = 0; i <= 3; i++)
    {
        choice_que[i].classList.add("disabled");
    }
    })
});

//what happen when 'Next' button will click
next_question.addEventListener("click" , () => {
    //if index is less than HCQS.length


     if(index !== HCQS.length - 1) {
        index++;
        choice_que.forEach(removeActive => {
            removeActive.classList.remove("active");   
        }) 
        
        //question
        loadData();

        //result
        total_correct.style.display = "block";
        total_correct.textContent = `${correct} Out Of ${HCQS.length} Questions`;
        clearInterval(interval);
        interval = setInterval(countDown , 1000);
      
       
    }
    else 
    {
        index = 0;
        //when quiz Question complete Display Result Section
        clearInterval(interval);
        quiz.style.display = "none"
        points.innerHTML = `You Got ${correct} Out of ${HCQS.length}`;
        result.style.display = "block";
    }
    for (i = 0; i <= 3; i++) {
        choice_que[i].classList.remove("disabled");
        
    }
}) 

quit.addEventListener("click" , () =>{
    start.style.display = "block";
    result.style.display = "none";
});


startAgain.addEventListener("click" , ()=>{
    guide.style.display = "block";
    result.style.display = "none";
});