import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonReorderGroup } from '@ionic/angular';

interface ReorderItem {
  label: string;
  value: number;
}

@Component({
  selector: 'reorder-control',
  templateUrl: './reorder-control.component.html',
  styleUrls: ['./reorder-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReorderControlComponent),
      multi: true,
    },
  ],
})
export class ReorderControlComponent implements OnInit, ControlValueAccessor {
  @Input() items: ReorderItem[];

  disabled: boolean = false;

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor() {}

  ngOnInit() {}

  writeValue(value: number[]): void {
    if (value && value.length) {
      let newItemsOrder = [];

      value.forEach((id) => {
        newItemsOrder.push(this.items.find((item) => item.value === id));
      });

      this.items = [...newItemsOrder];
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    this.items = ev.detail.complete(this.items);

    const value = this.items.map((item) => item.value);

    this.onTouched();
    this.onChange(value);
  }
}
