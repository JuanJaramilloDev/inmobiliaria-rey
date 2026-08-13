import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { PropertySearch } from '../../components/property-search/property-search';
import { ServicesSection } from '../../components/services-section/services-section';
import { FeacturedProperties } from '../../components/feactured-properties/feactured-properties';
import { Footer } from '../../components/footer/footer';
import { WhatsappButton } from '../../components/whatsapp-button/whatsapp-button';
// FeaturedProperties component not found at the original path; removed to fix import error

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, PropertySearch, ServicesSection, FeacturedProperties, Footer, WhatsappButton],
  // Se deja el template en línea para que el arranque SSR y el dev-server
  // carguen Home sin requerir un resolvedor externo de recursos.
  template: `
    <app-hero></app-hero>
    <app-property-search></app-property-search>
    <app-services-section></app-services-section>
    <app-feactured-properties></app-feactured-properties>
    <app-footer></app-footer>
    <app-whatsapp-button></app-whatsapp-button>
  `
})
export class Home {

}
