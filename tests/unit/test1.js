(function () {
    'use strict';
    /*global describe, beforeEach, it, expect, inject*/
    
    describe('sth', function() {
        
        var supportDecoder;
        
        beforeEach(module('OBD2.codes'));
        beforeEach(inject(function($injector) {
            supportDecoder = $injector.get('supportDecoder');
        }));
        
        it('sth', function() {
            expect(supportDecoder.test()).toEqual(true);
        })
    });
})();