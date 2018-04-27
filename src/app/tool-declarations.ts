import { Routes } from "@angular/router";
import { ToolDefinitionModel } from "./core/models/tool-definition.model";

export const tools: Routes = [
  {
    path: 'crypto',
    loadChildren: 'app/tools/crypto-tools/crypto-tools.module#CryptoToolsModule',
    data: {
      tool: {
        name: "Crypto"
      } as ToolDefinitionModel
    }
  }
];
