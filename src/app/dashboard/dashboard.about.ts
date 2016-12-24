import { Component } from '@angular/core';

@Component({
   template: '<h1>{{title}}</h1>'
})

export class AboutComponent {

    title="Angular 2 About";

    constructor() { }
    
}