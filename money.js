﻿// money.js
// version: 1.0.4
// author: Shengying Pan
// license: MIT
// moneyjs.shengyingpan.com
(function (Number, undefined) {

    //This is the Money Object
    var Money = function (decimal) {
        this.negative = decimal < 0 ? true : false;
        this.absolute = Math.abs(decimal);
        this.decimal = decimal;
    };

    //Languages
    var currentLanguage = "en";
    var languages = {
        "en": {
            positivePattern: "$n",
            negativePattern: "-$n",
            decimalSymbol: ".",
            decimalDigits: 2,
            groupingSymbol: ",",
            groupingDigits: 3
        },
        "en-gb": {
            positivePattern: "£n",
            negativePattern: "-£n",
            decimalSymbol: ".",
            decimalDigits: 2,
            groupingSymbol: ",",
            groupingDigits: 3
        },
        "fr": {
            positivePattern: "n €",
            negativePattern: "-n €",
            decimalSymbol: ",",
            decimalDigits: 2,
            groupingSymbol: " ",
            groupingDigits: 3
        },
        "fr-ca": {
            positivePattern: "n $",
            negativePattern: "(n $)",
            decimalSymbol: ",",
            decimalDigits: 2,
            groupingSymbol: " ",
            groupingDigits: 3
        }
    };

    var money = function (input) {
        if (input === null || input === "") {
            return null;
        }
        if (typeof input !== "number") {
            input = parseFloat(input);
        }
        return new Money(input);
    };

    //This is the money function which helps us load the localization setting
    money.lang = function (key) {
        if (!key) {
            //getting current language
            return currentLanguage;
        }

        //fall back to default, which is en
        currentLanguage = "en";

        key = key.toLowerCase();
        if (typeof languages[key] !== "undefined") {
            currentLanguage = key;
        }
        else if (key.indexOf("-") > 0) {
            var main = key.substr(0, key.indexOf("-"));
            if (typeof languages[main] !== "undefined") {
                currentLanguage = main;
            }
        }

        return currentLanguage;
    };

    Money.prototype.toString = function (x) {
        //x is the fraction digits
        var language = languages[currentLanguage];
        if (typeof x !== "number") x = language.decimalDigits;
        if (x > language.decimalDigits) {
            x = language.decimalDigits;
        }
        if (x < 0) {
            x = 0;
        }

        var integerStr = "", fractionStr = "";

        var number = this.absolute.toFixed(x);

        var integer = Math.floor(number);
        var fraction = (number - integer).toFixed(x);
        integer = integer.toString();
        fraction = fraction.toString();

        for (var i = 0; i < integer.length; i++) {
            integerStr += integer.charAt(i);
            if ((integer.length - i - 1) % language.groupingDigits == 0 && i != integer.length - 1) {
                integerStr += language.groupingSymbol;
            }
        }

        fractionStr = fraction.substr(fraction.indexOf(".") + 1); //It may possibly be extended for some irregular currency
        var numberStr = integerStr;

        if (x > 0) {
            numberStr += language.decimalSymbol + fractionStr;
        }

        if (this.negative) {
            //display according to negative pattern
            return language.negativePattern.replace(/n/g, numberStr);
        }
        else {
            //positive pattern instead
            return language.positivePattern.replace(/n/g, numberStr);
        }

    };

    //assume CommonJS
    if (typeof require !== "undefined" &&
	     typeof exports !== "undefined" &&
	     typeof module !== "undefined") {
        module.exports = money;
    }
    else {
        //to global variable
        window.money = money;
    }

    //assume global define
    if (typeof define === "function" && define.amd) {
        define("money", [], function () {
            return money;
        });
    }

})(Number);