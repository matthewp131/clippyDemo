import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AgentPickerComponent } from './agent-picker/agent-picker.component';
import { TaskPickerComponent } from './agent-picker/task-picker/task-picker.component';
import { TaskListerComponent } from './agent-picker/task-lister/task-lister.component';
import { NamePickerComponent } from './agent-picker/name-picker/name-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    AgentPickerComponent,
    TaskPickerComponent,
    TaskListerComponent,
    NamePickerComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
