var OriginalDate = Date,
    freezes = [];

function FrozenDate(a, b, c, d, e, f, g) {
    switch (arguments.length) {
        case 0:
            return new OriginalDate(freezes[freezes.length - 1] || OriginalDate.now());
        case 1:
            return new OriginalDate(a);
        case 2:
            return new OriginalDate(a, b);
        case 3:
            return new OriginalDate(a, b, c);
        case 4:
            return new OriginalDate(a, b, c, d);
        case 5:
            return new OriginalDate(a, b, c, d, e);
        case 6:
            return new OriginalDate(a, b, c, d, e, f);
        default:
            return new OriginalDate(a, b, c, d, e, f, g);
    }
}
FrozenDate.prototype = OriginalDate.prototype;
FrozenDate.prototype.constructor = OriginalDate;

for(var key in OriginalDate){
    FrozenDate[key] = OriginalDate[key];
}

// Non-enumerated
FrozenDate.UTC = OriginalDate.UTC;

FrozenDate.now = function(){
    return new Date().getTime();
};

FrozenDate.parse = function() {
    return new Date().getTime();
};

function freeze(date){
    freezes.push(date);
    global.Date = FrozenDate;
}

function unfreeze(){
    freezes.pop();
}

function reset(){
    global.Date = OriginalDate;
    freezes = [];
}

function set(date){
    if(!freezes.length){
        freeze();
    }

    freezes[freezes.length - 1] = date;
}

function isFrozen(){
    return freezes.length > 0;
}

module.exports = {
    set: set,
    freeze: freeze,
    unfreeze: unfreeze,
    reset: reset,
    isFrozen: isFrozen
};