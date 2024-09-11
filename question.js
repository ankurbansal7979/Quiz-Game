let question = 0;
let correctAnswer = 0;

const statements = [
    {
        question: "1. Javascript is an _______ language?",
        options: ["Object-Oriented", "Object-based", "Procedural", "None of the Above"],
        answer: 0
    },
    {
        question: "2. Which of the following keywords is used to define a variable in Javascript?",
        options: ["var", "let", "both A and B", "None of the above"],
        answer: 2
    },
    {
        question: "3. Which of the following methods is used to access HTML elements using Javascript?",
        options: ["getelementbyID", "getelementby", "Both A and B", "None of the above"],
        answer: 2
    },
    {
        question: "4. Upon encountering empty statements, what does the Javascript Interpreter do?",
        options: ["Throws an error", "Ignores the statements", "Gives a warning", "None of the above"],
        answer: 1
    }
];


const box = document.querySelector('#question-box');

function display(index) {
    let options = '';
    statements[index].options.forEach((o, i) => {
        options += `<li id="op-${i}" style="background-color:${isSelected[index] != -1 && i == isSelected[index] ? isSelected[index] == statements[index].answer ? 'green' : 'red' : ''}">${o}</li>`
    })

    box.innerHTML = `
    <p>${statements[index].question}</p>
    <ul>${options}</ul>
    `
}

let isSelected = new Array(statements.length).fill(-1);
display(0);

box.addEventListener('click', (e) => {
    if (e.target.matches('li')) {
        const selected = e.target.id[3];

        if (isSelected[question] == -1) {

            if (selected == statements[question].answer) {
                // console.log(true);
                e.target.style.backgroundColor = 'green';
                correctAnswer++;
            }
            else {
                // console.log(false);
                e.target.style.backgroundColor = 'red';
            }
            isSelected[question] = selected;
        }
    }
})

const btn = document.querySelectorAll('button');

function backward() {
    btn[2].innerText = 'Next';
    btn[2].style.backgroundColor = 'rgb(235, 238, 212)'
    if (question > 0) {
        display(question - 1)
        question--;
    }
    else if (question == 0) {
        alert('No Previous Question Available');
    }
}

function forward() {
    if (question < statements.length - 1) {
        display(question + 1);
        question++
    }
    if (question == statements.length - 1) {
        btn[2].innerText = 'submit';
        btn[2].style.backgroundColor = 'orangered';
    }
}

btn[0].addEventListener('click', (e) => {
    backward();
})

btn[1].addEventListener('click', (e) => {
    forward();
})

btn[2].addEventListener('click', (e) => {
    if (e.target.innerText == 'Next') {
        if (isSelected[question] != -1) {
            console.log(isSelected);
            forward()
        }
        else {
            alert('Please select an option')
        }
    }
    else {
        alert(`You have scored ${correctAnswer} out of ${statements.length}.`);
    }
})