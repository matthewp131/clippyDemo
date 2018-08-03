import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentMakerComponent } from './agent-maker/agent-maker.component';

const routes: Routes = [
  {
    path: '',
    component: AgentMakerComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentMakerRoutingModule { }
