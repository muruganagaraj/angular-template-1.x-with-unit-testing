/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace demo.forms.services {

    export class FormsServices {

        public addNumbers(x: number, y: number): number {
            return x + y;
        }
        
        public subNumbers(x: number, y: number): number {
            return x - y;
        }
    }

    demoModule.service('formsServices', FormsServices);
}
