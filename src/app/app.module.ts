import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForexApplicationComponent } from './forex/forex-application/forex-application.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { ToastModule } from 'primeng/toast';
import { AlertService } from './forex/services/alert.service';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';



@NgModule({
  declarations: [
    AppComponent,
    ForexApplicationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ProgressSpinnerModule,
    FormsModule,
    DropdownModule,
    ChartModule,
    ButtonModule,
    HttpClientModule,
    ToastModule,
    KeyboardShortcutsModule.forRoot()
  ],
  exports: [
    HttpClientModule
  ],
  providers: [AlertService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
