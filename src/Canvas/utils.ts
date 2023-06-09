import {ColorPiece, Positions, AlivePiece, PieceType} from "../types";
import {Pawn} from "../Pieces/Pawn";
import {canvasWidth, imageSize, shiftImage, squareSize} from "../exports";

export function getCurrPos(draggingIndex: number, positions: Positions[]) {
    let currX = 0
    let currY = 0
    if (draggingIndex !== -1) {
        currX = positions[draggingIndex].x;
        currY = positions[draggingIndex].y;
        return {currX, currY}
    }
    return {currX, currY}
}

export function adjustPiecePositions(mousePosition: Positions) {
    let {x, y} = mousePosition
    let nextSquare = squareSize;
    for (let square = 0; square !== canvasWidth-squareSize; square += squareSize) {
        if (x >= square && x <= nextSquare) x = square + shiftImage;
        if (y < nextSquare && y >= square) y = square + shiftImage;
        nextSquare += squareSize;
    }
    return {x, y}
}

export function getIndexAtPosition(x: number, y: number, board: Positions[]) {
    for (let i = 0; i < board.length; i++) {
        const { x: imageX, y: imageY } = board[i];
        if (x >= imageX && x <= imageX + imageSize && y >= imageY && y <= imageY + imageSize) return i;
    }
    return -1;
}

export function isPieceOnSquare(x: number, y: number, board: Positions[]) {
    return board.some(pos => pos.x === x && pos.y === y);
}

export function includes(positionsArray: Positions[], allPositionsArray: Positions[]){
    for (let move of positionsArray){
        for (let posMoves of allPositionsArray){
            if (move.x === posMoves.x && move.y === posMoves.y) {return true}
        }
    }
    return false
}

export function areOnlyKingsAlive(positions: AlivePiece[], pieceColors: ColorPiece[]){
    for (let i = 0; i < pieceColors.length; i++){
        if (pieceColors[i].name !== "king" && positions[i].isAlive) return false
    }
    return true
}

export function promotePawnTo(src: string, name: string, pieces: PieceType[],
                              pieceColors: ColorPiece[], pieceImages: HTMLImageElement[]) {
    pieces[Pawn.promotedPawnIndex].src = src
    pieces[Pawn.promotedPawnIndex].name = name
    pieceImages[Pawn.promotedPawnIndex].src = src
    pieceColors[Pawn.promotedPawnIndex].name = name
    Pawn.promoteScreenOn = false
    Pawn.promotedPawnIndex = -1
}

export function addScore(killedPieceIndex: number, pieceColors: ColorPiece[]){
    let playerScore = 0
    switch (pieceColors[killedPieceIndex].name){
        case "pawn":
            playerScore += 1
            break
        case "knight":
            playerScore += 3
            break
        case "bishop":
            playerScore += 3
            break
        case "rook":
            playerScore += 5
            break
        case "queen":
            playerScore += 9
            break
    }
    return playerScore
}
