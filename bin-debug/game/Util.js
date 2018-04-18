var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Util = (function () {
    function Util() {
    }
    Util.getPonitByIndex = function (idx) {
        var row = Math.floor(idx / 9);
        var col = idx % 9;
        var point = new egret.Point();
        var startY = 400;
        var startX = (GameData.stageWidth - 45 * 9) / 2;
        var offX = 0;
        if (row % 2 != 0) {
            offX = 45 / 2;
        }
        point.x = startX + col * 45 + offX;
        point.y = startY + row * 45;
        return point;
    };
    Util.getRowAndColByIndex = function (idx) {
        var point = new egret.Point();
        point.x = Math.floor(idx / 9);
        point.y = idx % 9;
        return point;
    };
    Util.getIndexByRowAndCol = function (row, col) {
        return row * 9 + col;
    };
    return Util;
}());
__reflect(Util.prototype, "Util");
