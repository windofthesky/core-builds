/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var exceptions_1 = require('../facade/exceptions');
var lang_1 = require('../facade/lang');
/**
 * @experimental Animation support is experimental.
 */
var AnimationPlayer = (function () {
    function AnimationPlayer() {
    }
    Object.defineProperty(AnimationPlayer.prototype, "parentPlayer", {
        get: function () { throw new exceptions_1.BaseException('NOT IMPLEMENTED: Base Class'); },
        set: function (player) {
            throw new exceptions_1.BaseException('NOT IMPLEMENTED: Base Class');
        },
        enumerable: true,
        configurable: true
    });
    return AnimationPlayer;
}());
exports.AnimationPlayer = AnimationPlayer;
var NoOpAnimationPlayer = (function () {
    function NoOpAnimationPlayer() {
        var _this = this;
        this._onDoneFns = [];
        this._onStartFns = [];
        this._started = false;
        this.parentPlayer = null;
        lang_1.scheduleMicroTask(function () { return _this._onFinish(); });
    }
    /** @internal */
    NoOpAnimationPlayer.prototype._onFinish = function () {
        this._onDoneFns.forEach(function (fn) { return fn(); });
        this._onDoneFns = [];
    };
    NoOpAnimationPlayer.prototype.onStart = function (fn) { this._onStartFns.push(fn); };
    NoOpAnimationPlayer.prototype.onDone = function (fn) { this._onDoneFns.push(fn); };
    NoOpAnimationPlayer.prototype.hasStarted = function () { return this._started; };
    NoOpAnimationPlayer.prototype.init = function () { };
    NoOpAnimationPlayer.prototype.play = function () {
        if (!this.hasStarted()) {
            this._onStartFns.forEach(function (fn) { return fn(); });
            this._onStartFns = [];
        }
        this._started = true;
    };
    NoOpAnimationPlayer.prototype.pause = function () { };
    NoOpAnimationPlayer.prototype.restart = function () { };
    NoOpAnimationPlayer.prototype.finish = function () { this._onFinish(); };
    NoOpAnimationPlayer.prototype.destroy = function () { };
    NoOpAnimationPlayer.prototype.reset = function () { };
    NoOpAnimationPlayer.prototype.setPosition = function (p /** TODO #9100 */) { };
    NoOpAnimationPlayer.prototype.getPosition = function () { return 0; };
    return NoOpAnimationPlayer;
}());
exports.NoOpAnimationPlayer = NoOpAnimationPlayer;
//# sourceMappingURL=animation_player.js.map