var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CatAI = (function () {
    function CatAI() {
    }
    /**
     * 是否位于出口
     */
    CatAI.prototype.isExit = function (idx) {
        //根据猫的位置 计算行列 判断行列是否位于出口
        var row = Util.getRowAndColByIndex(idx).x;
        var col = Util.getRowAndColByIndex(idx).y;
        if (row == 0 || row == 8 || col == 0 || col == 8) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * 返回下一步的index值
     */
    CatAI.prototype.findNextPonit = function () {
        this.initMap();
        var nextPoint = this.findPath();
        if (nextPoint == null) {
            return null;
        }
        var preIndex;
        while (true) {
            preIndex = this._map[nextPoint].preIndex;
            if (preIndex == GameData.catIndex) {
                return nextPoint;
            }
            else {
                nextPoint = preIndex;
            }
        }
    };
    CatAI.prototype.getNear = function () {
        var round = this.findRound(GameData.catIndex);
        return round[0];
    };
    /**
     * 为地图创建对应的节点数据
     */
    CatAI.prototype.initMap = function () {
        if (this._map == null) {
            this._map = [];
        }
        for (var i = 0; i < 81; i++) {
            this._map.push(new TileNode());
        }
        for (var i = 0; i < 81; i++) {
            this._map[i].clean();
            if (GameData.getInstance().tilesData[i] == false) {
                this._map[i].isUsed = true;
            }
        }
    };
    CatAI.prototype.findPath = function () {
        var from = GameData.catIndex;
        var currentNodeIndexs = [from];
        var currentNode;
        var rounds;
        var round_len;
        //已经被检测的点
        var usedNodeIndex = [];
        while (true) {
            if (currentNodeIndexs.length == 0) {
                return null;
            }
            var newIndex = [];
            var len = currentNodeIndexs.length;
            for (var i = 0; i < len; i++) {
                currentNode = currentNodeIndexs.shift();
                rounds = this.findRound(currentNode);
                round_len = rounds.length;
                for (var j = 0; j < round_len; j++) {
                    if (usedNodeIndex.indexOf(rounds[j]) > -1 || currentNodeIndexs.indexOf(rounds[j]) > -1) {
                        continue;
                    }
                    //设置当前中心点的前一个中心点
                    this._map[rounds[j]].preIndex = currentNode;
                    if (this.isExit(rounds[j])) {
                        return rounds[j];
                    }
                    newIndex.push(rounds[j]);
                }
                usedNodeIndex.push(currentNode);
            }
            currentNodeIndexs = newIndex;
        }
    };
    /**
     * 查找中心点周围的6个点
     */
    CatAI.prototype.findRound = function (point) {
        var arr = [];
        var row = Util.getRowAndColByIndex(point).x;
        var col = Util.getRowAndColByIndex(point).y;
        // 上
        var top = row - 1;
        if (top >= 0 && this._map[Util.getIndexByRowAndCol(top, col)].isUsed == false) {
            arr.push(Util.getIndexByRowAndCol(top, col));
        }
        // 下
        var bottom = row + 1;
        if (bottom <= 8 && this._map[Util.getIndexByRowAndCol(bottom, col)].isUsed == false) {
            arr.push(Util.getIndexByRowAndCol(bottom, col));
        }
        // 左
        var left = col - 1;
        if (left >= 0 && this._map[Util.getIndexByRowAndCol(row, left)].isUsed == false) {
            arr.push(Util.getIndexByRowAndCol(row, left));
        }
        // 右
        var right = col + 1;
        if (right <= 8 && this._map[Util.getIndexByRowAndCol(row, right)].isUsed == false) {
            arr.push(Util.getIndexByRowAndCol(row, right));
        }
        if (row % 2 == 0) {
            //偶数行
            var left_1 = col - 1;
            var top_1 = row - 1;
            if (left_1 >= 0 && top_1 >= 0 && this._map[Util.getIndexByRowAndCol(top_1, left_1)].isUsed == false) {
                arr.push(Util.getIndexByRowAndCol(top_1, left_1));
            }
            var bottom_1 = row + 1;
            if (left_1 >= 0 && bottom_1 <= 8 && this._map[Util.getIndexByRowAndCol(bottom_1, left_1)].isUsed == false) {
                arr.push(Util.getIndexByRowAndCol(bottom_1, left_1));
            }
        }
        else {
            var right_1 = col + 1;
            var top_2 = row - 1;
            if (right_1 <= 8 && top_2 >= 0 && this._map[Util.getIndexByRowAndCol(top_2, right_1)].isUsed == false) {
                arr.push(Util.getIndexByRowAndCol(top_2, right_1));
            }
            var bottom_2 = row + 1;
            if (right_1 <= 8 && bottom_2 <= 8 && this._map[Util.getIndexByRowAndCol(bottom_2, right_1)].isUsed == false) {
                arr.push(Util.getIndexByRowAndCol(bottom_2, right_1));
            }
        }
        arr.sort();
        return arr;
    };
    return CatAI;
}());
__reflect(CatAI.prototype, "CatAI");
var TileNode = (function () {
    function TileNode() {
    }
    TileNode.prototype.clean = function () {
        this.preIndex = -1;
        this.isUsed = false;
    };
    return TileNode;
}());
__reflect(TileNode.prototype, "TileNode");
