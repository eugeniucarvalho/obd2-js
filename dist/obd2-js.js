(function() {
    'use strict';
    /*global angular*/
    
    angular.module('OBD2', [
        'OBD2.codes'
    ]);
})();
(function() {
    'use strict';
    /*global angular*/
    
    angular
        .module('OBD2.codes', []);
})();
(function() {
    'use strict';
    /*global angular*/
    
    /**
     * @memberof OBD2.codes
     * @ngdoc factory
     * @name answerDecoder
     * @desc Factory to decode information from OBD2 device.
     */
    function answerDecoderService() {
        var ERR_INVALID_INPUT = "Invalid input",
            
            WHITE_SPACES = /\s/g;
        
        /**
         * Function used for iterate over letters
         * @param {char} character - Actual character
         * @returns {char} - The next character in alphabet
         */
        function _nextChar(character) {
            return String.fromCharCode(character.charCodeAt(0) + 1);
        }
        
        /**
         * Function to convert code returned by OBD2 device to bitmask. Used to decode PIDs 0100, 0120, 0140, etc.
         * @param {string} codedValue - Coded message about PID's support
         * @returns {string} - Bitmask of supported functions
         */
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
        
        /**
         * Function to convert hexadecimal value to map of decimal values. The keys are the big letters from alphabet.
         * @param {string} codedValue - Coded value from device.
         * @returns {object} - Map of decimal values.
         */
        function toValueArray(codedValue) {
            var codedValueWithoutSpaces = codedValue.replace(WHITE_SPACES, ''),
                valueArray,
                currentIndex = 'A',
                result = {};
            if (codedValueWithoutSpaces.length % 2 !== 0) {
                throw new Error(ERR_INVALID_INPUT);
            }
            valueArray = codedValueWithoutSpaces.match(/.{1,2}/g);
            for(var index in valueArray) {
                result[currentIndex] = parseInt(valueArray[index], 16);
                currentIndex = _nextChar(currentIndex);
            }
            return result;
        }
        
        /**
         * Function to split answer into answer type and value
         * @param {string} answer - Answer with value from OBD2 device
         * @returns {object} - Object contains PID's answer information and answered value
         */
        function parseAnswer(answer) {
            var result = {},
                answerWithoutSpaces = answer.replace(WHITE_SPACES, '');
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
            parseAnswer: parseAnswer,
            toBitmask: toBitmask,
            toValueArray: toValueArray
        };
    }
    
    angular
        .module('OBD2.codes')
        .factory('answerDecoder', answerDecoderService);
})();