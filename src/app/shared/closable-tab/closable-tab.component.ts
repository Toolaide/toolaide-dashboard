import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tam-closable-tab',
  templateUrl: './closable-tab.component.html',
  styleUrls: ['./closable-tab.component.scss']
})
export class ClosableTabComponent implements OnInit {

  @Input() label: string;
  closed = false;

  constructor() { }

  ngOnInit() {

  }

  closeTab() {
    this.closed = true;
  }

}
