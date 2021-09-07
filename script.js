'use strict';


const game = {
    elements: {
        min: document.getElementById('min'),
        max: document.getElementById('max'),
        guessForm: document.getElementById('guessForm'),
        input: document.getElementById('input'),
        guess: document.getElementById('guess'),
        hint: document.getElementById('hint'),
        attemptsLeft: document.getElementById('attempsLeft'),
        bestScore: document.getElementById('bestScore'),
        restart: document.getElementById('restart')
    },
    min: 1,
    max: 20,
    currentGuess: 0,
    inputValue: '',
    hint: '',
    attemptsLeft: 20,
    bestScore: null,
    randomNumber: 0,
    gameOver: false,
    generateRandomNumber() {
        this.randomNumber = Math.trunc(Math.random() * this.max + 1)
    },
    init() {
        document.body.classList.remove('win', 'lose');
        this.min = 1;
        this.max = 20;
        this.currentGuess = 0;
        this.inputValue = '';
        this.hint = '';
        this.attemptsLeft = 20;
        this.gameOver = false;
        this.generateRandomNumber();
        const { min, max, guessForm, input, guess, hint, attemptsLeft, bestScore, restart } = this.elements;
        min.innerHTML = this.min;
        max.innerHTML = this.max;
        input.value = '';
        input.max = this.max;
        input.min = this.min;
        input.disabled = false;
        hint.innerHTML = '';
        attemptsLeft.innerHTML = this.attemptsLeft;
        guessForm.addEventListener('submit', e => {
            e.preventDefault();
            this.gameStep();
        });
        restart.addEventListener('click', () => {
            this.init();
        })
    },
    printGameParameters() {
        const { input, hint, attemptsLeft, bestScore } = this.elements;
        attemptsLeft.innerHTML = this.attemptsLeft;
        bestScore.innerHTML = this.bestScore;
        if (this.bestScore === null) {
            this.elements.bestScore.innerHTML = 'Win at least 1 time, to see best score';
        }
        if (this.currentGuess > this.randomNumber && !this.gameOver) {
            this.hint = 'Your number is greater. Try Lower number';
        }
        if (this.currentGuess < this.randomNumber && !this.gameOver) {
            this.hint = 'Your number is lower. Try higher number';
        }
        if (this.currentGuess === this.randomNumber) {
            this.hint = 'Grats, you won!';
        }
        hint.innerHTML = this.hint;
        input.value = '';
        input.placeholder = this.hint;
    },
    gameStep() {
        this.currentGuess = +this.elements.input.value;
        if (!this.gameOver && this.attemptsLeft !== 0 && this.currentGuess !== this.randomNumber) {
            if (this.attemptsLeft === 1) {
                this.gameOverFunc();
            }
            this.attemptsLeft--;
            this.printGameParameters();
        } else {
            this.gameOverFunc();
        }
    },
    gameOverFunc() {
        this.elements.input.disabled = true;
        this.gameOver = true;
        if (this.currentGuess === this.randomNumber) {
            document.body.classList.add('win');
            if (this.bestScore === null) {
                this.bestScore = this.attemptsLeft;
            } else if (this.attemptsLeft > this.bestScore) {
                this.bestScore = this.attemptsLeft;
            }
        }
        if (this.attemptsLeft === 1) {
            document.body.classList.add('lose');
            this.hint = 'Game over :(';
        }
        this.printGameParameters();
    }
}

game.init();