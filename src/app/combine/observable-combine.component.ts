import { Observable } from 'rxjs/Rx';
import { Component, OnInit, ViewChild } from '@angular/core';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'observable-combine',
    templateUrl: 'observable-combine.component.html'
})
export class ObservableCombineComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        this.combineLatest();
        // this.withLatestFrom();
        // this.zipIntervals();
        // this.zip();
        // this.concatAll();
        // this.mergeMapPromise();
        // this.mergeMap();
        // this.concatAll();
        // this.concat();
        // this.mergeAll();
        // this.merge2();
        // this.merge1();
    }

    combineLatest() {
        let timer1$ = Observable.timer(1000, 4000);
        let timer2$ = Observable.timer(2000, 4000);
        let timer3$ = Observable.timer(3000, 4000);

        let source$ = Observable
            .combineLatest(
            timer1$,
            timer2$,
            timer3$
            );

        source$.subscribe(latestValues => {
            const [timerValOne, timerValTwo, timerValThree] = latestValues;
            console.log(`
            Timer one latest ${timerValOne},
            Timer two latest ${timerValTwo},
            Timer three latest ${timerValThree},
            `)
        });
    }

    withLatestFrom() {
        let source1$ = Observable.interval(1000);
        let source2$ = Observable.interval(500);

        source1$
            .withLatestFrom(source2$)
            .subscribe(this.getSubscriber('with-latest-from'));
    }

    // zip stops till one of the inner streams completes
    zipIntervals() {
        let source1$ = Observable.interval(1000);

        let source$ = Observable
            .zip(
            source1$,
            source1$.take(5)
            )
            .subscribe(this.getSubscriber('zip-interval'))
    }

    // Combines the observables in an array form
    // it waits till all of the inner streams complete
    zip() {
        let source1$ = Observable.of('First');
        let source2$ = Observable.of('Second');
        let source3$ = Observable.of('Third').delay(3000);
        let source4$ = Observable.of('Fourth');

        let source$ = Observable
            .zip(
            source1$,
            source2$,
            source3$,
            source4$
            );

        source$.subscribe(this.getSubscriber('zip'));
    }

    concatMap() {
        Observable.range(0, 10)
            .concatMap(function (x, i) {
                return Observable
                    .interval(100)
                    .take(x)
                    .map(function () {
                        return i;
                    })
            })
            .subscribe(this.getSubscriber('concat-map'));
    }

    mergeMapPromise() {

        const myPromise = function (v) {
            return new Promise(function (resolve, reject) {
                resolve(v + ' World from promise')
            });
        }

        Observable.of('Hello')
            .mergeMap(function (v) {
                return myPromise(v)
            })
            .subscribe(this.getSubscriber('merge-map-promise'));
    }

    mergeMap() {
        Observable.of('Hello')
            .mergeMap(function (v) {
                return Observable.of(v + ' World')
            })
            .subscribe(this.getSubscriber('merge-map'))
    }

    concatAll() {
        Observable.range(0, 3)
            .map(function (x) {
                return Observable.range(x, 3)
            })
            .concatAll()
            .subscribe(this.getSubscriber('concat-all'));
    }

    concat() {
        let source1$ = Observable.of(123);
        let source2$ = Observable.of(456);

        Observable.concat(source1$, source2$)
            .subscribe(this.getSubscriber('concat'));
    }

    mergeAll() {
        let source$ = Observable
            .range(0, 3)
            .map(function (x) {
                return Observable.range(0, 3)
            })
            .mergeAll()
            .subscribe(this.getSubscriber('merge-all'));
    }


    merge2() {
        let source$ =
            Observable.interval(2000)
                .map(v => 'stream 1: ' + v)
                .merge(Observable.interval(4000)
                    .map(v => 'stream 2: ' + v))
                .take(25)
                .subscribe(this.getSubscriber('merge-two'))
    }

    merge1() {
        let source$ =
            Observable
                .of('Hello')
                .merge(Observable.of('World'))
                .subscribe(this.getSubscriber('merge-one'));
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