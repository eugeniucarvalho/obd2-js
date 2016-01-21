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
            var expectedValue = '10111110000111111010100000010011';
            it('should convert uppercased code properly', function() {
                expect(supportDecoder.toBitmask('BE1FA813')).toEqual(expectedValue);
            });
            
            it('should convert lowercase code properly', function() {
                expect(supportDecoder.toBitmask('be1fa813')).toEqual(expectedValue);
            });
            
            it('should convert code with spaces properly', function() {
                expect(supportDecoder.toBitmask('BE 1F A8 13')).toEqual(expectedValue);
            });
            
            it('should convert code with EOL char at the end properly', function() {
                expect(supportDecoder.toBitmask('BE1FA813\n')).toEqual(expectedValue);
            });
            
            it('should throw error when input\'s length is odd', function() {
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
            
            it('should throw error when input\'s length is odd', function() {
                expect(function() { supportDecoder.parseAnswer('0100BE1FA81') }).toThrow(new Error("Invalid input"));
            });
            
            it('should throw error when input is too short', function() {
                expect(function() { supportDecoder.parseAnswer('0100') }).toThrow(new Error("Invalid input"));
            });
        });
        
        describe('toValueArray method', function() {
            var expectedValue = { 'A': 255, 'B': 240, 'C': 10, 'D': 16, 'E': 32, 'F': 20 };
            
            it('should split uppercased answer to map of values', function() {
                var expectedOneItem = { 'A': 255 },
                    expectedTwoItems = { 'A': 255, 'B': 240 },
                    expectedThreeItems = { 'A': 255, 'B': 240, 'C': 10},
                    expectedFourItems = { 'A': 255, 'B': 240, 'C': 10, 'D': 16 },
                    expectedFiveItems = { 'A': 255, 'B': 240, 'C': 10, 'D': 16, 'E': 32 },
                    expectedSixItems = { 'A': 255, 'B': 240, 'C': 10, 'D': 16, 'E': 32, 'F': 20 };
                expect(supportDecoder.toValueArray('FF')).toEqual(expectedOneItem);
                expect(supportDecoder.toValueArray('FFF0')).toEqual(expectedTwoItems);
                expect(supportDecoder.toValueArray('FFF00A')).toEqual(expectedThreeItems);
                expect(supportDecoder.toValueArray('FFF00A10')).toEqual(expectedFourItems);
                expect(supportDecoder.toValueArray('FFF00A1020')).toEqual(expectedFiveItems);
                expect(supportDecoder.toValueArray('FFF00A102014')).toEqual(expectedSixItems);
            });
            
            it('should split lowercased answer to map of values', function() {
                expect(supportDecoder.toValueArray('fff00a102014')).toEqual(expectedValue);
            });
            
            it('should split answer with spaces to map of values', function() {
                expect(supportDecoder.toValueArray('FF F0 0A 10 20 14')).toEqual(expectedValue);
            });
            
            it('should split answer with EOL character at the end to map of values', function() {
                expect(supportDecoder.toValueArray('FFF00A102014\n')).toEqual(expectedValue);
            });
            
            it('should throw error when input\'s length is odd', function() {
                expect(supportDecoder.toValueArray('FFF00A102014\n')).toEqual(expectedValue);
            });
        });
    });
})();