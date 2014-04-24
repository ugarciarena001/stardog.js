(function (root, factory) {
    if (typeof exports === 'object') {
        // NodeJS. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory(require('../js/stardog.js'), require('expect.js'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['stardog', 'expect'], factory);
    } else {
        // Browser globals (root is window)
        root.returnExports = factory(root.Stardog, root.expect);
    }
}(this, function (Stardog, expect) {

	// -----------------------------------
	// Describes the explain test methods
	// -----------------------------------

	describe ("Getting the query plan of a Query", function() {
		var conn;

		this.timeout(0);

		beforeEach(function() {
			conn = new Stardog.Connection();
			conn.setEndpoint("http://localhost:5820/");
			conn.setCredentials("admin", "admin");
		});

		afterEach(function() {
			conn = null;
		});

		it ("A response with the query plan should not be empty", function(done) {
			conn.onlineDB({ database: 'nodeDB' }, function (data3, response3) {
				// put online if it's not

				conn.queryExplain({ database: "nodeDB", query: "select ?s where { ?s ?p ?o } limit 10" }, function (data, response) {
					expect(data).not.to.be(undefined);
					expect(data).not.to.be(null);
					expect(data).to.be("Slice(offset=0, limit=10)\n  Projection(s)\n    Scan(subject='s', predicate='p', object='o')\n");
					done();
				});
			});
		});

	});
}));