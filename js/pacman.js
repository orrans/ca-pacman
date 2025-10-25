'use strict'

const PACMAN = '😀'
var gPacman

function createPacman(board) {
    // initialize gPacman...
    gPacman = {
        location: {
            i: 7,
            j: 7,
        },
        isSuper: false,
    }

    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {
    if (!gGame.isOn) return
    // use getNextLocation(), nextCell

    var nextLocation = getNextLocation(ev)
    console.log('nextLocation:', nextLocation)
    if (!nextLocation) return

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    console.log('nextCell:', nextCell)

    // return if cannot moveK
    if (nextCell === WALL) return

    // hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (!gPacman.isSuper) {
            gameOver()
            return
        }

        // find which ghost is in that cell
        var eatenGhost = null
        for (var i = 0; i < gGhosts.length; i++) {
            var ghost = gGhosts[i]
            if (ghost.location.i === nextLocation.i && ghost.location.j === nextLocation.j) {
                eatenGhost = ghost
                break
            }
        }

        if (eatenGhost) {
            deleteGhost(eatenGhost)
            updateScore(10)
            renderCell(nextLocation, EMPTY)
        }

        return
    }

    // hitting food? update score
    if (nextCell === FOOD) {
        updateScore(1)
    }

    if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return
        gPacman.isSuper = true

        for (var i = 0; i < gGhosts.length; i++) {
            var ghost = gGhosts[i]
            renderCell(ghost.location, `<span style="outline: solid #32a1ce;">${GHOST}</span>`)
        }

        setTimeout(function () {
            gPacman.isSuper = false
            for (var i = 0; i < gGhosts.length; i++) {
                var ghost = gGhosts[i]
                renderCell(ghost.location, getGhostHTML(ghost))
            }
        }, 5000)
    }

    // moving from current location:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // Move the pacman to new location:
    // update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation

    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
    // console.log('eventKeyboard:', eventKeyboard)

    // figure out nextLocation
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j,
    }

    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--
            break
        case 'ArrowDown':
            nextLocation.i++
            break
        case 'ArrowRight':
            nextLocation.j++
            break
        case 'ArrowLeft':
            nextLocation.j--
            break
        default:
            return null
    }

    return nextLocation
}
