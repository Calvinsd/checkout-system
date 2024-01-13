import { PricingRuleI } from "../checkout/interface";
import { buildExpression } from "./utils";


export interface BulkDiscountRule {
    quantity: number;
    rule: symbol;
    discountUnitPrice: number;
}

export class BulkDiscountPricingRule implements PricingRuleI {
    private readonly ruleExpression: string;
    private readonly unitPrice: number;

    constructor(disountRule: BulkDiscountRule) {
        this.ruleExpression = buildExpression(disountRule.quantity,disountRule.rule);
        this.unitPrice = disountRule.discountUnitPrice;
    }

    calculatePrice(quantity: number,price: number): number {
        if(!this.validateRule(quantity)) {
            return Number((quantity * price).toFixed(2))
        }

        console.log('applying bulk discount for', quantity,price)
        return Number((quantity * this.unitPrice).toFixed(2))
    }

    private validateRule(quantity: number): boolean {
        return eval(`${this.ruleExpression} ${quantity}`)
    }
}