/// <reference path="../../../../typings/tsd.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace sierra.service {
    export interface ISampleService {
        Sample_Get(): ng.IPromise<sierra.model.Loan[]>;
    }
}
namespace sierra.service {
    export class SampleService implements sierra.service.ISampleService {
        public static $inject: string[] = ['$http', '$q', 'config'];
        constructor (private $http: ng.IHttpService, private $q: ng.IQService, private config: common.config.IConfig) {
        }
        public Sample_Get(): ng.IPromise<sierra.model.Loan[]> {
            var resourceUrl: string = '/api/Sample';
            var queryParams: any = {
            };
            return new this.$q<sierra.model.Loan[]>(
                (resolve: ng.IQResolveReject<sierra.model.Loan[]>, reject: ng.IQResolveReject<any>) => {
                    this.$http<sierra.model.Loan[]>( {
                        method: 'GET',
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: sierra.model.Loan[], status: number, headers: ng.IHttpHeadersGetter, config: ng.IRequestConfig) => {
                        resolve(data);
                    }
                    ).error((data: any, status: number, headers: ng.IHttpHeadersGetter, config: ng.IRequestConfig) => {
                        reject(data);
                    }
                    );
                }
            );
        }
    }
    angular.module('app').service('sampleService', SampleService);
    function buildServiceUrl(baseUrl: string, resourceUrl: string, queryParams?: any): string {
        var url: string = baseUrl;
        var baseUrlSlash: boolean = url[url.length - 1] === '/';
        var resourceUrlSlash: boolean = resourceUrl[0] === '/';
        if (!baseUrlSlash && !resourceUrlSlash) {
            url += '/';
        }
        else if (baseUrlSlash && resourceUrlSlash) {
            url = url.substr(0, url.length - 1);
        }
        url += resourceUrl;

        if (queryParams) {
            var isFirst: boolean = true;
            for (var p in queryParams) {
                if (queryParams.hasOwnProperty(p) && queryParams[p]) {
                    var separator: string = isFirst ? '?' : '&';
                    url += `${separator}${p}=${encodeURI(queryParams[p])}`;
                    isFirst = false;
                }
            }
        }
        return url;
    }
}
namespace sierra.model {
    export interface Customer {
        id?: number;
        name?: string;
        loans?: Loan[];
    }
    export interface Loan {
        id?: number;
        descriptor?: string;
        customerId?: number;
        customer?: Customer;
    }
    export class ModelFactory {
        public static createEmptyLoan(initializer?: (model: Loan) => void): Loan {
            var model: Loan =  {
                id: 0,
                descriptor: '',
                customerId: 0,
                customer: ModelFactory.createEmptyCustomer()
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyCustomer(initializer?: (model: Customer) => void): Customer {
            var model: Customer =  {
                id: 0,
                name: '',
                loans: []
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
    }
}
