import { IPlaceOrderStore } from "./PlaceOrderStore/interfaces";
import { ITakeProfitStore } from "./TakeProfitStore/interfaces";

export interface IRootStore {
  placeOrderStore: IPlaceOrderStore;
  takeProfitStore: ITakeProfitStore;
}
