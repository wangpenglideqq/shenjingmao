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
/**
 * 瓦片
 * 两种状态 灰色（open）    橘色(close)
 * 编号
 * isOpen
 * 行为 关闭
 */
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile(sheet) {
        var _this = _super.call(this) || this;
        _this._openBt = new egret.Bitmap();
        _this._openBt.texture = sheet.getTexture("pot1");
        _this.addChild(_this._openBt);
        _this._closeBt = new egret.Bitmap();
        _this._closeBt.texture = sheet.getTexture("pot2");
        _this._isOpen = true;
        return _this;
    }
    Tile.prototype.close = function () {
        if (this._isOpen) {
            this._isOpen = false;
            this.removeChild(this._openBt);
            this.addChild(this._closeBt);
        }
    };
    Object.defineProperty(Tile.prototype, "index", {
        get: function () {
            return this._index;
        },
        set: function (i) {
            this._index = i;
        },
        enumerable: true,
        configurable: true
    });
    return Tile;
}(egret.DisplayObjectContainer));
__reflect(Tile.prototype, "Tile");
