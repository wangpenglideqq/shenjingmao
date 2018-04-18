class StartGamePanel extends egret.DisplayObjectContainer{
	public constructor(sheet:egret.SpriteSheet) {
		super();
		let bt:egret.Bitmap = new egret.Bitmap();
		bt.texture = sheet.getTexture("btn_start");
		bt.x =( GameData.stageWidth - bt.width )/2;
		bt.y = 388;
		this.addChild(bt);

		this.touchEnabled = true;

		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickBegin,this);
	}

	private onClickBegin(){
		ViewManager.getInstance().startGame();
	}

	public release(){
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickBegin,this);
	}
}