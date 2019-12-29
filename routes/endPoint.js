const express = require("express");
const router = express.Router();
const Record = require("../model/record");
const endPointHelper = require("../routes/endPointHelper");

router.post('/getRecords',(request,respond) => {
    const result = endPointHelper.validateInput(request.body);
    if(result.error){
        respond.status(400).send(result.error.details[0].message);
        return;
    }

    Record.find({
        createdAt: {
          '$gte': request.body.startDate,
          '$lte': request.body.endDate
        }
      },
        function (err, result) {
            respond.status(200).send(endPointHelper.prepareRespond(request.body.minCount,request.body.maxCount,err,result)); 
        });

});

module.exports = router;