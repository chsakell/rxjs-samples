import { Observable } from 'rxjs/Rx';
import { Component, OnInit, ViewChild } from '@angular/core';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'rxjs',
    templateUrl: 'rxjs-test.component.html'
})
export class RxJSComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
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
    }

    // Observable from promise
    promise() {
        let myPromise = new Promise((resolve, reject) => {
            console.log('Creating promise..');
            setTimeout(function () {
                resolve('Hello From promise!');
            }, 2000);
        });

        Observable.fromPromise(myPromise)
            .subscribe(this.getSubscriber('promise'));
        
        /*
        myPromise.then(x => {
            console.log(x);
        });
        */
    }

    // wait till observer subsribes and generate an observable with a factory function
    // each subscriber get its own sequence
    defer() {
        let i = 0;
        let source$ = Observable.defer(function () {
            i++;
            return Observable.of(i);
        });

        source$.subscribe(this.getSubscriber('defer: one'));
        source$.subscribe(this.getSubscriber('defer: two'));
        source$.subscribe(this.getSubscriber('defer: three'));
    }

    // Observable from of
    of() {
        let source$ = Observable.of<any>(45, 'Hello', [2, 3, 4, 5]).subscribe(this.getSubscriber('of'));
    }

    // Observable from range
    range() {
        let source$ = Observable.range(0, 10)
            .subscribe(this.getSubscriber('range'));
    }

    // Observable from timer
    // delaty 3 secs and emit every 1 sec from then
    // basically an interval with a delay
    timer() {
        let source$ = Observable.timer(3000, 1000)
            .take(5) // emit only the first 5
            .subscribe(this.getSubscriber('timer'));
    }

    // Observable from interval
    interval() {
        let source$ = Observable.interval(1000)
            .take(5) // emit only the first 5
            .subscribe(this.getSubscriber('interval'));
    }

    // Hot Observable
    // hot one starts from 2..
    // hot two starts from 6..
    // if not published both start from 0..
    hot() {
        var self = this;
        let source$ = Observable.interval(1000).publish();
        // if we write .publish.refCount()
        // the observable is activated on the first subscription (0..1...) and we don't have to connect

        source$.connect();

        setTimeout(() => {
            source$.subscribe(self.getSubscriber('hot one'));

            setTimeout(() => {
                source$.subscribe(self.getSubscriber('hot two'))
            }, 4000);

        }, 2000);
    }

    // Hot & cold observables
    hotAndCold() {
        let source$ = Observable.create(observer => {
            observer.next(Date.now());
        }).publish();

        // publish converts a cold obs to a hot

        source$.subscribe(this.getSubscriber('one'));
        source$.subscribe(this.getSubscriber('two'));

        // nothing happens till we connect
        source$.connect();
    }

    // Observable from scratch
    fromScratch() {
        let source$ = new Observable(observer => {
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
    }

    // Observable from string
    fromString() {
        let str = 'Hello world';

        Observable.from(str).subscribe(this.getSubscriber('string'));
    }

    // Observable from map
    fromMap() {
        let m: any = new Map([[1, 2], [3, 4], [5, 6]]);

        Observable.from(m).subscribe(this.getSubscriber('map'))
    }

    // Observable from Set
    fromSet() {
        let s: any = new Set(['Foo', 44, { name: 'Chris' }]);

        let s$ = Observable.from(s);

        s$.subscribe(this.getSubscriber('set'));
    }

    // Observable from Array of Objects
    fromArrayObjects() {
        let users = [
            { name: 'john', email: 'john@example.com' },
            { name: 'chris', email: 'chris@example.com' },
            { name: 'kostas', email: 'kostas@example.com' }
        ];

        let users$ = Observable.from(users);

        users$.subscribe(this.getSubscriber('users'));
    }

    // Observable from Array
    fromArray() {
        let nums = [33, 45, 23, 4, 5];
        let nums$ = Observable.from(nums);

        nums$.subscribe(this.getSubscriber('nums'));
    }

    getSubscriber(id) {
        return {
            next(x) {
                console.log(`${id}: ${x}`);
            },
            error(err) {
                console.log(`${id}: ${err.stack}`);
            },
            complete() {
                console.log(`${id}: Completed`);
            }
        }
    }
}