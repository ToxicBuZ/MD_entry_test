import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForexApplicationComponent } from './forex/forex-application/forex-application.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';





@NgModule({
  declarations: [
    AppComponent,
    ForexApplicationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
