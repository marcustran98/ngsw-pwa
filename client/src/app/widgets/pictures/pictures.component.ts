import { Component, OnInit } from '@angular/core';
import { ICity } from 'src/app/classess/interfaces/city.interface';
import { CityService } from 'src/app/services/pictures/city.service';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss']
})
export class PicturesComponent implements OnInit {
  cities: ICity[] = [];

  constructor(private cityService: CityService) { }

  ngOnInit(): void {
    this.cityService.getCities().subscribe((res) => {
      this.cities = res || [];
    })
  }

  fetchCities(): void {
    this.cityService.getCities().subscribe();
  }

}
