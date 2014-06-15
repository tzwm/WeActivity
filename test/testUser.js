var chai = require('chai'),
	assert = chai.assert,
	expect = chai.expect,
	should = chai.should();

var request = require('superagent');
var prefix = "http://localhost:2333";

describe("User API", function () {

	describe("#register", function() {
		var response;

		before(function(done) {
			request
				.get(prefix + "/testuser")
				.end(function(res) {
					response = res;
					done();
				});
		});

		it("should response 200", function() {
			response.status.should.equal(200);
		});

		it("should response code should be 0", function() {
			content = response.body;
			content.code.should.be.equal(0);
		});

	});

	describe("#login", function() {
		
	});
});