import { Injectable } from '@angular/core';
import { Tile } from './tile';

@Injectable({
  providedIn: 'root'
})
export class TilesService {
  constructor() {
    this.getAllTiles().then(tiles => {
      console.log(tiles)
      this.tileList = tiles;
    })
  }

  imagesUrl: string = "http://localhost:5245/api/ImageItems";

  protected tileList: Tile[] = []

  async getAllTiles(): Promise<Tile[]> {
    const data = await fetch(this.imagesUrl);
    console.log("hey!")
    console.log(data)
    return await data.json() ?? [];
  }
  
  getTileById(id: number): Tile | undefined {
    return this.tileList.find(tile => tile.id === id);
  }
}