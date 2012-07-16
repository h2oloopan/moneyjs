// money.js
// version: 1.0.0
// author: Shengying Pan
// license: MIT
// moneyjs.shengyingpan.com

var Money = function (decimal) {
    this.negative = decimal < 0 : true : false;
    this.absolute = Math.abs(decimal);
    this.decimal = decimal;
}

var money = function (lang){
    this.lang = lang.toLowerCase();
}

var StringFunction = function (integer, fraction, isNegative, fractionDigits){
    
}

var stringFunctions = {
    //x is the number of digits after the decimal point
    "en": function (money, x) { 
        var symbol = "$";
        var result = minus ? "-" : "";
        result += symbol;
        var str = money.absolute.toFixed(x).toString();
        var length = str.indexOf(".");
        if (length < 0) length = str.length;
        var extra = str.substr(length);
        for (var i = 0; i < length; i++) {
            result += str.charAt(i);
            if ((str.length - i - 1) % 3 == 0 && i != str.length - 1) {
                result += ",";
            }
        }
        result += extra;
        return result;
    },
    "fr": function (money, x) { 
        var symbol = "€";
    }
};

Money.prototype.toString = function(x){
    //x is the number of digits after the decimal point
    x = x == null ? 0 : x; //by default, there is no fraction

    var integer = Math.round(this.absolute);
    var fraction = this.absolute - integer;

    switch(money.lang){
        case "fr":
            return stringFunctions["fr"](integer, fraction, this.negative, x);
            break;
        default:
            return stringFunctions["en"](integer, fraction, this.negative, x);
            break;
    }
}


Money.prototype.toString = function (x) {
    //x is the number of digits after the decimal point    
    //concrete display functions
    var toMoneyEn = function (m) {
        var symbol = "$";
        var minus = m < 0 ? true : false;
        m = Math.abs(m);
        var result = minus ? "-" : "";
        result += symbol;
        var str = m.toString();
        var length = str.indexOf(".");
        if (length < 0) length = str.length;
        var extra = str.substr(length);
        for (var i = 0; i < length; i++) {
            result += str.charAt(i);
            if ((str.length - i - 1) % 3 == 0 && i != str.length - 1) {
                result += ",";
            }
        }
        result += extra;
        return result;
    };
    var toMoneyFr = function (m) {
        var symbol = " €";
        var minus = m < 0 ? true : false;
        m = Math.abs(m);
        var result = minus ? "-" : "";
        var str = m.toString();
        var length = str.indexOf(".");
        if (length < 0) length = str.length;
        var extra = str.substr(length);
        for (var i = 0; i < length; i++) {
            result += str.charAt(i);
            if ((str.length - i - 1) % 3 == 0 && i != str.length - 1) {
                result += " ";
            }
        }
        result += extra;
        return result.replace(".", ",") + symbol;
    };
    x = x == null ? 0 : x;
    var money = this.decimal;
    money = parseFloat(money);
    money = money.toFixed(x);
    switch (i18n.getLanguageCode()) {
        case "fr":
            return toMoneyFr(money);
            break;
        default:
            return toMoneyEn(money);
            break;
    }
};