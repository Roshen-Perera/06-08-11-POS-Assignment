export default class OrderDetailModel{
    get orderId() {
        return this._orderId;
    }

    set orderId(value) {
        this._orderId = value;
    }

    get cusId() {
        return this._cusId;
    }

    set cusId(value) {
        this._cusId = value;
    }

    get cusName() {
        return this._cusName;
    }

    set cusName(value) {
        this._cusName = value;
    }

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

    get proTotal() {
        return this._proTotal;
    }

    set proTotal(value) {
        this._proTotal = value;
    }
    constructor(orderId, cusId, cusName, proId, proName, proType, proQty, proPrice, proTotal) {
        this._orderId = orderId;
        this._cusId = cusId;
        this._cusName = cusName;
        this._proId = proId;
        this._proName = proName;
        this._proType = proType;
        this._proQty = proQty;
        this._proPrice = proPrice;
        this._proTotal = proTotal;
    }
}