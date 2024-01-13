import { PricingRuleI } from "../checkout/interface";
import { buildExpression } from "./utils";

export interface SpecialDiscountRule {
    quantity: number;
    rule: symbol;
    discountQuantity: number;
}

export class QuantityDiscountRule implements PricingRuleI {
    private readonly ruleExpression: string;
    private readonly discountQuantity: number;

    constructor(disountRule: SpecialDiscountRule) {
        this.ruleExpression = buildExpression(disountRule.quantity,disountRule.rule);

        if(disountRule.discountQuantity > disountRule.quantity) {
            throw new Error("discount quantity must be less than quantity")
        }

        this.discountQuantity = disountRule.discountQuantity;
    }

    calculatePrice(quantity: number,price: number): number {
        if(!this.validateRule(quantity)) {
            return Number((quantity * price).toFixed(2))
        }

        console.log('applying quantity discount for', quantity,price)

        return Number(((quantity - this.discountQuantity) * price).toFixed(2))
    }

    private validateRule(quantity: number): boolean {
        return eval(`${this.ruleExpression} ${quantity}`)
    }
}