import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AgentPickerComponent } from './agent-picker/agent-picker.component';
import { TaskPickerComponent } from './agent-picker/task-picker/task-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    AgentPickerComponent,
    TaskPickerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
