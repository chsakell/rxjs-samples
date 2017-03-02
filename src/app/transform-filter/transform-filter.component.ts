import { Observable } from 'rxjs/Rx';
import { Component, OnInit, ViewChild } from '@angular/core';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'transform-filter',
    templateUrl: 'transform-filter.component.html'
})
export class TransformFilterComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        // this.takeUntil();
        this.skipUntil();
        // this.takeWhile();
        // this.skipWhile();
        // this.skip();
        // this.take();
        // this.findIndex();
        // this.find();
        // this.single();
        // this.last();
        // this.first();
        // this.bufferCount();
        // this.buffer();
        // this.pluck();
        // this.mapTo();
        // this.mapToObject();
        // this.mappArray();
        // this.map();
    }

    // skip items for a certain duration. then start emitting
    skipUntil() {
        const source$ = Observable.interval(1000);

        source$
            .skipUntil(Observable.timer(4000))
            .subscribe(this.getSubscriber('skip-until'));
    }

    // take items for a certain duration. then stop
    takeUntil() {
        const source$ = Observable.interval(1000);

        source$
            .takeUntil(Observable.timer(4000))
            .subscribe(this.getSubscriber('take-until'));
    }

    // skip items till a condintion is true
    skipWhile() {
        const source$ = Observable.range(1,10);

        source$
            .skipWhile(v => v < 5)
            .subscribe(this.getSubscriber('skip-while'));
    }

    // take items till a condintion is true
    takeWhile() {
        const source$ = Observable.range(1,10);

        source$
            .takeWhile(v => v < 5)
            .subscribe(this.getSubscriber('take-while'));
    }

    // skip the first # items
    skip() {
        const source$ = new Observable(observer => {
            observer.next(1);
            observer.next(2);
            observer.next('hello'); 
            observer.next('chris');
            observer.next('christos')
            observer.complete();
        });

        source$
            .skip(3)
            .subscribe(this.getSubscriber('skip'));
    }

    // take the first # items
    take() {
        const source$ = new Observable(observer => {
            observer.next(1);
            observer.next(2);
            observer.next('hello'); 
            observer.next('chris');
            observer.next('christos')
            observer.complete();
        });

        source$
            .take(3)
            .subscribe(this.getSubscriber('take'));
    }

    // return the index if found or -1
    findIndex() {
        const source$ = new Observable(observer => {
            observer.next(1);
            observer.next(2);
            observer.next('hello'); // 2
            observer.next('chris');
            observer.next('christos')
            observer.complete();
        });

        source$
            .findIndex((x, i) => {
                return JSON.stringify(x).indexOf('hello') > 0;
            })
            .subscribe(this.getSubscriber('find-index'));
    }

    // find (x,i) x: value, i: index
    // returns undefine if not found
    find() {
        const source$ = new Observable(observer => {
            observer.next(1);
            observer.next(2);
            observer.next('hello');
            observer.next('chris');
            observer.next('christos')
            observer.complete();
        });

        source$
            .find((x, i) => {
                return JSON.stringify(x).indexOf('chr') > 0;
            })
            .subscribe(this.getSubscriber('find'));
    }

    // Get a single value. Only one value should emitted
    single() {
        const source$ = new Observable(observer => {
            observer.next(1);

            observer.complete();
        });

        source$
            .single()
            .subscribe(this.getSubscriber('single'));
    }

    // Get the last item emitted by an observable
    // produces error if no value emitted
    last() {
        const source$ = new Observable(observer => {
            observer.next(1);
            observer.next(2);
            observer.next('hello');
            observer.next('chris');
            observer.complete();
        });

        source$
            .last()
            .subscribe(this.getSubscriber('last'));
    }

    // Get the first item emitted by an observable
    // produces error if no value emitted
    first() {
        const source$ = new Observable(observer => {
            observer.next(1);
            observer.next(2);
            observer.next('hello');
            observer.next('chris');
            observer.complete();
        });

        source$
            .first()
            .subscribe(this.getSubscriber('first'));
    }

    // buffer exact # of items before emit them
    bufferCount() {
        Observable.range(1, 15)
            .bufferCount(5)
            .subscribe(this.getSubscriber('buffer-count'));
    }

    // buffers items for a certain time 
    // the following will buffer items for 3 secs and then emit them
    buffer() {
        Observable.interval(1000)
            .buffer(Observable.interval(3000))
            .subscribe(this.getSubscriber('buffer'))
    }

    // extract certain properties from array objects
    pluck() {
        let users = [
            { name: 'Chris', username: 'chsakell', age: 31 },
            { name: 'Joe', username: 'doe', age: 22 },
            { name: 'Maria', username: 'mary', age: 31 }
        ];

        Observable.from(users)
            .pluck('name')
            .subscribe(this.getSubscriber('pluck'));
    }

    // maps each value to a specific one
    mapTo() {
        Observable.interval(2000)
            .mapTo('Hello World')
            .subscribe(this.getSubscriber('map-to'))
    }

    mapToObject() {
        let nums = [1, 2, 3, 4, 5];
        Observable.from(nums)
            .map(v => v * 2) // first double it
            .map(doubled => {
                return {
                    before: doubled / 2,
                    after: doubled
                }// return object
            }).subscribe(this.getSubscriber('map-to-object'));
    }

    mappArray() {
        let names = ['Chris', 'George', 'John'];
        Observable.from(names)
            .map(v => v.toUpperCase())
            .subscribe(this.getSubscriber('map-array'));
    }

    // Map each emmitted value to something else
    map() {
        Observable.interval(1000)
            .take(10)
            .map(v => v * v)
            .subscribe(this.getSubscriber('map'));
    }

    getSubscriber(id) {
        return {
            next(x) {
                if (x instanceof Object)
                    console.log(`${id}:`, x);
                else
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