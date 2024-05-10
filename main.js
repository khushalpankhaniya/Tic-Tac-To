let boxs = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn = "0";
let gameEnded = false;
let count = 0;

const changeTurn = () => {
    turn = turn === "X" ? "0" : "X"
    return turn;
}

const checkWinner = () => {
    for (const pattern of winPatterns) {
        let pos1Val = boxs[pattern[0]].textContent;
        let pos2Val = boxs[pattern[1]].textContent;
        let pos3Val = boxs[pattern[2]].textContent;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                msg.innerText = `Congratulations, Winner is ${pos1Val}`;
                msgContainer.classList.remove("hide");
                gameEnded = true;
                return; // Exit the function if a winner is found
            }
        }
    }

    // Check for a draw
    if (!gameEnded && count === 9) {
        console.log("All buttons clicked");
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        gameEnded = true; 
    }
}

newBtn.addEventListener('click', () => {
    msgContainer.classList.add("hide");

    // Reset the game board
    boxs.forEach((box) => {
        box.innerText = "";
    });

    // Reset gameEnded flag
    gameEnded = false;
});

resetBtn.addEventListener('click', () => {
    boxs.forEach((box) => {
        box.innerText = "";
    });
    msgContainer.classList.add('hide');
});

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

boxs.forEach((box) => {
    box.addEventListener('click', (e) => {
        if (box.innerText == "" && !gameEnded) {
            box.innerText = turn;
            changeTurn()
            count++;
            checkWinner()
        }
    })
});

