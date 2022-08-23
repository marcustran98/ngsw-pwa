import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { map, Observable } from "rxjs";
import { ICity } from "src/app/classess/interfaces/city.interface";

@Injectable({
    providedIn: "root"
})

export class CityService {
    constructor(private http: HttpClient) { }

    getCities(): Observable<ICity[] | null> {
        return this.http.get("http://localhost:3000/api/cities").pipe(
            map(data => {
                return Array.isArray(data) ? data as ICity[] : null
            })
        );
    }
}