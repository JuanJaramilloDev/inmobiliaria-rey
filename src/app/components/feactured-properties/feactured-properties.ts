import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Propiedad as PropiedadModel } from '../../models/propiedad.model';
import { Propiedad as PropiedadService } from '../../services/propiedad';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-feactured-properties',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './feactured-properties.html',
  styleUrl: './feactured-properties.css'
})
export class FeacturedProperties implements OnInit {

  propiedades: PropiedadModel[] = [];

  constructor(
    private propiedadService: PropiedadService,
    private changeDetector: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    this.propiedades = await this.propiedadService.getPropiedadesDestacadas();
    this.changeDetector.detectChanges();
  }

}
