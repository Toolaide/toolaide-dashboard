import { Component, OnInit } from '@angular/core';
import { RandomNumber } from '../../../core/models/tool-definition.model';

@Component({
  selector: 'tam-crypto-overview',
  templateUrl: './crypto-overview.component.html',
  styleUrls: ['./crypto-overview.component.scss']
})
export class CryptoOverviewComponent implements OnInit {

  constructor() { 

    const numberTool = new RandomNumber();

    numberTool.setInput("min",1);
    numberTool.setInput("max",3);
    numberTool.setInput("int", true);

    for(let i = 0; i < 10; i++) {
      numberTool.execute().then(result => {
        console.log(numberTool.toString(), result.value.value);
      });
    }
    
  }

  ngOnInit() {
  }

}
