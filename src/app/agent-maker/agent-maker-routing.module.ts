import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentMakerComponent } from './agent-maker/agent-maker.component';

const routes: Routes = [
  {
    path: '',
    component: AgentMakerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentMakerRoutingModule { }
