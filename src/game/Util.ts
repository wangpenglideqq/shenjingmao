class Util {
	static getPonitByIndex(idx:number){
		let row:number = Math.floor( idx/9 );
		let col:number = idx%9;
		let point:egret.Point = new egret.Point();
		let startY = 400;
		let startX = (GameData.stageWidth - 45*9)/2;
		let offX = 0;
		if(row%2!=0){
			offX = 45/2;
		}
		point.x = startX + col * 45 + offX;
		point.y = startY + row * 45;
		return point;
	}

	static getRowAndColByIndex(idx:number){
		var point:egret.Point = new egret.Point();
		point.x = Math.floor( idx/9 );
		point.y = idx % 9;
		return point;
	}

	static getIndexByRowAndCol(row,col){
		return row*9+col;
	}
}