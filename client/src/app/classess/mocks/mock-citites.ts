import { ICity } from "../interfaces/city.interface";

export class MockCities {
    get cities(): ICity[] {
        return [
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
        ];
    }
}