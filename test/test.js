'use strict';

const chai = require('chai'),
    expect = chai.expect,
    sinonChai = require('sinon-chai'),
    sinon = require('sinon'),
    log = require('../index')();

chai.use(sinonChai);

describe('#logdc', function() {
    beforeEach(function() {
        sinon.spy(console, 'info');
    });

    afterEach(function() {
        console.info.restore();
    });

    describe('log.info', function() {
        it('should log to console', function() {
            log.info('data');
            expect(console.info).to.be.called;
        });
    });
});
