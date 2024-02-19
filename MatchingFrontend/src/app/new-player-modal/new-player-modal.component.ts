import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Player } from '../player';
import { PlayersService } from '../players.service';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-new-player-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  template: `
  <article>
    <button [routerLink]="['/game']">Start the Game</button>
    <section>
      <h2 class="section-heading">Enter player name</h2>
      <form [formGroup]="applyForm" (submit)="submitApplication()">
        <label for="name">Name: </label>
        <input id="name" type="text" formControlName="name">
        <button type="submit">Submit</button>
      </form>
    </section>
    <ul>
      <li *ngFor="let player of playerList">{{player.name}}</li>
    </ul>
  </article>
`,
  styleUrl: './new-player-modal.component.scss'
})

export class NewPlayerModalComponent {
  playersService: PlayersService = inject(PlayersService);
  player: Player | undefined;
  playerList: Player[] = [];

  applyForm = new FormGroup({
    name: new FormControl('')
  });

  constructor() {
    this.playerList = this.playersService.playerList;
  }

  ngOnInit() {
    this.playersService.getAllPlayers().then(players => {
      this.playerList = players;
    });
  }

  submitApplication() {
    const playerName = this.applyForm.value.name;
    if (playerName) {
      this.playersService.addPlayer({ id: 0, name: playerName }).subscribe(newPlayer => {
        this.playerList.push(newPlayer);
        this.applyForm.reset();
      });
    }
  }
}
