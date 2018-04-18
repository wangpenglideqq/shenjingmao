class GamePanel extends egret.DisplayObjectContainer{

	private _sheet:egret.SpriteSheet;
	private _tiles:Tile[] = [];
	private _cat:Cat;

	public constructor(sheet:egret.SpriteSheet) {
		super();
		this._sheet = sheet;
		
		this.addEventListener(egret.Event.ADDED_TO_STAGE,()=>{
				this.createMap();
				this.randomMap();
				this.createCat();
		},this);

		
	}

	private createMap(){
		for(let i:number = 0; i < 81; i++ ){
			let tile:Tile = new Tile(this._sheet);
			this.addChild(tile);
			tile.index = i;
			// tile 位置
			tile.x = Util.getPonitByIndex(i).x;
			tile.y = Util.getPonitByIndex(i).y;
			this._tiles.push(tile);

			tile.touchEnabled = true;
			tile.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickTile,this);
		}
	}

	private onClickTile(e:egret.TouchEvent){
		let tile = <Tile>e.currentTarget
		// console.log(tile.index);
		tile.close();
		GameData.getInstance().closeTileDataByIndex(tile.index);
		GameData.step++;
		// 猫走一步
		let ret:boolean = GameData.getInstance().isHaveNextPoint();
		if(ret){
			//更新界面
			this.updateCat();
		}else{
			//游戏结束
			this.gameover();
		}

	}
	/**
	 * 更新猫的位置
	 */
	private updateCat(){
		this._cat.x = Util.getPonitByIndex(GameData.catIndex).x + 25;
		this._cat.y = Util.getPonitByIndex(GameData.catIndex).y + 25;
		this._cat.isMC1 = GameData.catIsMC1;
	}
	private gameover(){
		// 加载游戏结束面板
		ViewManager.getInstance().gameover();
	}
	private randomMap(){
		GameData.getInstance().initTilesData();
		GameData.getInstance().randomCloseTile();
		let datas:boolean[] = GameData.getInstance().tilesData
		for(let i:number = 0; i < datas.length;i++){
			if(datas[i]==false){
				//关闭地图
				this._tiles[i].close();
			}
		}

	}

	private createCat(){
		this._cat = new Cat();
		this.addChild(this._cat);
		this._cat.x = Util.getPonitByIndex(40).x + 45/2;
		this._cat.y = Util.getPonitByIndex(40).y + 45/2;
	}

	public release(){
		let len = this._tiles.length;
		for(let i:number = 0; i < len;i++){
			this._tiles[i].removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickTile,this);
		}
	}
}
 
