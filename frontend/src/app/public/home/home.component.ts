import { Component, OnInit } from '@angular/core';

declare var particlesJS: any;


@Component({
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    particlesJS.load('particles-js', '../assets/particlesjs.json', null);
  }
}
