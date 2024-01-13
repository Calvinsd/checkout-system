import { DataStore } from "../database/data-store";
import { CheckoutI, PricingRuleI } from "./interface";

export class CheckoutSystem implements CheckoutI {
    private readonly db: DataStore;
    private readonly pricingRules: Record<string,PricingRuleI>;
    private checkoutTotal: number;
    private checkoutItems: Record<string,number>

    constructor() {
        this.db = new DataStore();
        this.pricingRules = {};
        this.checkoutTotal = 0;
        this.checkoutItems = {}
    }

    public scan(sku: string): void {
        const skuItem = this.db.findItem(sku);

        if(!skuItem) {
            console.log('Invalid item', sku)
            throw new Error('Invalid item');
        }

        if(!this.checkoutItems[sku]) {
            this.checkoutItems[sku] = 1
            return;
        }

        this.checkoutItems[sku] = this.checkoutItems[sku] + 1
    }

    public total(): number {

        Object.entries(this.checkoutItems).forEach(([sku,quantity]) => {
            const skuItem = this.db.findItem(sku);

            if(!skuItem) {
                console.log('Invalid item', sku)
                throw new Error('Invalid item');
            }

            if(this.pricingRules[sku]) {
                this.checkoutTotal += this.pricingRules[sku].calculatePrice(quantity,skuItem.Price);
                return;
            }

            this.checkoutTotal += Number((quantity * skuItem.Price).toFixed(2))            
        });

        return this.checkoutTotal;
    }

    public addPricingRule(sku: string,pRule: PricingRuleI): void {

        const skuItem = this.db.findItem(sku);

        if(!skuItem) {
            throw new Error('Invalid item');
        }

        this.pricingRules[sku] = pRule
    }
}