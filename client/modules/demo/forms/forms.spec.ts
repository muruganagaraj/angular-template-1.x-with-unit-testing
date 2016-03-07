/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

describe('Test', () => {
    var service: demo.forms.services.FormsServices;
    beforeEach(() => {
        service = new demo.forms.services.FormsServices();
    });
    
    it('add numbers', () => {
        expect(service.addNumbers(1, 2)).toEqual(3);
    });
    
    it('sub numbers', () => {
        expect(service.subNumbers(2, 2)).toEqual(0);
    });
});
