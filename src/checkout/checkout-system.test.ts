import { BulkDiscountPricingRule, QuantityDiscountRule, equal, greaterThan } from "../pricing-rules";
import { CheckoutSystem } from "./checkout-system";


describe("Checkout system", () => {

    describe("Test total price", ()=> {
        let checkoutSystem: CheckoutSystem;

        beforeEach(() => {
            checkoutSystem = new CheckoutSystem();
            checkoutSystem.addPricingRule("atv",new QuantityDiscountRule({
                quantity: 3,
                rule: equal,
                discountQuantity: 1,
            }));
    
            checkoutSystem.addPricingRule("ipd",new BulkDiscountPricingRule({
                quantity: 4,
                rule: greaterThan,
                discountUnitPrice: 499.99,
            }));
        })


        it("Test input 1", () => {
            checkoutSystem.scan('atv')
            checkoutSystem.scan('atv')
            checkoutSystem.scan('atv')
            checkoutSystem.scan('vga')

            expect(checkoutSystem.total()).toEqual(249.00)
        });

        it("Test input 2", () => {
            checkoutSystem.scan('atv')
            checkoutSystem.scan('ipd')
            checkoutSystem.scan('ipd')
            checkoutSystem.scan('atv')
            checkoutSystem.scan('ipd')
            checkoutSystem.scan('ipd')
            checkoutSystem.scan('ipd')

            expect(checkoutSystem.total()).toEqual(2718.95)
        });
    })
})