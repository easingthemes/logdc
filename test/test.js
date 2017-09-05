'use strict';

const chai = require('chai'),
    expect = chai.expect,
    sinonChai = require('sinon-chai'),
    sinon = require('sinon'),
    log = require('../index');

chai.use(sinonChai);

const data = {
        foo: ['bar']
    },
    logData = ['Lorem Ipsum', data, 'Dolorem'];

describe('#logdc', function() {
    beforeEach(function() {
        sinon.spy(console, 'info');
        sinon.spy(console, 'log');
        sinon.spy(console, 'warn');
        sinon.spy(console, 'error');
    });

    afterEach(function() {
        console.info.restore();
        console.log.restore();
        console.warn.restore();
        console.error.restore();
    });

    describe('log.info', function() {
        it('should log info to console', function() {
            log.info(...logData);
            expect(console.info).to.be.called;
        });
    });

    describe('log.success', function() {
        it('should log success to console', function() {
            log.success(...logData);
            expect(console.log).to.be.called;
        });
    });

    describe('log.error', function() {
        it('should log error to console', function() {
            log.error(...logData);
            expect(console.error).to.be.called;
        });
    });

    describe('log all', function() {
        it('should log all to console', function() {
            log.log(...logData);
            log.info(...logData);
            log.warn(...logData);
            log.error(...logData);
            log.success(...logData);
            log.br();

            expect(console.info).to.be.called;
            expect(console.log).to.be.called;
            expect(console.warn).to.be.called;
            expect(console.error).to.be.called;
        });
    });
});
