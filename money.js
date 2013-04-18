// money.js
// version: 1.1.0
// author: Shengying Pan
// license: MIT
(function (undefined) {

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
            symbol: "$",
            positivePattern: "$n",
            negativePattern: "-$n",
            decimalSymbol: ".",
            decimalDigits: 2,
            groupingSymbol: ",",
            groupingDigits: 3
        },
        "en-gb": {
            symbol: "£",
            positivePattern: "£n",
            negativePattern: "-£n",
            decimalSymbol: ".",
            decimalDigits: 2,
            groupingSymbol: ",",
            groupingDigits: 3
        },
        "fr": {
            symbol: "€",
            positivePattern: "n €",
            negativePattern: "-n €",
            decimalSymbol: ",",
            decimalDigits: 2,
            groupingSymbol: " ",
            groupingDigits: 3
        },
        "fr-ca": {
            symbol: "$",
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
            return new Money(0);
        }
        if (typeof input !== "number") {
            input = parseFloat(input);
        }
        return new Money(input);
    };

    //parsing function
    //will return null if input cannot be parsed
    //it's very basic will not enforce some special cases, e.g. grouping symbol at wrong position
    money.parse = function (input) {
        if (input == null) return null;
        var language = languages[currentLanguage];
        //trim
        input = input.toString().replace(/^\s\s*/, "").replace(/\s\s*$/, "");
        //convert it back to default English culture
        regGroupingSymbol = new RegExp(language.groupingSymbol, "g");
        input = input.toString().replace(language.symbol, "").replace(regGroupingSymbol, "");
        if (language.symbol != "." && input.indexOf(".") >= 0) return null;
        input = input.replace(language.decimalSymbol, ".");
        //not a number
        if (!(/^\d+\.?\d*$/).test(input)) return null;
        decimal = parseFloat(input);
        if (isNaN(decimal)) return null;
        return new Money(decimal);
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

    Money.prototype.toDecimal = function () {
        return this.decimal;
    };

    Money.prototype.toString = function (x) {
	//-1 is a special one display up to decimal number fraction, but hide trailing 0s
	var flexible = false;
	if (x == -1) {
	    flexible = true;
	}	

        //x is the fraction digits
        var language = languages[currentLanguage];
        if (typeof x !== "number") x = language.decimalDigits;
        if (x > language.decimalDigits) {
            x = language.decimalDigits;
        }
        if (x < 0) {
            x = language.decimalDigits;
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
	    if (fractionStr.length > 0 && flexible) {
            while (fractionStr[fractionStr.length - 1] == "0") {
                fractionStr = fractionStr.substr(0, fractionStr.length - 1);
            }
        }

        var numberStr = integerStr;

        if (x > 0) {
            numberStr += (fractionStr.length > 0 ? language.decimalSymbol : "") + fractionStr;
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

    //Expose
    if (typeof require !== "undefined" && typeof exports !== "undefined" && typeof module !== "undefined") {
        module.exports = money;
    }

    if (typeof ender === "undefined") {
        this["money"] = money;
    }

    if (typeof define === "function" && define.amd) {
        define("money", [], function () {
            return money;
        });
    }
}).call(this);
