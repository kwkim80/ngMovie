import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not',
  template: `
    <p>
      Page is not find!
    </p>
  `,
  styles: [
  ]
})
export class PageNotComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
