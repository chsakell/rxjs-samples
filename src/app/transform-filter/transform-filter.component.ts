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
        this.bufferCount();
        // this.buffer();
        // this.pluck();
        // this.mapTo();
        // this.mapToObject();
        // this.mappArray();
        // this.map();
    }

    // buffer exact # of items before emit them
    bufferCount() {
        Observable.range(1,15)
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