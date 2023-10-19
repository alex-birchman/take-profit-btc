import { PlaceOrderStore } from "./PlaceOrderStore/PlaceOrderStore";
import { TakeProfitStore } from "./TakeProfitStore/TakeProfitStore";

import { IPlaceOrderStore } from "./PlaceOrderStore/interfaces";
import { ITakeProfitStore } from "./TakeProfitStore/interfaces";

export class RootStore {
  placeOrderStore: IPlaceOrderStore;
  takeProfitStore: ITakeProfitStore;

  constructor() {
    this.placeOrderStore = new PlaceOrderStore(this);
    this.takeProfitStore = new TakeProfitStore(this);
  }
}
