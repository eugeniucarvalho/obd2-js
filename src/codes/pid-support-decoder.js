(function() {
    'use strict';
    /*global angular*/
    
    angular
        .module('OBD2.codes')
        .factory('answerDecoder', function() {
            var ERR_INVALID_INPUT = "Invalid input",
                
                WHITE_SPACES = /\s/g;
            
            function toBitmask(codedValue) {
                var codedValueWithoutSpaces = codedValue.replace(WHITE_SPACES, ''),
                    valueArray,
                    result = "";
                if (codedValueWithoutSpaces.length % 2 !== 0) {
                    throw new Error(ERR_INVALID_INPUT);
                }
                valueArray = codedValueWithoutSpaces.match(/.{1,2}/g);
                for(var index = 0; index < valueArray.length; index++) {
                    var binaryRepresentation = parseInt(valueArray[index], 16).toString(2);
                    while(binaryRepresentation.length < 8) {
                        binaryRepresentation = '0' + binaryRepresentation;
                    }
                    result += binaryRepresentation;
                }
                return result;
            }
            
            function parseAnswer(answer) {
                var result = {},
                    answerWithoutSpaces = answer.replace(WHITE_SPACES, '');
                    console.log(answerWithoutSpaces.length <= 4);
                if(answerWithoutSpaces.length <= 4 || answerWithoutSpaces.length % 2 !== 0) {
                    throw new Error(ERR_INVALID_INPUT);
                }
                result = {
                    answerFor: answerWithoutSpaces.substring(0,4),
                    answer: answerWithoutSpaces.substring(4)
                }
                return result;
            }
            return {
                toBitmask: toBitmask,
                parseAnswer: parseAnswer
            };
        });
})();