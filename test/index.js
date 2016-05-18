var test = require('tape'),
    timefreeze = require('../'),
    testDate1 = new Date(2000,1,1),
    testDate2 = new Date(2001,1,1);

test('freeze one', function(t){
    t.plan(2);

    var a = new Date();

    timefreeze.freeze(testDate1);

    var b = new Date();

    t.equal(+b, +testDate1);
    t.notEqual(+a, +testDate1);
});

test('freeze two', function(t){
    t.plan(4);

    var a = new Date();

    timefreeze.freeze(testDate1);

    var b = new Date();

    timefreeze.freeze(testDate2);

    var c = new Date();

    timefreeze.unfreeze();

    var d = new Date();

    timefreeze.unfreeze();

    var e = new Date();

    t.equal(+b, +testDate1);
    t.equal(+c, +testDate2);
    t.equal(+d, +testDate1);
    t.ok(Math.floor(a - e) < 10);

    timefreeze.reset();

});

test('reset', function(t){
    t.plan(2);

    var a = new Date();

    timefreeze.freeze(testDate1);

    var b = new Date();

    timefreeze.reset();

    var c = new Date();

    t.equal(+b, +testDate1);
    t.ok(Math.floor(a - c) < 10);

});

test('inheritance', function(t){
    t.plan(2);

    var a = new Date();

    timefreeze.freeze(testDate1);

    var b = new Date();

    timefreeze.reset();

    t.ok(a instanceof Date);
    t.ok(b instanceof Date);
});

test('now', function(t){
    t.plan(2);

    var a = Date.now();

    timefreeze.freeze(testDate1);

    var b = Date.now();

    timefreeze.reset();

    t.ok(Math.floor(a - Date.now()) < 10);
    t.equal(b, testDate1.getTime());
});

test('set a date while frozen', function(t){
    t.plan(2);

    timefreeze.freeze(testDate1);

    var a = new Date();

    var b = new Date(testDate2);

    timefreeze.reset();

    t.equal(+a, +testDate1);
    t.equal(+b, +testDate2);
});

test('frozen dates are not the same instance', function(t){
    t.plan(1);

    timefreeze.freeze(testDate1);

    var a = new Date();
    var b = new Date();

    timefreeze.reset();

    t.notEqual(a, b);
});