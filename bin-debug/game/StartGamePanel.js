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
var StartGamePanel = (function (_super) {
    __extends(StartGamePanel, _super);
    function StartGamePanel(sheet) {
        var _this = _super.call(this) || this;
        var bt = new egret.Bitmap();
        bt.texture = sheet.getTexture("btn_start");
        bt.x = (GameData.stageWidth - bt.width) / 2;
        bt.y = 388;
        _this.addChild(bt);
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClickBegin, _this);
        return _this;
    }
    StartGamePanel.prototype.onClickBegin = function () {
        ViewManager.getInstance().startGame();
    };
    StartGamePanel.prototype.release = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBegin, this);
    };
    return StartGamePanel;
}(egret.DisplayObjectContainer));
__reflect(StartGamePanel.prototype, "StartGamePanel");
