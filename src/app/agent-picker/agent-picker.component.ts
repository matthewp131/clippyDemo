import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import clippyjs from 'clippyjs';

@Component({
  selector: 'app-agent-picker',
  templateUrl: './agent-picker.component.html',
  styleUrls: ['./agent-picker.component.css']
})
export class AgentPickerComponent implements OnInit {
  agentForm: FormGroup;
  agentNames: string[] = ['Merlin', 'Links', 'Genius', 'Genie', 'Rover', 'Peedy', 'Bonzi', 'Clippy', 'F1', 'Rocky'];

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.agentForm = this.formBuilder.group({
      agentName: new FormControl(),
      agentMessage: new FormControl()
    });
  }

  onSubmit() {
    clippyjs.load(this.agentForm.get('agentName').value, (agent) => {
      agent.show();
      agent.speak(this.agentForm.get('agentMessage').value);
    });
  }

}
