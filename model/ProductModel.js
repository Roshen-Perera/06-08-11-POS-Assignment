export default class ProductModel{
    get proId() {
        return this._proId;
    }

    set proId(value) {
        this._proId = value;
    }

    get proName() {
        return this._proName;
    }

    set proName(value) {
        this._proName = value;
    }

    get proType() {
        return this._proType;
    }

    set proType(value) {
        this._proType = value;
    }

    get proQty() {
        return this._proQty;
    }

    set proQty(value) {
        this._proQty = value;
    }

    get proPrice() {
        return this._proPrice;
    }

    set proPrice(value) {
        this._proPrice = value;
    }
    constructor(proId, proName, proType, proQty, proPrice) {
        this._proId = proId;
        this._proName = proName;
        this._proType = proType;
        this._proQty = proQty;
        this._proPrice = proPrice;
    }
}