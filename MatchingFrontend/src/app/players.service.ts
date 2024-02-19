import { Injectable } from '@angular/core';
import { Player } from './player';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  playerUrl: string = "http://localhost:5245/api/Player";
  playerList: Player[] = []
  
  constructor(private http: HttpClient) {
      this.getAllPlayers().then(players => {
        this.playerList = players;
      })
   }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  submitApplication(name: string) {
    this.addPlayer({
      name: name,
      id: 0
    });
  }

  async getAllPlayers(): Promise<Player[]> {
    const data = await fetch(this.playerUrl);
    return await data.json() ?? [];
  }

  getPlayerById(id: number): Player | undefined {
    return this.playerList.find(player => player.id === id);
  }

  addPlayer(player: Player): Observable<Player>{
    this.playerList.push(player);
    return this.http.post<Player>(this.playerUrl, player, this.httpOptions)
      .pipe(
        catchError(this.handleError('addPlayer', player)),
        tap(newPlayer => {
          this.playerList.push(newPlayer);
        })
      )
  }

  private handleError(operation = 'operation', data?: any) {
    return (error: any): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(error);
    };
  }
}
