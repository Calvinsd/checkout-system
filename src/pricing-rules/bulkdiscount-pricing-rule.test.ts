import { BulkDiscountPricingRule } from "./bulkdiscount-pricing-rule"
import { equal, greaterThan } from "./rules.symbol"


describe('BulkDiscount Rule test', () => {

    describe('Validate a equal discount rule', () => {
        const discountRule = new BulkDiscountPricingRule({
            quantity: 4,
            rule: equal,
            discountUnitPrice: 333
        });

        it('should trigger rule', () => {
            expect(discountRule.calculatePrice(4, 400)).toEqual(333*4)
        })

        it('should not trigger rule', () => {
            expect(discountRule.calculatePrice(3,400)).toEqual(400*3)
        })
    })

    describe('Validate a greater than discount rule', () => {
        const discountRule = new BulkDiscountPricingRule({
            quantity: 4,
            rule: greaterThan,
            discountUnitPrice: 333
        });

        it('should trigger rule', () => {
            expect(discountRule.calculatePrice(5,400)).toEqual(333*5)
        })

        it('should not trigger the rule', () => {
            expect(discountRule.calculatePrice(4, 400)).toEqual(400*4)
        })
    })
})