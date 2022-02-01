import { Component, OnInit } from '@angular/core';

declare var particlesJS: any;


@Component({
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    particlesJS.load('particles-js', '../assets/particlesjs.json', null);
  }
}
