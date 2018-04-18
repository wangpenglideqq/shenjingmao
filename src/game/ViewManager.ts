/**
 * 视图管理类
 * 管理游戏中所有的视图
 */
class ViewManager {
	

	private static _shared:ViewManager;
	public static getInstance(){
		if(!ViewManager._shared){
			ViewManager._shared = new ViewManager();
		}
		return ViewManager._shared;
	}
	// 背景面板
	private _bgPanel:BackGroundPanel;
	// 开始游戏面板
	private _startPanel:StartGamePanel;
	// 游戏面板
	private _gamePanel:GamePanel;
	// 结束面板
	private _gameoverPanel:GameOverPanel;

	private _rootView:egret.DisplayObjectContainer;
	private _sheet:egret.SpriteSheet;

	public constructor() {
	
	}

	public initView(main:egret.DisplayObjectContainer){
		this._rootView = main;
		this._sheet = RES.getRes("gameres_json");

		this._bgPanel = new BackGroundPanel(this._sheet);
		this._rootView.addChild(this._bgPanel);

		this._startPanel = new StartGamePanel(this._sheet);

		this._gamePanel = new GamePanel(this._sheet);

		this._gameoverPanel = new GameOverPanel(this._sheet);

	}

	public showStart(){
		this._rootView.addChild( this._startPanel );
		
	}

	
	/**
	 * 游戏开始
	 */
	public startGame(){
		if( this._startPanel.parent){
			
			this._startPanel.release();
			// 开始面板移除
			this._rootView.removeChild( this._startPanel );
			this._startPanel = null;

			// 游戏面板添加
			this._rootView.addChild( this._gamePanel );
		}
	}
	/**
	 * 游戏结束
	 */

	public gameover(){

		this._gameoverPanel.showGameoverPanel(GameData.isSuccess);

		this._rootView.addChild(this._gameoverPanel);
	}

	public restartGame(){
		if( this._gameoverPanel.parent ){
			this._gamePanel.release();
			this._rootView.removeChild( this._gameoverPanel );
			this._rootView.removeChild(this._gamePanel);
			this._gamePanel = null;
			this._gamePanel = new GamePanel(this._sheet);
			this._rootView.addChild(this._gamePanel);
			GameData.getInstance().initData();
		}
	}
}