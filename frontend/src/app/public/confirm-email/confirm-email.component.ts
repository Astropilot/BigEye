import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


declare var particlesJS: any;

@Component({
  templateUrl: './confirm-email.component.html',
})
export class ConfirmEmailComponent implements OnInit {
  public valid = false;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    particlesJS.load('particles-js', '../assets/particlesjs.json', null);

    this.route.data.subscribe(({info}) => {
      if (!info) {
          this.valid = false;
          return;
      }

      this.valid = true;

  });

  }
}
