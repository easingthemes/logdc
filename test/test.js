'use strict';

const chai = require('chai'),
    expect = chai.expect,
    sinonChai = require('sinon-chai'),
    sinon = require('sinon'),
    log = require('../index')(),
    log2 = require('../index')({}, false, false, 2),
    log3 = require('../index')({
        foo: 'green'
    }, true, false, 3),
    log4 = require('../index')({}, true, false, 4),
    log5 = require('../index')({}, true, true, 2),
    log6 = require('../index')(false, true, false, 2);

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
            log.success('Lorem Ipsum', data, 'Dolorem');
            expect(console.log).to.be.called;
        });
    });

    describe('log.error', function() {
        it('should log error to console', function() {
            const data = {
                foo: ['bar']
            };
            log.error('Lorem Ipsum', data, 'Dolorem');
            expect(console.error).to.be.called;
        });
    });

    describe('log.log', function() {
        it('should log to console', function() {
            const data = {
                foo: ['bar']
            };
            log.log('Lorem Ipsum', data, 'Dolorem');
            log.info('Lorem Ipsum', data, 'Dolorem');
            log.warn('Lorem Ipsum', data, 'Dolorem');
            log.error('Lorem Ipsum', data, 'Dolorem');
            log.success('Lorem Ipsum', data, 'Dolorem');
            log.br();
            log2.log('Lorem Ipsum', data, 'Dolorem');
            log2.info('Lorem Ipsum', data, 'Dolorem');
            log2.warn('Lorem Ipsum', data, 'Dolorem');
            log2.error('Lorem Ipsum', data, 'Dolorem');
            log2.success('Lorem Ipsum', data, 'Dolorem');
            log.br();
            log6.log('Lorem Ipsum', data, 'Dolorem');
            log6.info('Lorem Ipsum', data, 'Dolorem');
            log6.warn('Lorem Ipsum', data, 'Dolorem');
            log6.error('Lorem Ipsum', data, 'Dolorem');
            log6.success('Lorem Ipsum', data, 'Dolorem');
            log.br();
            log4.log('Lorem Ipsum', data, 'Dolorem');
            log4.info('Lorem Ipsum', data, 'Dolorem');
            log4.warn('Lorem Ipsum', data, 'Dolorem');
            log4.error('Lorem Ipsum', data, 'Dolorem');
            log4.success('Lorem Ipsum', data, 'Dolorem');
            log.br();
            log5.log('Lorem Ipsum', data, 'Dolorem');
            log5.info('Lorem Ipsum', data, 'Dolorem');
            log5.warn('Lorem Ipsum', data, 'Dolorem');
            log5.error('Lorem Ipsum', data, 'Dolorem');
            log5.success('Lorem Ipsum', data, 'Dolorem');
            log.br();
            log3.foo('Lorem Ipsum', data, 'Dolorem');
            expect(console.info).to.be.called;
        });
    });
});
