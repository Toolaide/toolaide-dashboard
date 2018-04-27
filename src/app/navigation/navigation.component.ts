import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToolDefinitionModel } from "../core/models/tool-definition.model";
import { NavigationService, ToolToolTool } from "./navigation.service";

@Component({
  selector: 'tam-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public tools: ToolToolTool[];

  constructor(private navigationService: NavigationService, private router: Router) {
    this.navigationService.tools.subscribe(tools => {
      console.log(tools);
      this.tools = tools;
    });
  }

  ngOnInit() {
  }

  openTool(tool: ToolToolTool) {
    this.router.navigate([tool.path]);
  }
}
