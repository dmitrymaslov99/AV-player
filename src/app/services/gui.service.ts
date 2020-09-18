import { Injectable } from '@angular/core';
import { VideoLibrary } from '../models/VideoLibrary'
import { AudioLibrary } from '../models/AudioLibrary'

@Injectable({
  providedIn: 'root'
})
export class GuiService {

  public name: string = 'Яндекс.Диск'
  public videoLibrary: VideoLibrary[] = [];
  public audioLibrary: AudioLibrary[] = [];

  constructor() { }
}
