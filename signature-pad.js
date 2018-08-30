'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
;
var SignaturePad = (function () {
    function SignaturePad(elementRef) {
        this._flgInit = false;
        // no op
        this.elementRef = elementRef;
        this.options = this.options || {};
        this.onBeginEvent = new core_1.EventEmitter();
        this.onEndEvent = new core_1.EventEmitter();
    }
    Object.defineProperty(SignaturePad.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (options) {
            this._options = options;
            if (this._flgInit) {
                this.resizeCanvas();
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    SignaturePad.prototype.ngAfterContentInit = function () {
        this.init();
    };
    SignaturePad.prototype.init = function () {
        var sp = require('signature_pad')['default'];
        var canvas = this.elementRef.nativeElement.querySelector('canvas');
        if (this.options['canvasHeight']) {
            canvas.height = this.options['canvasHeight'];
        }
        if (this.options['canvasWidth']) {
            canvas.width = this.options['canvasWidth'];
        }
        this.signaturePad = new sp(canvas, this.options);
        this.signaturePad.onBegin = this.onBegin.bind(this);
        this.signaturePad.onEnd = this.onEnd.bind(this);
        this._flgInit = true;
    };
    SignaturePad.prototype.resizeCanvas = function () {
        // When zoomed out to less than 100%, for some very strange reason,
        // some browsers report devicePixelRatio as less than 1
        // and only part of the canvas is cleared then.
        var ratio = Math.max(window.devicePixelRatio || 1, 1);
        var canvas = this.signaturePad._canvas;
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext('2d').scale(ratio, ratio);
        this.signaturePad.clear(); // otherwise isEmpty() might return incorrect value
    };
    // Returns signature image as an array of point groups
    SignaturePad.prototype.toData = function () {
        return this.signaturePad.toData();
    };
    // Draws signature image from an array of point groups
    SignaturePad.prototype.fromData = function (points) {
        this.signaturePad.fromData(points);
    };
    // Returns signature image as data URL (see https://mdn.io/todataurl for the list of possible paramters)
    SignaturePad.prototype.toDataURL = function (imageType, quality) {
        return this.signaturePad.toDataURL(imageType, quality); // save image as data URL
    };
    // Draws signature image from data URL
    SignaturePad.prototype.fromDataURL = function (dataURL, options) {
        if (options === void 0) { options = {}; }
        this.signaturePad.fromDataURL(dataURL, options);
    };
    // Clears the canvas
    SignaturePad.prototype.clear = function () {
        this.signaturePad.clear();
    };
    // Returns true if canvas is empty, otherwise returns false
    SignaturePad.prototype.isEmpty = function () {
        return this.signaturePad.isEmpty();
    };
    // Unbinds all event handlers
    SignaturePad.prototype.off = function () {
        this.signaturePad.off();
    };
    // Rebinds all event handlers
    SignaturePad.prototype.on = function () {
        this.signaturePad.on();
    };
    // set an option on the signaturePad - e.g. set('minWidth', 50);
    SignaturePad.prototype.set = function (option, value) {
        switch (option) {
            case 'canvasHeight':
                this.signaturePad._canvas.height = value;
                break;
            case 'canvasWidth':
                this.signaturePad._canvas.width = value;
                break;
            default:
                this.signaturePad[option] = value;
        }
    };
    // notify subscribers on signature begin
    SignaturePad.prototype.onBegin = function () {
        this.onBeginEvent.emit(true);
    };
    // notify subscribers on signature end
    SignaturePad.prototype.onEnd = function () {
        this.onEndEvent.emit(true);
    };
    SignaturePad.prototype.queryPad = function () {
        return this.signaturePad;
    };
    __decorate([
        core_1.Output()
    ], SignaturePad.prototype, "onBeginEvent", void 0);
    __decorate([
        core_1.Output()
    ], SignaturePad.prototype, "onEndEvent", void 0);
    __decorate([
        core_1.Input()
    ], SignaturePad.prototype, "options", null);
    SignaturePad = __decorate([
        core_1.Component({
            template: '<canvas></canvas>',
            selector: 'signature-pad',
        })
    ], SignaturePad);
    return SignaturePad;
}());
exports.SignaturePad = SignaturePad;
