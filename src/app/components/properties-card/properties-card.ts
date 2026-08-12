import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Propiedad } from '../../models/propiedad.model';

@Component({
  selector: 'app-properties-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './properties-card.html',
  styleUrl: './properties-card.css'
})
export class PropertiesCard {

  @Input() propiedad!: Propiedad;

}
