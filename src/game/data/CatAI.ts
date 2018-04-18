class CatAI {
	private _map:TileNode[];
	/**
	 * 是否位于出口
	 */
	public isExit(idx:number){
		//根据猫的位置 计算行列 判断行列是否位于出口
		let row:number = Util.getRowAndColByIndex(idx).x;
		let col:number = Util.getRowAndColByIndex(idx).y;
		if(row==0||row==8||col==0||col==8){
			return true;
		}else{
			return false;
		}
	}

	/**
	 * 返回下一步的index值
	 */
	public findNextPonit(){
		this.initMap();
		let nextPoint:number =  this.findPath();
		if(nextPoint == null){
			return null;
		}

		var preIndex:number;

		while(true){

			preIndex = this._map[nextPoint].preIndex;
			if( preIndex == GameData.catIndex){
				return nextPoint;
			}else{
				nextPoint = preIndex;
			}
		}
		
	}


	public getNear(){
		var round:number[] = this.findRound( GameData.catIndex);
		return round[0];
	}


	/**
	 * 为地图创建对应的节点数据
	 */
	private initMap(){
		if( this._map==null){
			this._map = [];
		}
		for(let i:number = 0; i < 81; i++){
			this._map.push(new TileNode());
		}

		for( let i:number = 0; i<81;i++){
			this._map[i].clean();
			if( GameData.getInstance().tilesData[i] == false){
				this._map[i].isUsed = true;
			}
		}
	}

	public findPath(){
			let from:number = GameData.catIndex;
			let currentNodeIndexs:number[] = [from];
			let currentNode:number;
			let rounds:number[];
			let round_len:number;
			//已经被检测的点
			let usedNodeIndex:number[] = [];
			while(true){
			if(currentNodeIndexs.length == 0){
					return null;
				}
			let newIndex:number[] = [];
			let len:number = currentNodeIndexs.length;
			for(let i:number = 0; i < len;i++){
				currentNode = currentNodeIndexs.shift();
				rounds = this.findRound(currentNode);
				round_len = rounds.length;
				for(let j:number = 0; j < round_len ; j++){
					if( usedNodeIndex.indexOf(rounds[j])>-1 || currentNodeIndexs.indexOf(rounds[j])>-1){
						continue;
					}
					//设置当前中心点的前一个中心点
					this._map[rounds[j]].preIndex = currentNode;
					if(this.isExit(rounds[j])){
						return rounds[j];
					}

					newIndex.push(rounds[j]);
				}
				usedNodeIndex.push(currentNode);
			}
			currentNodeIndexs = newIndex;

			}

	}
	/**
	 * 查找中心点周围的6个点
	 */
	public findRound(point:number){
		let arr:number[] = [];
		let row:number = Util.getRowAndColByIndex(point).x;
		let col:number = Util.getRowAndColByIndex(point).y;

		// 上
		let top = row - 1;
		if(top>=0&&this._map[Util.getIndexByRowAndCol(top,col)].isUsed==false){
			arr.push(Util.getIndexByRowAndCol(top,col));
		}
		// 下
		let bottom = row + 1;
		if(bottom<=8&&this._map[Util.getIndexByRowAndCol(bottom,col)].isUsed==false){
			arr.push(Util.getIndexByRowAndCol(bottom,col));
		}

		// 左
		let left = col - 1;
		if(left>=0 && this._map[Util.getIndexByRowAndCol(row,left)].isUsed==false){
			arr.push(Util.getIndexByRowAndCol(row,left))
		}
		// 右
		let right = col+1;
		if(right<=8 && this._map[Util.getIndexByRowAndCol(row,right)].isUsed ==false){
			arr.push(Util.getIndexByRowAndCol(row,right));
		}

		if(row%2==0){
			//偶数行
			let left = col-1; let top = row - 1;
			if( left >= 0 && top >= 0 && this._map[Util.getIndexByRowAndCol(top,left)].isUsed==false){
				arr.push(Util.getIndexByRowAndCol(top,left));
			}

			let bottom = row + 1;
			if( left >= 0 && bottom <= 8 && this._map[Util.getIndexByRowAndCol(bottom,left)].isUsed==false){
				arr.push(Util.getIndexByRowAndCol(bottom,left));
			}
		}else{
			let right = col + 1; let top = row - 1;
			if(right <= 8 && top >= 0 && this._map[Util.getIndexByRowAndCol(top,right)].isUsed==false ){
				arr.push(Util.getIndexByRowAndCol(top,right));
			}
			let bottom = row + 1;
			if(right <= 8 && bottom<=8 && this._map[Util.getIndexByRowAndCol(bottom,right)].isUsed==false ){
				arr.push(Util.getIndexByRowAndCol(bottom,right));
			}			
		}

		arr.sort();
		return arr;
	}
}


class TileNode{
	public preIndex:number;
	public isUsed:boolean;

	public clean(){
		this.preIndex = -1;
		this.isUsed = false;
	}
}