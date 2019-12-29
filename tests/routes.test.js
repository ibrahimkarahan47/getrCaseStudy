const assert = require("assert");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();
chai.use(chaiHttp);



describe("Records", function() {
    this.timeout(10000);
    describe("Get records", function() {
        it('should return records with specified date and count range', function(done) {
            chai.request(server)
                .post("/getRecords")
                .send({
                    "startDate": "2017-01-26",
                    "endDate": "2017-02-02",
                    "minCount": 100,
                    "maxCount": 1000
                })
                .end((err, res) => {
                    if (err) done(err);
                    res.should.have.status(200);
                    done()
                })

        })
    })
});