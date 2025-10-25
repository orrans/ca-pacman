'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPER_FOOD = '🟡'
const CHERRY = '🍒'

const gGame = {
    score: 0,
    isOn: false,
}
var gBoard

function onInit() {
    gBoard = buildBoard()

    createPacman(gBoard)
    createGhosts(gBoard)

    console.table(gBoard)

    renderBoard(gBoard)

    gGame.isOn = true
    document.querySelector('.score').innerText = 0
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD

            if (
                i === 0 ||
                i === size - 1 ||
                j === 0 ||
                j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)
            ) {
                board[i][j] = WALL
            }

            if (
                (i === 1 && j === 1) ||
                (i === 1 && j === size - 2) ||
                (i === size - 2 && j === 1) ||
                (i === size - 2 && j === size - 2)
            ) {
                board[i][j] = SUPER_FOOD
            }
        }
    }

    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">
                            ${cell}
                        </td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function updateScore(diff) {
    // update both the model and the dom for the score
    gGame.score += diff
    document.querySelector('.score').innerText = gGame.score
}

function gameOver() {
    // todo
    console.log('Game Over')
    clearInterval(gIntervalGhosts)
    gGame.isOn = false
    renderCell(gPacman.location, EMPTY)
}

function showModal() {}
