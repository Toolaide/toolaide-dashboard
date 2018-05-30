import { Type, Component } from "@angular/core";

export interface IPortType {
  name: string;
}

export interface IToolPort<T> {
  name: string;
  description: string;
  type: IPortType;
  error: InputError;
  isSerializable(): boolean;
  serialize(): string;
  value: T;
  clone(): IToolPort<T>;
  toString(): string;
}

// basic tool ports
export class BooleanPort implements IToolPort<boolean> {
  public error: InputError;
  name: string;
  readonly description: string = "Bool Type";
  type: IPortType = { name: "Boolean" };
  public value = false;

  constructor(name: string) {
    this.name = name;
  }
  isSerializable(): boolean {
    return true;
  }
  serialize(): string {
    return this.value.toString();
  }
  clone(): IToolPort<boolean> {
    return new BooleanPort(this.name);
  }
  toString(): string {
    return this.serialize();
  }
}

export class NumberPort implements IToolPort<number> {
  public error: InputError;
  name: string;
  readonly description: string = "Numeric Type";
  type: IPortType = { name: "Number" };
  public value = 0;

  constructor(name: string, _value:number = 0) {
    this.name = name;
    this.value = _value;
  }

  isSerializable(): boolean {
    return true;
  }
  serialize(): string {
    return this.value.toString();
  }
  clone(): IToolPort<number> {
    return new NumberPort(this.name, this.value);
  }
  toString(): string {
    return this.serialize();
  }
}

export type PortConstructor<T> = new(name: string) => IToolPort<T>;
export class PortFactory {
  private static ports: {[name: string]: PortConstructor<any>} = {};

  static initialize() {
    this.registerPortType("Boolean", BooleanPort);
    this.registerPortType("Number", NumberPort);
  }

  static registerPortType(name: string, portFactory: PortConstructor<any>) {
    if(!portFactory || this.ports[name]) {
      throw new Error("Port is undefined or already in use");
    }
    
    // try one
    const inst = new portFactory("Test");
    if(inst.type.name !== name) {
      throw new Error("Given name does not match instance name");
    }

    this.ports[name] = portFactory;
  }

  static createPort<T>(type: string, name: string): IToolPort<T> {
    return new this.ports[type](name);
  }

  static createBooleanPort(name: string): IToolPort<boolean> {
    return new BooleanPort(name);
  }

  static createNumberPort(name: string): IToolPort<number> {
    return new NumberPort(name);
  }
}
PortFactory.initialize();



export interface IToolSerialisation {
  toolId: string;
  version: string;
  data: string;
}

export interface INodeView {
  // TODO
}

export interface IConcreteToolFactory {
  newInstance(): ToolDefinitionModel;
  getToolView<T extends Component>(): Type<T>;
  getNodeView<N extends Component,INodeView>(): Type<N>;
}

export interface IStateMemory {
  // TODO expose undo/redo stack
  undo(): boolean;
  redo(): boolean;
}

export interface InputError {
  message: string;
  data: any; // TODO specify 
}

export type PortMap = {[name:string]: IToolPort<any>};

export abstract class ToolDefinitionModel implements IStateMemory {
  abstract getState(version?:string): Promise<IToolSerialisation>;
  abstract setState(data: IToolSerialisation): Promise<boolean>;
  abstract execute(): Promise<PortMap>;

  // base functionality
  abstract clone(): ToolDefinitionModel;
  abstract hashcode(): string;
  abstract equals(other: ToolDefinitionModel): string;
  abstract toString(): string;

  protected inputs: PortMap;
  protected outputs: PortMap;

  constructor(
    public readonly toolId: string, 
    public readonly name: string,
    public readonly exposed: boolean,
    public readonly version: string,
    public description?: string,
      ) {
    this.inputs = {};
    this.outputs = {};
  }

  addInput(port: IToolPort<any>) {
    if(this.inputs[port.name]) {
      throw new Error("Input already defined");
    }
    this.inputs[port.name] = port.clone();;
  }

  addOutput(port: IToolPort<any>) {
    if(this.outputs[name]) {
      throw new Error("Output already defined");
    }
    this.outputs[port.name] = port.clone();
  }

  setInput(name:string, value: any) {
    if(!this.inputs || !this.inputs[name]) {
      throw new Error("Input does not exist");
    }
    this.inputs[name].value = value;
  }

  getOutput(name: string): IToolPort<any> {
    if(!this.outputs || !this.outputs[name]) {
      throw new Error("Output does not exist");
    }
    return this.outputs[name];
  }

  getInput(name: string): IToolPort<any> {
    if(!this.inputs || !this.inputs[name]) {
      throw new Error("Output does not exist");
    }
    return this.inputs[name];
  }

  cloneOutputs(): PortMap {
    const out = {};
    Object.keys(this.outputs).forEach(key => {
      out[key] = this.outputs[key].clone();
    });
    return out;
  }
  
  // expose undo/redo stack
  undo(): boolean {
    return false;
  }
  redo(): boolean {
    return false;
  }
}

export interface IToolFactory {
  deserialise(data: IToolSerialisation): ToolDefinitionModel;
  fromToolId(toolId: string): IConcreteToolFactory;
  register(toolId: string, factory: IConcreteToolFactory);
}


/// TESTAREA
export class RandomNumber extends ToolDefinitionModel {
  constructor() {
    super(
      "random_number",
      "Random Number",
      true,
      "1.0.0",
      "Generates random Numbers in specified range"
    );

    this.addInput(PortFactory.createNumberPort("min"));
    this.addInput(PortFactory.createNumberPort("max"));
    this.addInput(PortFactory.createBooleanPort("int"));

    this.addOutput(PortFactory.createNumberPort("value"));
  }
  getState(version?: string): Promise<IToolSerialisation> {
    return Promise.resolve({
      toolId: "random number generator",
      version: this.version,
      data: JSON.stringify({
        "min": this.getInput("min").value,
        "max": this.getInput("max").value
      })
    });
  }
  setState(data: IToolSerialisation): Promise<boolean> {
    const ports = JSON.parse(data.data);
    if(ports.min && ports.max) {
     this.setInput("min", parseFloat(ports.min));
     this.setInput("max", parseFloat(ports.max));

     return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }
  execute(): Promise<PortMap> {
    const min = this.getInput("min").value;
    const max = this.getInput("max").value;

    let result = (Math.random() * (max-min) + min);
    if(this.getInput("int").value) {
      result = Math.floor(result);
    }
    this.outputs["value"].value = result;
    return Promise.resolve(this.cloneOutputs());
  }
  clone(): ToolDefinitionModel {
    const model = new RandomNumber();
    model.setInput("min", this.getInput("min").value);
    model.setInput("max", this.getInput("max").value);
    return model;
  }
  hashcode(): string {
    throw new Error("Method not implemented.");
  }
  equals(other: ToolDefinitionModel): string {
    throw new Error("Method not implemented.");
  }
  toString(): string {
    return "Foo";
  }
}