import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss']
})
export class StartscreenComponent implements OnInit {

  // Wir wollen unsere Seite weiter leiten
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  newGame(){
    this.router.navigateByUrl('/game');
  }

}
