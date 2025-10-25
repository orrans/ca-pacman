'use strict'

const GHOST = '&#9781;'
const WEAK_GHOST = '👾'
var gGhosts
var gDeadGhosts = []
var gIntervalGhosts

function createGhost(board) {
    var ghost = {
        location: {
            // i: getRandomNumInclusive(1, gBoard.length - 1),
            // j: getRandomNumInclusive(1, gBoard[0].length - 1),
            i: 3,
            j: 3,
        },
        currCellContent: FOOD,
        color: getRandomColor(),
    }

    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    // empty the gGhosts array, create 3 ghosts
    gGhosts = []

    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    console.log('gGhosts:', gGhosts)
    // run the interval to move them
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        // console.log('ghost:', ghost)
        moveGhost(ghost) // {location , currCellContent}
    }
}

function moveGhost(ghost) {
    // console.log('ghost:', ghost)
    // figure out moveDiff, nextLocation, nextCell

    var moveDiff = getMoveDiff()

    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    // console.log('nextLocation:', nextLocation) // {i,j}

    var nextCell = gBoard[nextLocation.i][nextLocation.j] // '.'
    // console.log('nextCell:', nextCell)

    // return if cannot move
    if (nextCell === WALL || nextCell === GHOST) return

    // hitting a pacman? call gameOver
    if (nextCell === PACMAN) {
        if (gPacman.isSuper === false) gameOver()
        if (gPacman.isSuper) return
    }

    // moving from current location (restore prev cell contents):
    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // Move the ghost to new location (save cell contents):
    // update the model
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    ghost.location = nextLocation
    ghost.currCellContent = nextCell

    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function deleteGhost(ghostToDelete) {
    var ghostIdx = -1

    for (var i = 0; i < gGhosts.length; i++) {
        if (
            gGhosts[i].location.i === ghostToDelete.location.i &&
            gGhosts[i].location.j === ghostToDelete.location.j
        ) {
            ghostIdx = i
            break
        }
    }

    if (ghostIdx === -1) return

    var eatenGhost = gGhosts.splice(ghostIdx, 1)[0]
    gDeadGhosts.push(eatenGhost)

    setTimeout(function () {
        var revivedGhost = gDeadGhosts.pop()
        gGhosts.push(revivedGhost)
        gBoard[revivedGhost.location.i][revivedGhost.location.j] = GHOST
        renderCell(revivedGhost.location, getGhostHTML(revivedGhost))
    }, 3000)
}

function getMoveDiff() {
    const randNum = getRandomNumInclusive(1, 4)

    switch (randNum) {
        case 1:
            return { i: 0, j: 1 }
        case 2:
            return { i: 1, j: 0 }
        case 3:
            return { i: 0, j: -1 }
        case 4:
            return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    if (gPacman.isSuper === true) {
        return '<span style="outline: solid #32a1ce;">' + GHOST + '</span>'
    }
    return `<span style="color:${ghost.color};">${GHOST}</span>`
}
