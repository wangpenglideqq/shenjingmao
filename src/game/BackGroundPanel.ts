class BackGroundPanel extends egret.DisplayObjectContainer{
	public constructor(sheet:egret.SpriteSheet) {
		super();
		let bg:egret.Bitmap = new egret.Bitmap();
		
		bg.texture = sheet.getTexture("bg");
		this.addChild(bg);
		bg.width = GameData.stageWidth;
		bg.height = GameData.stageHeight;

	}
}