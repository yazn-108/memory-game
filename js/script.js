"use strict";
let input = document.querySelector(".control input");
let start = document.querySelector(".control button");
let playerName = document.querySelector(".name span"); 
let time = document.querySelector(".time span");
let tries = document.querySelector(".tries span");
let duration = 1000;
let seconds = 0;
let minutes = 0;
let timeFunction;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];
let alert = document.querySelector(".control .alert");
let results = document.querySelector(".results");
let results_wrong = document.querySelector(".results .wrong");
let results_spent = document.querySelector(".results .spent");
let resultsButton = document.querySelector(".results button");
let allOPen = 0;
function startPage(){
    start.parentElement.remove();
        timeFunction = setInterval(function(){
                seconds++;
                if(seconds === 60){
                    seconds = 0;
                    minutes++;};
                time.innerHTML = `${minutes}:${seconds}`;},duration);   
        blocks.forEach((e,index) => {
            blocksContainer.children[index].classList.add("is-flipped");
        })
        setTimeout(() => {
            blocks.forEach((e,index) => {
                    blocksContainer.children[index].classList.remove("is-flipped");
            });
        }, duration);
}
start.addEventListener("click", () =>{
    if(input.value !== ""){
        sessionStorage.setItem("playerName", input.value);
        playerName.innerHTML = sessionStorage.getItem("playerName");
        startPage();
    }else{
        alert.classList.add("active");
        setTimeout(() => {
            alert.classList.remove("active");
        }, 2200);
    };
});
if(sessionStorage.getItem("playerName") !== null){
    playerName.innerHTML = sessionStorage.getItem("playerName");
    startPage();};
function shuffle(array){
    let current = array.length,
    temp,
    random;
    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    };
    return array;
};
shuffle(orderRange);
blocks.forEach((block,index) => {
    block.style.order = orderRange[index];
    block.addEventListener("click",function (){
        flipBlock(block);
    });
});
function flipBlock(selectBlock) {
    selectBlock.classList.add('is-flipped');
    let allFlipBlock = blocks.filter(ele => ele.classList.contains("is-flipped"));
    if(allFlipBlock.length === 2){
        stopClicking();
        check(allFlipBlock[0],allFlipBlock[1]);
    };
};
function stopClicking(){
    blocksContainer.style.pointerEvents = "none";
    setTimeout(() => {
        blocksContainer.style.pointerEvents = "";
    }, duration);
};
function check(firstBlock, secondBlock){
    if(firstBlock.dataset.language === secondBlock.dataset.language){
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");
        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");
        firstBlock.style.pointerEvents = "none";
        secondBlock.style.pointerEvents = "none";
        allOPen++;
        if(allOPen === 10){
            clearInterval(timeFunction)
            setTimeout(() => {
                results.classList.add("active");
                results_wrong.innerHTML = tries.innerHTML;
                results_spent.innerHTML = `${minutes}:${seconds}`;
                blocks.forEach((block) => {
                    block.classList.remove('has-match');
                });
            },duration);
        };
    }else{
        tries.innerHTML = parseInt(tries.innerHTML) + 1;
        setTimeout(() => {
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");
        },duration);
    };
};
resultsButton.addEventListener("click",() => {
    window.location.reload();
    
});