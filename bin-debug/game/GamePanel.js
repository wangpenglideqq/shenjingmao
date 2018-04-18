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
var GamePanel = (function (_super) {
    __extends(GamePanel, _super);
    function GamePanel(sheet) {
        var _this = _super.call(this) || this;
        _this._tiles = [];
        _this._sheet = sheet;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
            _this.createMap();
            _this.randomMap();
            _this.createCat();
        }, _this);
        return _this;
    }
    GamePanel.prototype.createMap = function () {
        for (var i = 0; i < 81; i++) {
            var tile = new Tile(this._sheet);
            this.addChild(tile);
            tile.index = i;
            // tile 位置
            tile.x = Util.getPonitByIndex(i).x;
            tile.y = Util.getPonitByIndex(i).y;
            this._tiles.push(tile);
            tile.touchEnabled = true;
            tile.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTile, this);
        }
    };
    GamePanel.prototype.onClickTile = function (e) {
        var tile = e.currentTarget;
        // console.log(tile.index);
        tile.close();
        GameData.getInstance().closeTileDataByIndex(tile.index);
        GameData.step++;
        // 猫走一步
        var ret = GameData.getInstance().isHaveNextPoint();
        if (ret) {
            //更新界面
            this.updateCat();
        }
        else {
            //游戏结束
            this.gameover();
        }
    };
    /**
     * 更新猫的位置
     */
    GamePanel.prototype.updateCat = function () {
        this._cat.x = Util.getPonitByIndex(GameData.catIndex).x + 25;
        this._cat.y = Util.getPonitByIndex(GameData.catIndex).y + 25;
        this._cat.isMC1 = GameData.catIsMC1;
    };
    GamePanel.prototype.gameover = function () {
        // 加载游戏结束面板
        ViewManager.getInstance().gameover();
    };
    GamePanel.prototype.randomMap = function () {
        GameData.getInstance().initTilesData();
        GameData.getInstance().randomCloseTile();
        var datas = GameData.getInstance().tilesData;
        for (var i = 0; i < datas.length; i++) {
            if (datas[i] == false) {
                //关闭地图
                this._tiles[i].close();
            }
        }
    };
    GamePanel.prototype.createCat = function () {
        this._cat = new Cat();
        this.addChild(this._cat);
        this._cat.x = Util.getPonitByIndex(40).x + 45 / 2;
        this._cat.y = Util.getPonitByIndex(40).y + 45 / 2;
    };
    GamePanel.prototype.release = function () {
        var len = this._tiles.length;
        for (var i = 0; i < len; i++) {
            this._tiles[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTile, this);
        }
    };
    return GamePanel;
}(egret.DisplayObjectContainer));
__reflect(GamePanel.prototype, "GamePanel");
