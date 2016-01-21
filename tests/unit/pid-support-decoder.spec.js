(function () {
    'use strict';
    /*global describe, beforeEach, it, expect, inject*/
    
    describe('Pid Support Decoder factory', function() {
        
        var supportDecoder;
        
        beforeEach(module('OBD2.codes'));
        beforeEach(inject(function($injector) {
            supportDecoder = $injector.get('answerDecoder');
        }));
        
        describe('toBitmask method', function() {
            it('should convert uppercased code properly', function() {
                expect(supportDecoder.toBitmask('BE1FA813')).toEqual('10111110000111111010100000010011');
            });
            
            it('should convert lowercase code properly', function() {
                expect(supportDecoder.toBitmask('be1fa813')).toEqual('10111110000111111010100000010011');
            });
            
            it('should convert code with spaces properly', function() {
                expect(supportDecoder.toBitmask('BE 1F A8 13')).toEqual('10111110000111111010100000010011');
            });
            
            it('should convert code with EOL char at the end properly', function() {
                expect(supportDecoder.toBitmask('BE1FA813\n')).toEqual('10111110000111111010100000010011');
            });
            
            it('should throw error when input is invalid', function() {
                expect(function() { supportDecoder.toBitmask('BE1FA81') }).toThrow(new Error("Invalid input"));
            });
        });
        
        describe('parseAnswer method', function() {
            var expected = {
                    answerFor: '0100',
                    answer: 'BE1FA813'
                };
            
            it('should split uppercased answer to PID and answer code', function() {
                expect(supportDecoder.parseAnswer('0100BE1FA813')).toEqual(expected);
            });
            
            it('should split lowercased answer to PID and answer code', function() {
                expect(supportDecoder.parseAnswer('0100BE1FA813')).toEqual(expected);
            });
            
            it('should split answer with spaces to PID and answer code', function() {
                expect(supportDecoder.parseAnswer('01 00 BE 1F A8 13')).toEqual(expected);
            });
            
            it('should split answer with EOL char at the end to PID and answer code', function() {
                expect(supportDecoder.parseAnswer('0100BE1FA813\n')).toEqual(expected);
            });
            
            it('should throw error when input length is odd', function() {
                expect(function() { supportDecoder.parseAnswer('0100BE1FA81') }).toThrow(new Error("Invalid input"));
            });
            
            it('should throw error when input is too short', function() {
                expect(function() { supportDecoder.parseAnswer('0100') }).toThrow(new Error("Invalid input"));
            });
        });
    });
})();