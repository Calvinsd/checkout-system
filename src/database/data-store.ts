
export interface StoreItem {
    Name: string;
    Price: number;
}


export class DataStore {

    private readonly storeItems: Record<string,StoreItem>

    constructor() {
       this.storeItems = {
        "ipd": {
            "Name": "Super iPad",
            "Price": 549.99
            },
            "mbp": {
            "Name": "MacBook Pro",
            "Price": 1399.99
            },
        "atv": {
            "Name": "Apple TV",
            "Price": 109.50
        },
        "vga": {
            "Name": "VGA adapter",
            "Price": 30.00
        },    
        }
    }

    public findItem(sku: string): StoreItem | undefined {
        return this.storeItems[sku] ? this.storeItems[sku] : undefined;
    }
}