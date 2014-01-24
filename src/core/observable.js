    
    var Observable = Rx.Observable = (function () {

        function Observable(f) {
            this.f = f;
        }

        /**
         * Bind a function to the current Observable and return a new Observable that when subscribed to will pass the values of the current Observable through the function.
         * @param binder
         * @returns {Observable} an Observable that emits values that are the result of applying the lift function to the values of the current Observable
         */
        Observable.prototype.lift = function (binder) {
            var self = this;
            return new Observable(function (o) {
                self.observe(binder(o));
            });
        };

        Observable.prototype.observe = function (o) {
            this.f(o);
        };

    }());