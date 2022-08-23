import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CityService } from './city.service';


describe('CityService', () => {
    let service: CityService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(CityService)
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('getCities() should be return data when request successful', () => {
        service.getCities().subscribe(res => {
            expect(Array.isArray(res)).toBeTrue();
        })

        const req = httpTestingController.expectOne('http://localhost:3000/api/cities');
        expect(req.request.method).toEqual('GET');
        req.flush([]);
    });

    it('getCities() should be return error when request failed', () => {
        service.getCities().subscribe({
            next: () => fail('Error response should not be handled here'),
            error: (res: HttpErrorResponse) => {
                expect(res.status).toBe(403);
                expect(res instanceof HttpErrorResponse).toBeTrue();
                expect(res.statusText).toEqual('403 Forbidden');
            }
        });

        const req = httpTestingController.expectOne('http://localhost:3000/api/cities');
        expect(req.request.method).toEqual('GET');
        req.flush(null, { status: 403, statusText: '403 Forbidden' });
    });
});
