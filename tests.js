var money = require('./money');

exports.testDisplayDefaultLocale = function (test) {
    //the default locale should be en
    
    var input = 19283.234;
    var output = money(input).toString();

    test.equal(output, '$19,283.23', 'Should be well formatted based on English locale');
    test.done();
};

exports.testDisplayCanadianFrenchLocale = function (test) {
    money.lang('fr-ca');

    var input = 19283.234;
    var output = money(input).toString();

    test.equal(output, '19 283,23 $', 'Should be well formatted based on en-ca locale');
    test.done();
};

exports.testParseEnglishLocale = function (test) {
    money.lang('en');
    var input = '234,230.22';
    var output = money.parse(input).toDecimal();

    test.equal(output, 234230.22, 'The converted number should match');
    test.done();
};
