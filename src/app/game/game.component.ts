import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  needAddPlayer = true;
  pickCardAnimation = false;
  currentCard: string = '';
  // Klassenzuordnung - zu welcher Klasse gehört es
  game: Game;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game)
  }

  takeCard(id) {
    if (!this.pickCardAnimation && this.game.amountOfPlayers > 1) {
      console.log("position: ", id)
      document.getElementById(`${id}`).classList.add('dNone');
      this.currentCard = this.game.stack[id];
      this.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.pickCardAnimation = false;
        this.shuffleX();
        this.game.playedCards.push(this.currentCard);
      }, 500);
    }

    else {
      this.game.highlightInstruction = true;
      setTimeout(() => {
        this.game.highlightInstruction = false;
      }, 1000);
    }
  }

  shuffleX() {
    let x = 0;
    x = Math.random() * 20 + 140;
    console.log('shuffleX conducted: ', x)
    return x;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent)

    dialogRef.afterClosed().subscribe(name => {
      this.game.players.push(name);
    });
    this.game.amountOfPlayers++;
    console.log('AmountofPlayer: ', this.game.amountOfPlayers)

  }
}
