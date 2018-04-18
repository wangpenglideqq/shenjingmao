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
var BackGroundPanel = (function (_super) {
    __extends(BackGroundPanel, _super);
    function BackGroundPanel(sheet) {
        var _this = _super.call(this) || this;
        var bg = new egret.Bitmap();
        bg.texture = sheet.getTexture("bg");
        _this.addChild(bg);
        bg.width = GameData.stageWidth;
        bg.height = GameData.stageHeight;
        return _this;
    }
    return BackGroundPanel;
}(egret.DisplayObjectContainer));
__reflect(BackGroundPanel.prototype, "BackGroundPanel");
