import { Routes } from '@angular/router';
import { NewPlayerModalComponent } from './new-player-modal/new-player-modal.component';
import { GameComponent } from './game/game.component';

const routeConfig: Routes = [
    {
      path: '',
      component: NewPlayerModalComponent,
      title: 'Select Players'
    },
    {
      path: 'game',
      component: GameComponent,
      title: 'Matching Game'
    }
  ];
  
  export default routeConfig;