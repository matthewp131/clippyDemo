import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import clippyjs from 'clippyjs';
import { NullTemplateVisitor } from '@angular/compiler';

import { Agent, Coordinates } from '../AgentTask';

@Component({
  selector: 'app-agent-picker',
  templateUrl: './agent-picker.component.html',
  styleUrls: ['./agent-picker.component.css']
})
export class AgentPickerComponent implements OnInit {
  agentForm: FormGroup;

  agentNames: string[] = ['Merlin', 'Links', 'Genius', 'Genie', 'Rover', 'Peedy', 'Bonzi', 'Clippy', 'F1', 'Rocky'];
  agentAnimations: string[];

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
    this.onChanges();
  }

  createForm() {
    this.agentForm = this.formBuilder.group({
      agentName: new FormControl('', Validators.required),
      agentMessage: new FormControl(),
      agentAnimation: new FormControl(),
      agentGestureXY: this.formBuilder.group({
        X_px: new FormControl(500),
        Y_px: new FormControl(500)
      }),
      agentDestinationXY: this.formBuilder.group({
        X_px: new FormControl(500),
        Y_px: new FormControl(500)
      })
    });
  }

  rebuildForm() {
    this.agentForm.reset({
      agentGestureXY: {
        X_px: 500,
        Y_px: 500
      },
      agentDestinationXY: {
        X_px: 500,
        Y_px: 500
      }
    });
    this.agentAnimations.length = 0;
  }

  onChanges() {
    this.agentForm.get('agentName').valueChanges.subscribe(newAgentName => {
      this.agentForm.get('agentAnimation').reset();
      clippyjs.load(newAgentName, (agent) => {
        this.agentAnimations = agent.animations().sort();
      });
    });
  }

  onSubmit() {
    this.processAction();
    this.rebuildForm();
  }

  processAction() {
    const newAgent = new Agent(this.agentForm.get('agentName').value);

    if (this.agentForm.get('agentMessage').value) {
      newAgent.addTask('speak', this.agentForm.get('agentMessage').value);
    }

    newAgent.startAgent();
  }

}
