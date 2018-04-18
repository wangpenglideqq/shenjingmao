/**
 * 瓦片
 * 两种状态 灰色（open）    橘色(close)
 * 编号
 * isOpen
 * 行为 关闭
 */
class Tile extends egret.DisplayObjectContainer{
	private _openBt:egret.Bitmap;
	private _closeBt:egret.Bitmap;
	private _index:number;
	private _isOpen:boolean;
	public constructor(sheet:egret.SpriteSheet) {
		super();
		this._openBt = new egret.Bitmap();
		this._openBt.texture = sheet.getTexture("pot1");
		this.addChild(this._openBt);

		this._closeBt = new egret.Bitmap();
		this._closeBt.texture = sheet.getTexture("pot2");

		this._isOpen = true;
	}
	public close(){
		if(this._isOpen){
			this._isOpen = false;
			this.removeChild(this._openBt);
			this.addChild( this._closeBt );
		}
	}

	public get index(){
		return this._index;
	}

	public set index(i:number){
		this._index = i;
	}
}