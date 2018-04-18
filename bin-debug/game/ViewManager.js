var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 视图管理类
 * 管理游戏中所有的视图
 */
var ViewManager = (function () {
    function ViewManager() {
    }
    ViewManager.getInstance = function () {
        if (!ViewManager._shared) {
            ViewManager._shared = new ViewManager();
        }
        return ViewManager._shared;
    };
    ViewManager.prototype.initView = function (main) {
        this._rootView = main;
        this._sheet = RES.getRes("gameres_json");
        this._bgPanel = new BackGroundPanel(this._sheet);
        this._rootView.addChild(this._bgPanel);
        this._startPanel = new StartGamePanel(this._sheet);
        this._gamePanel = new GamePanel(this._sheet);
        this._gameoverPanel = new GameOverPanel(this._sheet);
    };
    ViewManager.prototype.showStart = function () {
        this._rootView.addChild(this._startPanel);
    };
    /**
     * 游戏开始
     */
    ViewManager.prototype.startGame = function () {
        if (this._startPanel.parent) {
            this._startPanel.release();
            // 开始面板移除
            this._rootView.removeChild(this._startPanel);
            this._startPanel = null;
            // 游戏面板添加
            this._rootView.addChild(this._gamePanel);
        }
    };
    /**
     * 游戏结束
     */
    ViewManager.prototype.gameover = function () {
        this._gameoverPanel.showGameoverPanel(GameData.isSuccess);
        this._rootView.addChild(this._gameoverPanel);
    };
    ViewManager.prototype.restartGame = function () {
        if (this._gameoverPanel.parent) {
            this._gamePanel.release();
            this._rootView.removeChild(this._gameoverPanel);
            this._rootView.removeChild(this._gamePanel);
            this._gamePanel = null;
            this._gamePanel = new GamePanel(this._sheet);
            this._rootView.addChild(this._gamePanel);
            GameData.getInstance().initData();
        }
    };
    return ViewManager;
}());
__reflect(ViewManager.prototype, "ViewManager");
