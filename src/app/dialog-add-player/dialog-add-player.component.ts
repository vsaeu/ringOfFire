import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent implements OnInit {
  game: Game;
name: string='';

  constructor() { }

  ngOnInit(): void {
  }

  onNoClick(){
    console.log();
  }


  playerCounter(){
    this.game.amountOfPlayers++;
      }

}
