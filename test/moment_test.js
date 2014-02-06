var expect = require('chai').expect;

var moment = require('moment');

describe('moment', function(){
    var format = 'YYYY-MM-DDTHH:mm:ssZZ';
    var m;

    beforeEach(function(){
	m = moment('2014-01-31T11:02:00+0100', format);
    })


    describe('parsing', function(){
	it('should parse strings', function(){
	    expect(m).to.be.exist;
	});
    });

    describe('querying', function(){
	it('should determine a date is after other', function(){
	    [
		moment('2014-01-31T11:02:01+0100', format),
		moment('2014-01-31T11:03:00+0100', format),
		moment('2014-01-31T12:02:00+0100', format),
		moment('2014-02-01T11:02:00+0100', format),
		moment('2015-01-31T11:02:00+0100', format),
	    ].forEach(function(laterMoment){
		expect(m.isBefore(laterMoment)).to.be.true;
	    });

	});

	describe('formatting', function(){
	    it('should format a moment', function(){
		expect(m.format('HH:mm')).to.equal('11:02');
	    });
	});
    });
});
