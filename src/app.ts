import {CheckoutSystem } from "./checkout/checkout-system";
import { BulkDiscountPricingRule, QuantityDiscountRule, equal, greaterOrEqual, greaterThan } from "./pricing-rules";


function main() {
    // Initalize checkout system
    const checkoutSystem = new CheckoutSystem();

    // Add Qunatity Discout rule
    checkoutSystem.addPricingRule("atv",new QuantityDiscountRule({
        quantity: 3,
        rule: equal,
        discountQuantity: 1,
    }));


    // Bulk discount rule
    checkoutSystem.addPricingRule("ipd",new BulkDiscountPricingRule({
        quantity: 4,
        rule: greaterThan,
        discountUnitPrice: 499.99,
    }));

    // Scan items in checkout
    checkoutSystem.scan('atv')
    checkoutSystem.scan('ipd')
    checkoutSystem.scan('ipd')
    checkoutSystem.scan('atv')
    checkoutSystem.scan('ipd')
    checkoutSystem.scan('ipd')
    checkoutSystem.scan('ipd')

    // Total price to be paid
    console.log(checkoutSystem.total())
}


main()