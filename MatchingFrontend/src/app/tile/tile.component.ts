import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [],
  template: `
    <div>
      <img [src]="fileName">
    </div>
  `,
  styleUrl: './tile.component.scss'
})
export class TileComponent {
  @Input() fileName = '';
}
