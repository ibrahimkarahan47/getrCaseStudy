const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);

const schema = {
    startDate: Joi.date().format('YYYY-MM-DD').utc().required(),
    endDate: Joi.date().format('YYYY-MM-DD').utc().required(),
    minCount: Joi.number().integer().min(0).required(),
    maxCount: Joi.number().integer().min(0).required()
};

function validateInput(body){
    return Joi.validate({
        startDate: body.startDate,
        endDate: body.endDate,
        minCount: body.minCount,
        maxCount: body.maxCount
    },schema)
 };

 function prepareRespond(minCount,maxCount,err,result){
     if(err){
         return {
             code: -1,
             msg: err.toString(),
             records: []
         };
     }
     if(isEmpty(result)){
         return {
             code: -2,
             msg: "No data available according to the given parameters.",
             records: []
         }
     }
     let records = [];
     for(let element of result){
         let calculatedCount = 0;
         for(let countElemnt of element.counts){
             calculatedCount = calculatedCount + countElemnt;
         }
         if(isBetweenMaxAndMinCount(minCount,maxCount,calculatedCount)){
             let recordsObject = {
                 key: element.key,
                 createdAt: element.createdAt,
                 totalCount: calculatedCount
             };
             records.push(recordsObject);
         }
     }
     return {
         code: 0,
         msg: "Success",
         records: records
     };
 };
 
function isEmpty(obj) {
     for(var _id in obj) {
         if(obj.hasOwnProperty(_id))
             return false;
     }
     return true;
 };
 
function isBetweenMaxAndMinCount(minCount,maxCount,calculatedCount){
     if(calculatedCount >= minCount && calculatedCount <= maxCount){
         return true;
     }
     return false;
 };
 
module.exports = {
    validateInput,
    prepareRespond
 };