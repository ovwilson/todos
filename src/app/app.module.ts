import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';

import { APPRROUTES } from "./app.routes";
import { todos } from "./reducers/todos";
import { filter } from "./reducers/filter";
import { AppComponent } from "./app.component";

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(APPRROUTES, { useHash: true }),
        HttpModule,
        FormsModule,
    StoreModule.provideStore({todos:todos,filter:filter}),
        StoreDevtoolsModule.instrumentStore({
            monitor: useLogMonitor({
                visible: true,
                position: 'right'
            })
        }),
        StoreLogMonitorModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }