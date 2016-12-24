import { Component } from '@angular/core';

@Component({
    template: '<h1>{{title}}</h1>'
})

export class HomeComponent { 
    
    title="Angular 2 Home";
    
    constructor() { }
    
}