"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Rx_1 = require("rxjs/Rx");
var core_1 = require("@angular/core");
var RxJSComponent = (function () {
    function RxJSComponent() {
    }
    RxJSComponent.prototype.ngOnInit = function () {
        this.promise();
        // this.defer();
        // this.of();
        // this.range();
        // this.timer();
        // this.interval();
        // this.hot();
        // this.hotAndCold();
        // this.fromScratch();
        // this.fromString();
        // this.fromMap();
        // this.fromSet();
        // this.fromArrayObjects();
        // this.fromArray();
    };
    // Observable from promise
    RxJSComponent.prototype.promise = function () {
        var myPromise = new Promise(function (resolve, reject) {
            console.log('Creating promise..');
            setTimeout(function () {
                resolve('Hello From promise!');
            }, 2000);
        });
        Rx_1.Observable.fromPromise(myPromise)
            .subscribe(this.getSubscriber('promise'));
        /*
        myPromise.then(x => {
            console.log(x);
        });
        */
    };
    // wait till observer subsribes and generate an observable with a factory function
    // each subscriber get its own sequence
    RxJSComponent.prototype.defer = function () {
        var i = 0;
        var source$ = Rx_1.Observable.defer(function () {
            i++;
            return Rx_1.Observable.of(i);
        });
        source$.subscribe(this.getSubscriber('defer: one'));
        source$.subscribe(this.getSubscriber('defer: two'));
        source$.subscribe(this.getSubscriber('defer: three'));
    };
    // Observable from of
    RxJSComponent.prototype.of = function () {
        var source$ = Rx_1.Observable.of(45, 'Hello', [2, 3, 4, 5]).subscribe(this.getSubscriber('of'));
    };
    // Observable from range
    RxJSComponent.prototype.range = function () {
        var source$ = Rx_1.Observable.range(0, 10)
            .subscribe(this.getSubscriber('range'));
    };
    // Observable from timer
    // delaty 3 secs and emit every 1 sec from then
    // basically an interval with a delay
    RxJSComponent.prototype.timer = function () {
        var source$ = Rx_1.Observable.timer(3000, 1000)
            .take(5) // emit only the first 5
            .subscribe(this.getSubscriber('timer'));
    };
    // Observable from interval
    RxJSComponent.prototype.interval = function () {
        var source$ = Rx_1.Observable.interval(1000)
            .take(5) // emit only the first 5
            .subscribe(this.getSubscriber('interval'));
    };
    // Hot Observable
    // hot one starts from 2..
    // hot two starts from 6..
    // if not published both start from 0..
    RxJSComponent.prototype.hot = function () {
        var self = this;
        var source$ = Rx_1.Observable.interval(1000).publish();
        // if we write .publish.refCount()
        // the observable is activated on the first subscription (0..1...) and we don't have to connect
        source$.connect();
        setTimeout(function () {
            source$.subscribe(self.getSubscriber('hot one'));
            setTimeout(function () {
                source$.subscribe(self.getSubscriber('hot two'));
            }, 4000);
        }, 2000);
    };
    // Hot & cold observables
    RxJSComponent.prototype.hotAndCold = function () {
        var source$ = Rx_1.Observable.create(function (observer) {
            observer.next(Date.now());
        }).publish();
        // publish converts a cold obs to a hot
        source$.subscribe(this.getSubscriber('one'));
        source$.subscribe(this.getSubscriber('two'));
        // nothing happens till we connect
        source$.connect();
    };
    // Observable from scratch
    RxJSComponent.prototype.fromScratch = function () {
        var source$ = new Rx_1.Observable(function (observer) {
            console.log('Creating observable..');
            observer.next('A value');
            observer.next('Another value');
            observer.error(new Error('Error: Something is wrong'));
            setTimeout(function () {
                observer.next('Hello World');
                observer.complete();
            }, 2000);
            // observer.complete();
        });
        source$.subscribe(this.getSubscriber('myobs'));
    };
    // Observable from string
    RxJSComponent.prototype.fromString = function () {
        var str = 'Hello world';
        Rx_1.Observable.from(str).subscribe(this.getSubscriber('string'));
    };
    // Observable from map
    RxJSComponent.prototype.fromMap = function () {
        var m = new Map([[1, 2], [3, 4], [5, 6]]);
        Rx_1.Observable.from(m).subscribe(this.getSubscriber('map'));
    };
    // Observable from Set
    RxJSComponent.prototype.fromSet = function () {
        var s = new Set(['Foo', 44, { name: 'Chris' }]);
        var s$ = Rx_1.Observable.from(s);
        s$.subscribe(this.getSubscriber('set'));
    };
    // Observable from Array of Objects
    RxJSComponent.prototype.fromArrayObjects = function () {
        var users = [
            { name: 'john', email: 'john@example.com' },
            { name: 'chris', email: 'chris@example.com' },
            { name: 'kostas', email: 'kostas@example.com' }
        ];
        var users$ = Rx_1.Observable.from(users);
        users$.subscribe(this.getSubscriber('users'));
    };
    // Observable from Array
    RxJSComponent.prototype.fromArray = function () {
        var nums = [33, 45, 23, 4, 5];
        var nums$ = Rx_1.Observable.from(nums);
        nums$.subscribe(this.getSubscriber('nums'));
    };
    RxJSComponent.prototype.getSubscriber = function (id) {
        return {
            next: function (x) {
                console.log(id + ": " + x);
            },
            error: function (err) {
                console.log(id + ": " + err.stack);
            },
            complete: function () {
                console.log(id + ": Completed");
            }
        };
    };
    return RxJSComponent;
}());
RxJSComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'rxjs',
        templateUrl: 'rxjs-test.component.html'
    }),
    __metadata("design:paramtypes", [])
], RxJSComponent);
exports.RxJSComponent = RxJSComponent;
//# sourceMappingURL=rxjs-test.component.js.map