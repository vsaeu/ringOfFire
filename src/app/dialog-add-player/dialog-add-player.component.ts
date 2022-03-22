import { Component, OnInit } from '@angular/core';
import {  MatDialogRef } from '@angular/material/dialog';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent implements OnInit {
  game: Game;
  amountOfPlayers: number = 0;
  name: string = '';


  constructor( public dialogRef: MatDialogRef<DialogAddPlayerComponent> ) { }


  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


  playerCounter() {
    console.log('triggered');
    
    console.log('Player Added: ', this.amountOfPlayers );
    this.amountOfPlayers++;
    console.log('Player Added: ', this.amountOfPlayers );
    
  }

}
