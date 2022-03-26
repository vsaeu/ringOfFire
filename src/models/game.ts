export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public shuffleX: number[] = [];
    public shuffleY: number[] = [];
    public shuffleDeg: number[] = [];
    public shuffleXMobile: number[] = [];
    public shuffleYMobile: number[] = [];
    public shuffleDegMobile: number[] = [];
    // public amountOfPlayers: number = 0;
    public highlightInstruction:boolean = false;
    public pickCardAnimation = false;
    public currentCard: string = '';
    public amountOfPlayers: number= 0;

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('ace_' + i)
            this.stack.push('hearts_' + i)
            this.stack.push('diamonds_' + i)
            this.stack.push('clubs_' + i)
        }
        shuffle(this.stack);

        for (let i = 0; i < 52; i++) {
            this.shuffleX.push(shuffleXfct())
            this.shuffleY.push(shuffleYfct())
            this.shuffleDeg.push(shuffleDegfct())

            this.shuffleXMobile.push(shuffleXfctMob())
            this.shuffleYMobile.push(shuffleYfctMob())
            this.shuffleDegMobile.push(shuffleDegfctMob())
        }
    }

//Umwandlung des Spiels in ein Json, hier kommen alle Variablen rein
    public toJson(){
        return {
            players: this.players,
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            pickCardAnimation: this.pickCardAnimation,
            currentCard: this.currentCard,
            shuffleX: this.shuffleX,
            shuffleY: this.shuffleY,
            shuffleDeg: this.shuffleDeg,
            shuffleXMobile: this.shuffleXMobile,
            shuffleYMobile: this.shuffleYMobile,
            shuffleDegMobile: this.shuffleDegMobile
        }
    }

}

function shuffleXfct() {
    let x = Math.random() * 1.3 + 13;
    return x;
}

function shuffleYfct() {
    let y = Math.random() * 1.3 + -5;
    return y;
}

function shuffleDegfct() {
    let rot = (Math.random() * 7 + 10) - 10;
    return rot;
}

function shuffleXfctMob() {
    let x = Math.random() * 1.5 + 4;
    return x;
}

function shuffleYfctMob() {
    let y = Math.random() * 1.5 - 15;
    return y;
}

function shuffleDegfctMob() {
    let rot = (Math.random() * 10 + 10) - 10;
    return rot;
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

// Used like so
var arr = [2, 11, 37, 42];
shuffle(arr);
