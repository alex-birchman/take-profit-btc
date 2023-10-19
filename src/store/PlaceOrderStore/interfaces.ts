import { OrderSide } from "../../PlaceOrder/model";

export interface IPlaceOrderStore {
  activeOrderSide: OrderSide;
  price: number;
  amount: number;
  total: number;
  setOrderSide: (side: OrderSide) => void;
  setPrice: (price: number) => void;
  setAmount: (amount: number) => void;
  setTotal: (total: number) => void;
}
