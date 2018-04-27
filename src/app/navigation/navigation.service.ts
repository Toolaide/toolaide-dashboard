import { Injectable } from '@angular/core';
import { Routes } from "@angular/router";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { ToolDefinitionModel } from "../core/models/tool-definition.model";
import "rxjs/add/operator/map";

export interface ToolToolTool {
  definition: ToolDefinitionModel;
  path: string;
}

export interface ToolMap {[id: string]: ToolToolTool; }

@Injectable()
export class NavigationService {

  private $tools: BehaviorSubject<ToolMap>;
  public get tools(): Observable<ToolToolTool[]> {
    return this.$tools.map(elem => {
      return Object.values(elem);
    });
  }

  constructor() {
    this.$tools = new BehaviorSubject<ToolMap>({});
  }

  registerTools(toolRoutes: Routes) {
    console.log("Foo");
    const tools = this.$tools.getValue();
    toolRoutes.forEach(toolRoute => {
      if (!toolRoute.data && !toolRoute.data.tool) {
        return;
      }
      const model: ToolDefinitionModel = toolRoute.data.tool;

      tools[model.name] = {
        definition: model,
        path: toolRoute.path
      };

    });

    this.$tools.next(tools);
  }
}
