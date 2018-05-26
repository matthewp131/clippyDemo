import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgentMakerRoutingModule } from './agent-maker-routing.module';
import { AgentPickerComponent } from './agent-maker/agent-picker/agent-picker.component';
import { TaskPickerComponent } from './agent-maker/agent-picker/task-picker/task-picker.component';
import { TaskListerComponent } from './agent-maker/agent-picker/task-lister/task-lister.component';
import { NamePickerComponent } from './agent-maker/agent-picker/name-picker/name-picker.component';
import { AgentMakerComponent } from './agent-maker/agent-maker.component';


@NgModule({
  imports: [
    CommonModule,
    AgentMakerRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    AgentPickerComponent,
    TaskPickerComponent,
    TaskListerComponent,
    NamePickerComponent,
    AgentMakerComponent
  ],
  bootstrap: [ AgentMakerComponent ]
})
export class AgentMakerModule { }

