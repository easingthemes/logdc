'use strict';

const chai = require('chai'),
    expect = chai.expect,
    sinonChai = require('sinon-chai'),
    sinon = require('sinon'),
    log = require('../index')({}, true, false, 2),
    logSuccess = require('../index')({}, true, false, 2),
    logError = require('../index')({}, true, false, 2);

chai.use(sinonChai);

describe('#logdc', function() {
    beforeEach(function() {
        sinon.spy(console, 'info');
        sinon.spy(console, 'log');
        sinon.spy(console, 'error');
    });

    afterEach(function() {
        console.info.restore();
        console.log.restore();
        console.error.restore();
    });

    describe('log.info', function() {
        it('should log info to console', function() {
            const data = {
                foo: ['bar']
            };
            log.info('Lorem Ipsum', data, 'Dolorem');
            expect(console.info).to.be.called;
        });
    });

    describe('log.success', function() {
        it('should log to console', function() {
            const data = {
                foo: ['bar']
            };
            logSuccess.success('Lorem Ipsum', data, 'Dolorem');
            expect(console.log).to.be.called;
        });
    });

    describe('log.error', function() {
        it('should log error to console', function() {
            const data = {
                foo: ['bar']
            };
            logError.error('Lorem Ipsum', data, 'Dolorem');
            expect(console.error).to.be.called;
        });
    });
});
