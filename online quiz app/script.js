// Define quiz questions for different categories
const quizzes = {
    general: [
        {
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            answer: "Paris"
        },
        {
            question: "Who wrote 'Romeo and Juliet'?",
            options: ["Shakespeare", "Dickens", "Hemingway", "Austen"],
            answer: "Shakespeare"
        },
        {
            question: "What is the largest mammal?",
            options: ["Elephant", "Blue Whale", "Giraffe", "Rhino"],
            answer: "Blue Whale"
        }
    ],
    science: [
        {
            question: "What is the chemical symbol for water?",
            options: ["H2O", "O2", "CO2", "H2"],
            answer: "H2O"
        },
        {
            question: "What planet is known as the Red Planet?",
            options: ["Mars", "Venus", "Earth", "Jupiter"],
            answer: "Mars"
        },
        {
            question: "Which element has the atomic number 1?",
            options: ["Hydrogen", "Oxygen", "Carbon", "Nitrogen"],
            answer: "Hydrogen"
        }
    ],
    math: [
        {
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            answer: "4"
        },
        {
            question: "What is the square root of 64?",
            options: ["6", "8", "10", "12"],
            answer: "8"
        },
        {
            question: "What is 10 x 10?",
            options: ["100", "50", "80", "150"],
            answer: "100"
        }
    ],
    history: [
        {
            question: "Who was the first president of the United States?",
            options: ["George Washington", "Abraham Lincoln", "Thomas Jefferson", "John Adams"],
            answer: "George Washington"
        },
        {
            question: "When did World War II end?",
            options: ["1945", "1939", "1950", "1940"],
            answer: "1945"
        },
        {
            question: "Who discovered America?",
            options: ["Christopher Columbus", "Marco Polo", "Vasco da Gama", "Ferdinand Magellan"],
            answer: "Christopher Columbus"
        }
    ],
    geography: [
        {
            question: "What is the largest continent by area?",
            options: ["Asia", "Africa", "North America", "Europe"],
            answer: "Asia"
        },
        {
            question: "Which ocean is the largest?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            answer: "Pacific Ocean"
        },
        {
            question: "What is the tallest mountain in the world?",
            options: ["Mount Everest", "K2", "Kangchenjunga", "Makalu"],
            answer: "Mount Everest"
        }
    ],
    sports: [
        {
            question: "Which country won the FIFA World Cup in 2018?",
            options: ["France", "Germany", "Brazil", "Argentina"],
            answer: "France"
        },
        {
            question: "How many players are there on a football team?",
            options: ["9", "11", "7", "12"],
            answer: "11"
        },
        {
            question: "Which sport is known as the 'king of sports'?",
            options: ["Football", "Basketball", "Tennis", "Cricket"],
            answer: "Football"
        }
    ],
    music: [
        {
            question: "Who is known as the 'King of Pop'?",
            options: ["Michael Jackson", "Elvis Presley", "Prince", "Freddie Mercury"],
            answer: "Michael Jackson"
        },
        {
            question: "Which band is known for the hit song 'Hey Jude'?",
            options: ["The Beatles", "The Rolling Stones", "Queen", "Led Zeppelin"],
            answer: "The Beatles"
        },
        {
            question: "Who composed 'Fur Elise'?",
            options: ["Ludwig van Beethoven", "Wolfgang Amadeus Mozart", "Johann Sebastian Bach", "Claude Debussy"],
            answer: "Ludwig van Beethoven"
        }
    ],
    literature: [
        {
            question: "Who wrote '1984'?",
            options: ["George Orwell", "Aldous Huxley", "Mark Twain", "Jane Austen"],
            answer: "George Orwell"
        },
        {
            question: "What is the name of Sherlock Holmes' friend?",
            options: ["Dr. Watson", "Professor Moriarty", "Sam Spade", "Hercule Poirot"],
            answer: "Dr. Watson"
        },
        {
            question: "Who wrote 'The Great Gatsby'?",
            options: ["F. Scott Fitzgerald", "Ernest Hemingway", "Charles Dickens", "J.K. Rowling"],
            answer: "F. Scott Fitzgerald"
        }
    ]
};

// Variables to store quiz state
let selectedCategory = '';
let currentQuestionIndex = 0;
let userAnswers = [];

document.getElementById('startQuizBtn').addEventListener('click', function() {
    selectedCategory = document.getElementById('category').value;
    startQuiz(selectedCategory);
});

function startQuiz(category) {
    // Hide category selection and show quiz section
    document.getElementById('categorySelection').style.display = 'none';
    document.getElementById('quizSection').style.display = 'block';
    document.getElementById('quizCategory').textContent = category.charAt(0).toUpperCase() + category.slice(1);

    // Display the first question
    displayQuestion(category, currentQuestionIndex);
}

function displayQuestion(category, index) {
    const questionData = quizzes[category][index];

    // Display the question and options
    const questionContainer = document.getElementById('questionContainer');
    questionContainer.innerHTML = `
        <h3>${questionData.question}</h3>
        <div>
            ${questionData.options.map((option, i) => `
                <div class="quiz-option" onclick="selectAnswer('${option}')">
                    ${option}
                </div>
            `).join('')}
        </div>
    `;
}

function selectAnswer(answer) {
    // Save the user's answer
    userAnswers[currentQuestionIndex] = answer;

    // Move to the next question
    if (currentQuestionIndex < quizzes[selectedCategory].length - 1) {
        currentQuestionIndex++;
        displayQuestion(selectedCategory, currentQuestionIndex);
    } else {
        // If no more questions, show submit button
        document.getElementById('submitQuizBtn').style.display = 'block';
    }
}

document.getElementById('submitQuizBtn').addEventListener('click', function() {
    showResults();
});

function showResults() {
    // Calculate the score
    let score = 0;
    quizzes[selectedCategory].forEach((question, index) => {
        if (userAnswers[index] === question.answer) {
            score++;
        }
    });

    // Show the result
    const resultMessage = `You scored ${score} out of ${quizzes[selectedCategory].length}!`;
    const resultContainer = document.getElementById('quizResult');
    resultContainer.textContent = resultMessage;
    resultContainer.style.display = 'block';

    // Change result color based on performance
    if (score === quizzes[selectedCategory].length) {
        resultContainer.classList.add('passed');
    } else {
        resultContainer.classList.add('failed');
    }

    document.getElementById('submitQuizBtn').style.display = 'none';
}
