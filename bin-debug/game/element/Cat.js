var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Cat = (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        var _this = _super.call(this) || this;
        var data = RES.getRes("action1_json");
        var tex = RES.getRes("action1_png");
        var mf = new egret.MovieClipDataFactory(data, tex);
        var md = mf.generateMovieClipData("stay");
        _this._mc1 = new egret.MovieClip(md);
        _this.addChild(_this._mc1);
        _this._mc1.play(-1);
        data = RES.getRes("action2_json");
        tex = RES.getRes("action2_png");
        var mf2 = new egret.MovieClipDataFactory(data, tex);
        var md2 = mf2.generateMovieClipData("weizhu");
        _this._mc2 = new egret.MovieClip(md2);
        _this._mc2.play(-2);
        _this._isMc1 = true;
        _this.anchorOffsetX = _this.width / 2;
        _this.anchorOffsetY = _this.height;
        return _this;
    }
    Object.defineProperty(Cat.prototype, "isMC1", {
        set: function (ret) {
            //先移除所有的动画
            if (this.numChildren) {
                this.removeChildren();
            }
            this._isMc1 = ret;
            // 根据结果 添加对应的动画
            if (ret) {
                //true
                this.addChild(this._mc1);
            }
            else {
                // false
                this.addChild(this._mc2);
            }
        },
        enumerable: true,
        configurable: true
    });
    return Cat;
}(egret.DisplayObjectContainer));
__reflect(Cat.prototype, "Cat");
