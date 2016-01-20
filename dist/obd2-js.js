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
    
    angular
        .module('OBD2.codes')
        .factory('supportDecoder', function() {
            function test() {
                return true;
            }
            return {
                test: test
            };
        });
})();