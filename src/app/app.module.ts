import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { APPRROUTES } from './app.routes';

import { AppComponent } from "./app.component";

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(APPRROUTES),
        HttpModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }