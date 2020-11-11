import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  flipToggle(switchId: string): void {
    this.changeTogglePicture(switchId);
  }

  changeTogglePicture(switchId: string): void {
    let toggle: HTMLElement = document.getElementById(switchId);

    if (toggle.className.indexOf(" toggle-flipped-up") == -1) {
      toggle.className += " toggle-flipped-up";
    } else {
      toggle.className = "switch-plate";
    }
  }


}
