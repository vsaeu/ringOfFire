import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { PleaseAddPlayerDialogComponent } from '../please-add-player-dialog/please-add-player-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  needAddPlayer = true;
  pickCardAnimation = false;
  currentCard: string = '';
  gameOver = false;
  // Klassenzuordnung - zu welcher Klasse gehört es
  game: Game;
  gameID: string;

  // hitStackAudio = new Audio('src/assets/audio/card.mp3');

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.newGame();

    //Erst ID ziehe, dann
    this.route.params.subscribe((params) => {
      this.gameID = params['id'];
      // Im firestore abrufen
      this
        .firestore
        .collection('games') //zugriff auf Database Sammlung
        .doc(this.gameID) // hier ziehen wir die ID aus der Samlung, 
        .valueChanges()
        .subscribe((game: any) => { //Hier wird alles Upgedated sobald es auf dem Server eine Änderung gibt
          // console.log('Game update', game);
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.players = game.players;
          this.game.player_images = game.player_images;
          this.game.stack = game.stack;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.currentCard = game.currentCard;
          this.game.shuffleX = game.shuffleX;
          this.game.shuffleY = game.shuffleY;
          this.game.shuffleDeg = game.shuffleDeg;
          this.game.shuffleXMobile = game.shuffleXMobile;
          this.game.shuffleYMobile = game.shuffleYMobile;
          this.game.shuffleDegMobile = game.shuffleDegMobile;
          this.game.exStack = game.exStack;
          this.game.maxCards = game.maxCards;

        }); //Änderungen abonnieren
    });
    this
      .firestore
      .collection('games') //zugriff auf Database Sammlung
      .valueChanges() // Sobald es eine Änderung gibt
      .subscribe((game) => {  //subscribe wird mehrmals ausgeführt
        console.log('Game update', game);
      }); //Änderungen abonnieren
    // this.safeGame();
  }

  newGame() {
    this.game = new Game();
    this.firestore.collection('games').add(this.game.toJson());

  }

  //Die Karten werden ins Game Objekt geschoben und anschließend muss man diese wieder raus holen

  takeCard(i) {

     if (!this.game.pickCardAnimation && this.game.players.length > 1) {
      document.getElementById(`${i}`).classList.add('dNone');
      this.game.currentCard = this.game.exStack[`${i}`]['id'];
      // console.log(this.game.exStack[`${i}`]['dNone']);
      this.game.exStack[`${i}`]['dNone'] = true;
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.safeGame();  //Hier speichern wir unser Spiel, dieser schickt Änderungen in der Subscribe Funktion zurück

      setTimeout(() => {
        this.game.pickCardAnimation = false;
        this.shuffleX();
        this.game.playedCards.push(this.game.currentCard);
        this.safeGame();
      }, 2000);
    }
    else if (this.game.players.length < 2) {
      this.openPleaseAddDialog();

    }
    if (this.game.playedCards.length == this.game.maxCards -1) {
      setTimeout(() => {
        this.gameOver = true;
        console.log(this.gameOver); 
      }, 3500);

    }
  }

  editPlayer(playerID: number) {
    console.log('Edit player', playerID);
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      console.log(change);

      if (change) {
        if (change == 'DELETE') {
          this.game.player_images.splice(playerID, 1);
          this.game.players.splice(playerID, 1);
        }
        else {
          this.game.player_images[playerID] = change;
        }
        console.log('this.editPlayer change :', change);

        this.safeGame();
      }
    });


  }

  shuffleX() {
    let x = 0;
    x = Math.random() * 20 + 140;
    return x;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent)

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.player_images.push('1.png');
        console.log('open Dialog after close', this.game.player_images);


        this.safeGame();
      }
    });
    // this.game.amountOfPlayers++;
  }

  openPleaseAddDialog() {
    this.dialog.open(PleaseAddPlayerDialogComponent);
  }

  safeGame() {
    this
      .firestore
      .collection('games') //zugriff auf Database Sammlung
      .doc(this.gameID) // hier ziehen wir die ID aus der Samlung, 
      .update(this.game.toJson()) // Spiel wird gespeichert
  }
}
