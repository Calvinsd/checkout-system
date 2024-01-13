
export interface PricingRuleI {
    calculatePrice(quantity: number, price: number): number;
}

export interface CheckoutItem {
    items: Record<string,number>
}

export interface CheckoutI {
    scan(item: string): void;
    total(): number;
    addPricingRule(sku: string,pRule: PricingRuleI): void;
}