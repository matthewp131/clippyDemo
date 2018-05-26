import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import clippyjs from 'clippyjs';

@Component({
  selector: 'app-name-picker',
  templateUrl: './name-picker.component.html',
  styleUrls: ['./name-picker.component.css']
})
export class NamePickerComponent implements OnInit {
  @Input() submitObservable: Observable<any>;
  @Output() nameEmitter = new EventEmitter<string>();

  nameForm: FormGroup;
  agentNames: string[] = ['Merlin', 'Links', 'Genius', 'Genie', 'Rover', 'Peedy', 'Bonzi', 'Clippy', 'F1', 'Rocky'];

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.onChanges();
  }

  private createForm() {
    this.nameForm = this.formBuilder.group({
      agentName: new FormControl('', Validators.required)
    });
  }

  private onChanges() {
    this.nameForm.get('agentName').valueChanges.subscribe(newName => this.nameEmitter.emit(newName));
    this.submitObservable.subscribe(() => this.nameForm.reset());
  }
}
