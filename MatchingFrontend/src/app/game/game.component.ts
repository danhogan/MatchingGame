import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TileComponent } from '../tile/tile.component';
import { TilesService } from '../tiles.service';
import { Tile } from '../tile';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    TileComponent
  ],
  template: `
    <section class="content">
      <app-tile
        *ngFor="let tile of tileList;" [fileName]="'assets/images/' + tile.fileName">
      </app-tile>
    </section>
  `,
  styleUrl: './game.component.scss'
})
export class GameComponent {
  tileList: Tile[] = [];
  tileService: TilesService = inject(TilesService);

  constructor() {
    this.tileService.getAllTiles().then(tiles => {
      this.tileList = [...tiles, ...tiles].sort(() => Math.random() - 0.5); //duplicate and randomize
    })
  }
}
