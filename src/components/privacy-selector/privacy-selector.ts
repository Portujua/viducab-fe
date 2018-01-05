import { Component } from '@angular/core';
import * as _ from 'underscore/underscore';

/**
 * Generated class for the PrivacySelectorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'privacy-selector',
  templateUrl: 'privacy-selector.html'
})
export class PrivacySelectorComponent {

  privacies: any;
  people: Array<object>;
  data: any;

  constructor() {
    this.privacies = [
      {
        id: 1,
        name: 'Todos'
      },
      {
        id: 2,
        name: 'Solo yo'
      },
      {
        id: 3,
        name: 'Nadie, excepto'
      }
    ]

    let names = ["Christian Leon", "Eduardo Lorenzo", "Lucas Napoli", "Amir Salous", "Omar Gonzalez", "Carla Navas", "Christiam Mena"]
    this.people = []

    _.each(names, (item) => {
      this.people.push(this.generatePeople(item))
    })

    this.data = this.privacies[2]
  }

  // Temporary method
  generatePeople(name) {
    return {
      id: Math.floor(Math.random() * 100000),
      name: name,
      selected: false
    }
  }
}
