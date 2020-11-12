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

  //Identifies the switch that was flipped and initiates all needed updates
  flipToggle(switchId: string): void {
    let toggle: HTMLElement = document.getElementById(switchId);
    this.changeToggleData(toggle);
    this.findAllPlacesOfSum();
  }

  //Updates the switch so it flips and will read true when flipped up and false when flipped down.
  changeToggleData(toggle: HTMLElement): void {
    if (toggle.className.indexOf("toggle-flipped-up") == -1) {
      toggle.className = "switch-plate toggle-flipped-up";
      toggle.setAttribute("data-is-on", "true");
    } else {
      toggle.className = "switch-plate";
      toggle.setAttribute("data-is-on", "false");
    }
  }

  //Finds the sum of all places for the two numbers added together. Turns on the overflow bulb if the sum is above 1111_1111
  findAllPlacesOfSum(): void {
    let carry: boolean = false;
    for (let i: number = 0; i < 8; i++) {
      carry = this.findSinglePlaceOfSum(i.toString(), carry);
    }

    if (carry) {
      document.getElementById("ou").className = "bulb bulb-turned-on";
    } else {
      document.getElementById("ou").className = "bulb";
    }
  }

  //Identifies a single place to add between the 2 numbers and includes any carry in from lower places. Will light the appropriate place bulb if the sum is true.
  //Returns carry out for next higher place to use
  findSinglePlaceOfSum(numberPlace: string, carryIn: boolean): boolean {
    let toggle1: string = document.getElementById("1" + numberPlace).getAttribute("data-is-on");
    let toggle2: string = document.getElementById("2" + numberPlace).getAttribute("data-is-on");
    let toggle1Converted = toggle1 == "true";
    let toggle2Converted = toggle2 == "true";

    let results: boolean[] = this.fullAdder(toggle1Converted, toggle2Converted, carryIn);
    let sum: boolean = results[0];
    let carryOut = results[1]

    if (sum) {
      document.getElementById("r" + numberPlace).className = "bulb bulb-turned-on";
    } else {
      document.getElementById("r" + numberPlace).className = "bulb";
    }

    return carryOut;
  }

  //sumResult only returns true if 1 or 3 arguments are true. carryResult only returns true if at least 2 arguments are true.
  fullAdder(input1: boolean, input2: boolean, carryIn: boolean): boolean[] {
    let inputAdder: boolean[] = this.halfAdder(input1, input2);
    let inputAdderSum: boolean = inputAdder[0];
    let inputAdderCarryOut: boolean = inputAdder[1];
    let carryInAdder: boolean[] = this.halfAdder(inputAdderSum, carryIn);
    let sumResult: boolean = carryInAdder[0];
    let carryInAdderCarryOut: boolean = carryInAdder[1];
    let carryResult: boolean = inputAdderCarryOut || carryInAdderCarryOut;

    return [sumResult, carryResult];
  }

  //sumResult only returns true if 1 input is true. carryResult returns true only if both inputs are true.
  halfAdder(input1: boolean, input2: boolean): boolean[] {
    let orForSum: boolean = input1 || input2;
    let nandForSum: boolean = !(input1 && input2);
    let sumResult: boolean = orForSum && nandForSum;
    let carryResult: boolean = input1 && input2;

    return [sumResult, carryResult];
  }


}
