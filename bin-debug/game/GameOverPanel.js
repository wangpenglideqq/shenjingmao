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
var GameOverPanel = (function (_super) {
    __extends(GameOverPanel, _super);
    function GameOverPanel(sheet) {
        var _this = _super.call(this) || this;
        _this._successBt = new egret.Bitmap();
        _this._successBt.texture = sheet.getTexture("victory");
        _this._successBt.x = (GameData.stageWidth - _this._successBt.width) / 2;
        _this._successBt.y = 400;
        _this.addChild(_this._successBt);
        _this._successBt.visible = false;
        _this._failBt = new egret.Bitmap();
        _this._failBt.texture = sheet.getTexture("failed");
        _this._failBt.x = (GameData.stageWidth - _this._failBt.width) / 2;
        _this._failBt.y = 400;
        _this.addChild(_this._failBt);
        _this._failBt.visible = false;
        _this._gameText = new egret.TextField();
        _this.addChild(_this._gameText);
        _this._gameText.size = 24;
        _this._gameText.textColor = 0xff0000;
        _this._gameText.width = _this._successBt.width - 100;
        _this._gameText.textAlign = egret.HorizontalAlign.CENTER;
        _this._gameText.x = (GameData.stageWidth - _this._successBt.width) / 2 + 30;
        _this._gameText.y = 600;
        _this._moreBtn = new egret.Bitmap();
        _this._moreBtn.texture = sheet.getTexture("replay");
        _this.addChild(_this._moreBtn);
        _this._moreBtn.x = (GameData.stageWidth - _this._moreBtn.width) / 2;
        _this._moreBtn.y = 800;
        _this._moreBtn.touchEnabled = true;
        _this._moreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onRestart, _this);
        return _this;
    }
    GameOverPanel.prototype.showGameoverPanel = function (ret) {
        if (ret) {
            this._successBt.visible = true;
            this._failBt.visible = false;
            // this.addChild(this._successBt);
            // this.addChild(this._gameText);
            this._gameText.text = "\u771F\u5389\u5BB3\uFF0C\u4F60\u7528" + GameData.step + "\u6B65\u6349\u4F4F\u4E86\u795E\u7ECF\u732B\uFF0C\u62EF\u6551\u4E86\u94F6\u884C\u7CFB\uFF01";
        }
        else {
            this._successBt.visible = false;
            this._failBt.visible = true;
            // this.addChild(this._failBt);
            // this.addChild(this._gameText);
            this._gameText.text = "\u4F60\u7ADF\u7136\u8BA9\u795E\u7ECF\u732B\u9003\u8DD1\u4E86\uFF01\u592A\u83DC\u4E86\uFF01";
        }
    };
    GameOverPanel.prototype.onRestart = function () {
        ViewManager.getInstance().restartGame();
    };
    GameOverPanel.prototype.release = function () {
        this._moreBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this);
    };
    return GameOverPanel;
}(egret.DisplayObjectContainer));
__reflect(GameOverPanel.prototype, "GameOverPanel");
