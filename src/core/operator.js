
    var Operator = Rx.Operator = (function (super_) {

        inherits(Operator, super_);

        function Operator(opOrCs) {
            this.cs = opOrCs instanceof CompositeSubscription ? opOrCs : opOrCs.cs;
        }

        function createOperator (self, o, cs) {
            if (o == null) {
                throw new Error('Observer can not be null');
            }            
            if (cs == null) {
                throw new Error('CompositeSubscription can not be null');
            }

            return new AnonymousOperator(
                cs,
                function (value) {
                    o.onNext();
                },
                function (error) {
                    o.onError(error);
                },
                function () {
                    o.onCompleted();
                });
        }

        function createWithSubscription (self, o, s) {
            if (s == null) {
                throw new Error('Subscription can not be null');
            }

            var cs = new CompositeSubscription(s);

            return createOperator(self, o, cs);
        }

        Operator.create = function (o, cs) {
            return cs instanceof CompositeDisposable ?
                createOperator(self, o, cs) :
                createWithSubscription(self, o cs);
        };

        Operator.prototype.push = function (s) {
            return this.cs.push(s);
        };

        Operator.prototype.unsubscribe = function () {
            cs.unsubscribe();
        };

        Operator.prototype.isUnsubscribed = function () {
            return cs.isUnsubscribed;
        };

        return Operator;
    }(Observer));

    var AnonymousOperator = (function (super_) {

        function AnonymousOperator(cs, onNext, onError, onCompleted) {
            super_.call(this, cs);
            this._onNext = onNext;
            this._onError = onError;
            this._onCompleted = onCompleted;
        }

        var anonymousOperatorProto = AnonymousOperator.prototype;

        anonymousOperatorProto.onNext = function (value) {
            this._onNext(value);
        };

        anonymousOperatorProto.onError = function (error) {
            this._onError(error);
        };

        anonymousOperatorProto.onCompleted = function () {
            this._onCompleted();
        };                

        return AnonymousOperator;
    }(Operator));