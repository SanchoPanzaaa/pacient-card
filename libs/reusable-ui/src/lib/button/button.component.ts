import { Component } from '@angular/core';

@Component({
  selector: 'ui-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {


  onSubmit(event: Event) {
    event.preventDefault();
    console.log('Button clicked');
  }
}
