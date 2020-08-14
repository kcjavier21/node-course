function log(req, res, next) {
    console.log('Logging...');
    next();
}
/*
function addNum(req, res, next) {
    console.log(2+2);
    next();
}
*/
module.exports.log = log;
//module.exports.add = addNum;