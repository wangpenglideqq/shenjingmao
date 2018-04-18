class GameData {
	static stageWidth:number;
	static stageHeight:number;
	static step:number = 0;
	static catIndex:number = 40;
	static catIsMC1:boolean = true;
	static isSuccess:boolean;
	private _catAI:CatAI;

	private static _shared:GameData;
	public static getInstance(){
		if( !GameData._shared ){
			GameData._shared = new GameData();
		}
		return GameData._shared;
	}
	public constructor() {
		this._catAI = new CatAI();
	}
	// 地图数据
	public tilesData:boolean[];
	public initTilesData(){
		if( this.tilesData == null){
			this.tilesData = [];
		}
		for( let i:number = 0; i < 81; i++){
			this.tilesData[i] = true;
		}
	}
	/**
	 * 随机添加地图中遮挡
	 */
	public randomCloseTile(){
		// 随机个数 (15-30)
		let cnt:number = Math.floor(Math.random()*16+15);
		// 随机位置
		for(let i:number = 0; i < cnt; i++){
			//0-80
			let index = Math.floor(Math.random()*81);
			this.tilesData[index] = false;
		}

		this.tilesData[40] = true;
	}
	/**
	 * 根据下标 关闭数据
	 */
	public closeTileDataByIndex(idx:number){
		this.tilesData[idx] = false;
	}

	/**
	 * 返回猫是否有下一步可走，有返回true 否则返回false
	 * 1、位于地图的边缘  结果 游戏以失败结束  
	 * 2、有下一步可走 
	 * 		没有被围住，最短路径的下一步   结果  下一步的坐标在哪里
	 * 		被围住，在周围找一个落脚地   
	 * 3、围住  没有下一步   结果 游戏以胜利结束
	 */
	public isHaveNextPoint():boolean{
		if( this._catAI.isExit(GameData.catIndex)){
			GameData.isSuccess = false;
			return false;
		}

		let ret = this._catAI.findNextPonit();
		if(ret == null){
			//被围住了
			GameData.catIsMC1 = false;

			GameData.catIndex = this._catAI.getNear();
			if( GameData.catIndex){
				return true;
			}

			GameData.isSuccess = true;
			return false;
		}
		
		GameData.catIndex = ret;
		return true;
	}

	public initData(){
		GameData.step = 0;
		GameData.catIndex = 40;
		GameData.catIsMC1 = true;
		GameData.isSuccess = false;
	}

}