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
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}