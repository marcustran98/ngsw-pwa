import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { MockCities } from 'src/app/classess/mocks/mock-citites';
import { CityService } from 'src/app/services/pictures/city.service';

import { PicturesComponent } from './pictures.component';

class CityServiceMock {
  getCities() {
    return of([
      {
        name: 'trulli',
        image: 'pic_trulli.jpg',
        alt: 'Italian Trulli',
      },
      {
        name: 'chania',
        image: 'img_chania.jpg',
        alt: 'Chania',
      },
    ])
  }
}

describe('PicturesComponent', () => {
  let component: PicturesComponent;
  let fixture: ComponentFixture<PicturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PicturesComponent],
      providers: [
        {
          provide: CityService,
          useClass: CityServiceMock
        },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('is created and data received', waitForAsync(() => {
    fixture.whenStable().then(() => {
      const mock = new MockCities()
      expect(component).toBeDefined();
      expect(component.cities).toEqual(mock.cities);
    });
  })
  );
});
