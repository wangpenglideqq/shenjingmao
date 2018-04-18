class GameOverPanel extends egret.DisplayObjectContainer{
	private _successBt:egret.Bitmap;
	private _failBt:egret.Bitmap;
	private _gameText:egret.TextField;
	private _moreBtn:egret.Bitmap;

	public constructor(sheet:egret.SpriteSheet) {
		super();
		this._successBt = new egret.Bitmap();
		this._successBt.texture = sheet.getTexture("victory");
		this._successBt.x = (GameData.stageWidth - this._successBt.width)/2;
		this._successBt.y = 400;
		this.addChild( this._successBt);
		this._successBt.visible = false;

		this._failBt = new egret.Bitmap();
		this._failBt.texture = sheet.getTexture("failed");
		this._failBt.x = (GameData.stageWidth - this._failBt.width)/2;
		this._failBt.y = 400;
		this.addChild( this._failBt);
		this._failBt.visible = false;

		this._gameText = new egret.TextField();
		this.addChild(this._gameText);
		this._gameText.size = 24;
		this._gameText.textColor = 0xff0000;
		this._gameText.width = this._successBt.width-100;
		this._gameText.textAlign = egret.HorizontalAlign.CENTER;
		this._gameText.x = (GameData.stageWidth-this._successBt.width)/2+30;
		this._gameText.y = 600;

		this._moreBtn = new egret.Bitmap();
		this._moreBtn.texture = sheet.getTexture("replay");
		this.addChild( this._moreBtn );

		this._moreBtn.x = (GameData.stageWidth - this._moreBtn.width)/2;
		this._moreBtn.y = 800;
		this._moreBtn.touchEnabled = true;
		this._moreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRestart,this);
	}

	public showGameoverPanel(ret:boolean){
		if(ret){
			this._successBt.visible = true;
			this._failBt.visible = false;
			// this.addChild(this._successBt);
			// this.addChild(this._gameText);
			this._gameText.text = `真厉害，你用${GameData.step}步捉住了神经猫，拯救了银行系！`;
		}else{
			this._successBt.visible = false;
			this._failBt.visible = true;
			// this.addChild(this._failBt);
			// this.addChild(this._gameText);
			this._gameText.text = `你竟然让神经猫逃跑了！太菜了！`;

		}
	}
	private onRestart(){
		ViewManager.getInstance().restartGame();
	}

	public release(){
		this._moreBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onRestart,this);
	}
}