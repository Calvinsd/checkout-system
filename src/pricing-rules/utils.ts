import { equal, greaterOrEqual, greaterThan, lesserOrEqual, lesserThan } from "./rules.symbol";

export const buildExpression = (quantity: number, rule: symbol): string => {
    switch(rule) {
        case(equal): {
            return `${quantity} ${Symbol.keyFor(rule)}`
        };
        case(greaterThan): {
            return `${quantity} ${Symbol.keyFor(lesserThan)}`;
        };
        case(greaterOrEqual): {
            return `${quantity} ${Symbol.keyFor(lesserOrEqual)}`;
        };
        case(lesserThan): {
            return `${quantity} ${Symbol.keyFor(greaterThan)}`;
        };
        case(lesserOrEqual): {
            return `${quantity} ${Symbol.keyFor(greaterOrEqual)}`;
        };
        default: {
            throw new Error('Invalid rule')
        }
    }
}