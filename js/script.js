const typingText = document.querySelector(".typing-text p"),
    wrapper = document.querySelector(".wrapper"),
    inputField = document.querySelector(".wrapper .input-field"),
    timeTag = document.querySelector(".time b"),
    wpmTag = document.querySelector(".wpm b"),
    cpmTag = document.querySelector(".cpm b"),
    mistakeTag = document.querySelector(".mistake span b"),
    tryAgain = document.querySelector("#tryAgain"),
    startBtn = document.querySelector(".start"),
    welcome = document.querySelector(".wlcm-msg");

let timer,
    maxTime = 60,
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;

function randomParagraph() {
    // getting random number which will always be less than paragraph length
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    // getting random item from the paragraph array, splitting all characters of it
    // adding each character inside span  and then adding this span inside p tag 
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    // focusng input field on key down or click event
    document.addEventListener("keydown", () => inputField.focus());
    typingText.addEventListener("click", () => inputField.focus());
}
randomParagraph();

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inputField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        // if user hasn't entered any character or pressed backspace
        if (typedChar == null) {
            charIndex--;
            if (characters[charIndex].classList.contains("incorrect")) {
                mistakes--;
            }
            characters[charIndex].classList.remove("correct", "incorrect");
        } else {
            if (characters[charIndex].innerHTML === typedChar) {
                // if user typed character matches shown character then,
                // add the correct class, else increment the mistake value and add the incorrect class 
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++; // increment charIndex whether user typed correctly or incorrectly
        }
        mistakeTag.innerHTML = mistakes;
        cpmTag.innerHTML = charIndex - mistakes;
        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        wpmTag.innerHTML = wpm;

        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
    } else {
        clearInterval(timer);
        inputField.value = "";
    }

}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerHTML = timeLeft;
    } else {
        clearInterval(timer);
    }
}

inputField.addEventListener("input", initTyping);

startBtn.onclick = () => {
    wrapper.classList.add("game-on");
    welcome.style.display = "none";
}

tryAgain.onclick = () => {
    randomParagraph();
    clearInterval(timer);
    inputField.value = "";
    timeLeft = maxTime,
        charIndex = mistakes = isTyping = 0;
    timeTag.innerHTML = timeLeft;
    mistakeTag.innerHTML = mistakes;
    cpmTag.innerHTML = 0;
    wpmTag.innerHTML = 0;
    console.log("you clicked me");
}