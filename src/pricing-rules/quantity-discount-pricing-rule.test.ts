import { QuantityDiscountRule } from "./quantity-discount-pricing-rule";
import { equal, greaterThan } from "./rules.symbol";


describe('Quantity Rule test', () => {

    describe('Validate a equal discount rule', () => {
        const discountRule = new QuantityDiscountRule({
            quantity: 4,
            rule: equal,
            discountQuantity: 1
        });

        it('should trigger rule', () => {
            expect(discountRule.calculatePrice(4, 400)).toEqual(400*3)
        })

        it('should not trigger rule', () => {
            expect(discountRule.calculatePrice(3,400)).toEqual(400*3)
        })
    })

    describe('Validate a greater than discount rule', () => {
        const discountRule = new QuantityDiscountRule({
            quantity: 4,
            rule: greaterThan,
            discountQuantity: 2
        });

        it('should trigger rule', () => {
            expect(discountRule.calculatePrice(5,400)).toEqual(400*3)
        })

        it('should not trigger the rule', () => {
            expect(discountRule.calculatePrice(4, 400)).toEqual(400*4)
        })
    })
})