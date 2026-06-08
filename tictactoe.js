let btn = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGame = document.querySelector("#new-game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //player X, player Y
let count = 0;
let winPatterns = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [0,4,8], [1,4,7], [2,5,8], [2,4,6]];

const resetGame = () => {
    turnO = true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

//Alternating turn
btn.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO === true){
            box.innerText="O"; //Player O
            turnO=false;

        } else{
            box.innerText="X"; //Player X
            turnO=true;
        }
        box.disabled=true;
        count++;

        let isWinner = checkWinner();

        if(count===9 && !isWinner){
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = "Game was a draw."
    msgContainer.classList.remove("hide");
    disableBoxes();
}

//To disable btn after winner is found
const disableBoxes=() => {
    for (let box of btn){
        box.disabled=true;
    }
}

//To enable boxes when game is restart
const enableBoxes = () => {
    for (let box of btn) {
        box.disabled=false;
        box.innerText="";
    }
};

//Who is the winner?
const showWinner = (winner) =>  {
    msg.innerText = `Congratulations! the winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

//Winner Condition
const checkWinner = () => {
    for(let pattern of winPatterns){
        let post1Val= btn[pattern[0]].innerText;
        let post2Val= btn[pattern[1]].innerText;
        let post3Val= btn[pattern[2]].innerText;

        if (post1Val != "" && post2Val != "" && post3Val != ""){
            if (post1Val === post2Val && post2Val === post3Val){
               console.log("Winner", post1Val);
               showWinner(post1Val); 
            }
        }
    }
}

//Draw Condition


newGame.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);