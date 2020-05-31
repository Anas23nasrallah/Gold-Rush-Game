/*
Author: Anas Nasrallah.
Peupose: Gold Rush Game.
Date: 30.05.20
*/

const EMPTY_CELL = '.';
const COIN_CELL = 'c';
const BLOCK_CELL = 'b'
const BOOST_CELL = 'boost'
const P1_CELL = 1;
const P2_CELL = 2;
const SCORE_PER_COIN = 10;
const ADDITION_BOOSTS = 3;
const RIGHT = 'right'
const LEFT = 'left'
const DOWN = 'down'
const UP = 'up'

class GoldRush extends Matrix {
    constructor(r, c) {
        super(r, c)
        this.p1 = { sign: 1, x: 0, y: 0, score: 0, boosted: 0 }
        this.p2 = { sign: 2, x: c - 1, y: r - 1, score: 0, boosted: 0 }
        this.matrix[this.p1.y][this.p1.x] = P1_CELL
        this.matrix[this.p2.y][this.p2.x] = P2_CELL
        this.totalCoins = Math.floor(Math.floor((c * r) / 3) / 2) * 2 + 1 // to make sure to get odd number of coins so that the players can't end in draw
        this.wonCoins = 0
        this.generateCoins(r, c)
        this.generateBlocks(r, c)
        this.generateBoosters(r, c)
    }

    generateCoins(r, c) {
        this.generateCells(r, c, COIN_CELL, this.totalCoins)
    }

    generateBlocks(r, c) {
        const numOfBlocks = Math.floor((r * c) / 6)
        this.generateCells(r, c, BLOCK_CELL, numOfBlocks)
    }

    generateBoosters(r, c){
        const numOfBoosts = Math.floor((r * c) / 50) + 1 
        this.generateCells(r, c, BOOST_CELL, numOfBoosts)
    }

    generateCells(r, c, cell, numOfCells){
        let cellsCount = 0
        while (cellsCount < numOfCells) {
            const randomCell = { x: Math.floor(Math.random() * c), y: Math.floor(Math.random() * r) }
            if (this.get(randomCell.y, randomCell.x) === EMPTY_CELL) {
                this.alter(randomCell.y, randomCell.x, cell)
                cellsCount++
            }
        }
    }

    getMatrix() {
        return this.matrix
    }

    getScores() {
        return {
            p1score: this.p1.score,
            p2score: this.p2.score
        }
    }

    updateScore(player) {
        player.score += SCORE_PER_COIN
        this.wonCoins++
    }

    canMoveTo(y, x) {
        if (this.matrix[y]) {
            const cell = this.get(y, x)
            return (cell === EMPTY_CELL || cell === COIN_CELL || cell === BOOST_CELL)
        }
        return false
    }

    moveRight(player) {
        if (this.canMoveTo(player.y, player.x + 1)) {
            this.alter(player.y, player.x, EMPTY_CELL)
            const cellToGoTo = this.get(player.y, player.x + 1)
            if (cellToGoTo === COIN_CELL) {
                this.updateScore(player)
            }
            if (cellToGoTo === BOOST_CELL) {
                player.boosted += ADDITION_BOOSTS
            }
            this.alter(player.y, player.x + 1, player.sign)
            player.x++
        }
    }

    moveLeft(player) {
        if (this.canMoveTo(player.y, player.x - 1)) {
            this.alter(player.y, player.x, EMPTY_CELL)
            const cellToGoTo = this.get(player.y, player.x - 1)
            if (cellToGoTo === COIN_CELL) {
                this.updateScore(player)
            }
            if (cellToGoTo === BOOST_CELL) {
                player.boosted += ADDITION_BOOSTS
            }
            this.alter(player.y, player.x - 1, player.sign)
            player.x--
        }
    }

    moveDown(player) {
        if (this.canMoveTo(player.y + 1, player.x)) {
            this.alter(player.y, player.x, EMPTY_CELL)
            const cellToGoTo = this.get(player.y + 1, player.x)
            if (cellToGoTo === COIN_CELL) {
                this.updateScore(player)
            }
            if (cellToGoTo === BOOST_CELL) {
                player.boosted += ADDITION_BOOSTS
            }
            this.alter(player.y + 1, player.x, player.sign)
            player.y++
        }
    }

    moveUp(player) {
        if (this.canMoveTo(player.y - 1, player.x)) {
            this.alter(player.y, player.x, EMPTY_CELL)
            const cellToGoTo = this.get(player.y - 1, player.x)
            if (cellToGoTo === COIN_CELL) {
                this.updateScore(player)
            }
            if (cellToGoTo === BOOST_CELL) {
                player.boosted += ADDITION_BOOSTS
            }
            this.alter(player.y - 1, player.x, player.sign)
            player.y--
        }
    }

    movePlayer(p, direction) {
        let player = p === 1 ? this.p1 : this.p2

        if (direction === RIGHT) {
            if(player.boosted){
                this.moveRight(player)
                player.boosted--
            }
            this.moveRight(player)
        } else if (direction === LEFT) {
            if(player.boosted){
                this.moveLeft(player)
                player.boosted--
            }
            this.moveLeft(player)
        } else if (direction === DOWN) {
            if(player.boosted){
                this.moveDown(player)
                player.boosted--
            }
            this.moveDown(player)
        } else if (direction === UP) {
            if(player.boosted){
                this.moveUp(player)
                player.boosted--
            }
            this.moveUp(player)
        }
    }

    isGameOver() {
        return this.wonCoins === this.totalCoins
    }

    getWinner() {
        return (this.p1.score > this.p2.score) ? this.p1 : this.p2
    }
}