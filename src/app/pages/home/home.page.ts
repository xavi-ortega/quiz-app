import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  homeForm: FormGroup;

  items = [
    {
      label: 'Item 1',
      value: 1,
    },
    {
      label: 'Item 2',
      value: 3,
    },
    {
      label: 'Item 3',
      value: 5,
    },
    {
      label: 'Item 4',
      value: 7,
    },
  ];

  constructor() {}

  ngOnInit() {
    this.homeForm = new FormGroup({
      reorder: new FormControl([5, 3, 1, 7], Validators.required),
    });

    this.homeForm.valueChanges.subscribe(console.log);
  }
}
