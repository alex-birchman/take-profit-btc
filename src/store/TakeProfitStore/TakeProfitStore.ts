import { observable, computed, action } from "mobx";

import {
  ITakeProfitStore,
  ITakeProfitValidation,
  ProfitItem,
} from "./interfaces";
import { IRootStore } from "../interfaces";
import { MAX_PROFIT_TARGETS } from "./TakeProfitStore.const";
import {
  checkEachTargetProfitGteError,
  checkMaxSumProfitTargetsError,
  checkMinProfitTargetPriceError,
  checkMinValueProfitTargetError,
  checkSumProfitTargetAmountGteError,
  checkSumProfitTargetAmountLteError,
  addNextProfitTarget,
  calculateProjectedProfit,
} from "./TakeProfitStore.utils";
import { product } from "ramda";

const inititalValidation = {
  maxSumProfitTargetsError: null,
  minValueProfitTargetError: null,
  eachTargetProfitGteError: null,
  minProfitTargetPriceError: null,
  sumProfitTargetAmountGteError: null,
  sumProfitTargetAmountLteError: null,
};

const inititalState = {
  profitTargets: [],
  takeProfitEnabled: false,
  validation: inititalValidation,
};

export class TakeProfitStore implements ITakeProfitStore {
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
  }

  @observable takeProfitEnabled: boolean = inititalState.takeProfitEnabled;
  @observable profitTargets: ProfitItem[] = inititalState.profitTargets;
  @observable validation: ITakeProfitValidation = inititalState.validation;

  @computed get currentValidationError(): string | undefined {
    return Object.values(this.validation).find((error) => error !== null);
  }

  @computed get isMoreTargetsAllowed(): boolean {
    return this.profitTargets.length < MAX_PROFIT_TARGETS;
  }

  @computed get projectedProfit(): string {
    return calculateProjectedProfit({
      orderSide: this.rootStore.placeOrderStore.activeOrderSide,
      orderPrice: this.rootStore.placeOrderStore.price,
      orderAmount: this.rootStore.placeOrderStore.amount,
      targets: this.profitTargets,
    }).toFixed(2);
  }

  @action.bound
  public toggleProfit() {
    const nextTakeProfitEnabled = !this.takeProfitEnabled;

    if (this.profitTargets.length === 0) {
      const nextProfitTarget = addNextProfitTarget({
        orderSide: this.rootStore.placeOrderStore.activeOrderSide,
        orderPrice: this.rootStore.placeOrderStore.price,
        targets: this.profitTargets,
        isInitital: true,
      });
      this.profitTargets.push({ ...nextProfitTarget, isError: false });
    }

    if (nextTakeProfitEnabled === false) {
      this.resetStoreState();
    }

    this.takeProfitEnabled = !this.takeProfitEnabled;
  }

  @action.bound
  public setProfitTarget<K extends keyof ProfitItem>(
    id: string,
    param: K,
    value: ProfitItem[K]
  ) {
    const profit = this.profitTargets.find((p) => p.id === id);
    if (!profit) {
      return;
    }
    profit[param] = value;

    // reset validation errors
    this.validation = inititalValidation;
    profit.isError = false;
  }

  @action.bound
  public addProfitTarget() {
    if (this.profitTargets.length >= MAX_PROFIT_TARGETS) {
      return;
    }

    const nextProfitTarget = addNextProfitTarget({
      orderSide: this.rootStore.placeOrderStore.activeOrderSide,
      orderPrice: this.rootStore.placeOrderStore.price,
      targets: this.profitTargets,
    });

    this.profitTargets.push({ ...nextProfitTarget, isError: false });
  }

  @action.bound
  public removeProfitTarget(id: string) {
    this.profitTargets = this.profitTargets.filter((p) => p.id !== id);

    if (!this.profitTargets.find((p) => p.isError)) {
      this.validation = inititalValidation;
    }

    if (this.profitTargets.length === 0) {
      this.toggleProfit();
    }
  }

  @action.bound
  public updateProfitTarget<
    K extends keyof Omit<ProfitItem, "id" | "amount" | "isError">
  >(id: string, param: K, value: ProfitItem[K]) {
    const profitTarget = this.profitTargets.find((p) => p.id === id);

    if (!profitTarget) {
      return;
    }

    switch (param) {
      case "profit": {
        profitTarget.price =
          this.rootStore.placeOrderStore.activeOrderSide === "buy"
            ? this.rootStore.placeOrderStore.price *
              (1 + profitTarget.profit / 100)
            : this.rootStore.placeOrderStore.price *
              (1 - profitTarget.profit / 100);
        break;
      }
      case "price": {
        profitTarget.profit =
          this.rootStore.placeOrderStore.activeOrderSide === "buy"
            ? ((value - this.rootStore.placeOrderStore.price) /
                this.rootStore.placeOrderStore.price) *
              100
            : ((this.rootStore.placeOrderStore.price - value) /
                this.rootStore.placeOrderStore.price) *
              100;
        break;
      }
    }
  }

  @action.bound
  validateProfitTargets() {
    this.validation = {
      maxSumProfitTargetsError: this.getMaxSumProfitTargetsError(),
      minValueProfitTargetError: this.getMinValueProfitTargetError(),
      eachTargetProfitGteError: this.getEachTargetProfitGteError(),
      minProfitTargetPriceError: this.getMinProfitTargetPriceError(),
      sumProfitTargetAmountGteError: this.getSumProfitTargetAmountGteError(),
      sumProfitTargetAmountLteError: this.getSumProfitTargetAmountLteError(),
    };
  }

  private getMaxSumProfitTargetsError() {
    return checkMaxSumProfitTargetsError(this.profitTargets);
  }

  private getMinValueProfitTargetError() {
    const { error, profitTargets } = checkMinValueProfitTargetError(
      this.profitTargets
    );
    this.profitTargets = profitTargets;
    return error;
  }

  private getEachTargetProfitGteError() {
    return checkEachTargetProfitGteError(this.profitTargets);
  }

  private getMinProfitTargetPriceError() {
    const { error, profitTargets } = checkMinProfitTargetPriceError(
      this.profitTargets
    );
    this.profitTargets = profitTargets;
    return error;
  }

  private getSumProfitTargetAmountGteError() {
    return checkSumProfitTargetAmountGteError(this.profitTargets);
  }

  private getSumProfitTargetAmountLteError() {
    return checkSumProfitTargetAmountLteError(this.profitTargets);
  }

  private resetStoreState() {
    this.profitTargets = inititalState.profitTargets;
    this.validation = inititalState.validation;
  }
}
