export default class CustomerModel {
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

    get cusAddress() {
        return this._cusAddress;
    }

    set cusAddress(value) {
        this._cusAddress = value;
    }

    get cusMobile() {
        return this._cusMobile;
    }

    set cusMobile(value) {
        this._cusMobile = value;
    }
    constructor(cusId, cusName, cusAddress, cusMobile) {
        this._cusId = cusId;
        this._cusName = cusName;
        this._cusAddress = cusAddress;
        this._cusMobile = cusMobile;
    }
}