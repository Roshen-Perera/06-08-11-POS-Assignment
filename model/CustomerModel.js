class customerModel {
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

    get cusMobile() {
        return this._cusMobile;
    }

    set cusMobile(value) {
        this._cusMobile = value;
    }

    get cusAddress() {
        return this._cusAddress;
    }

    set cusAddress(value) {
        this._cusAddress = value;
    }

    constructor(cusId, cusName, cusMobile, cusAddress){
        this._cusId = cusId;
        this._cusName = cusName;
        this._cusMobile = cusMobile;
        this._cusAddress = cusAddress;
    }
}