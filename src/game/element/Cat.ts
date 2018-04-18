class Cat extends egret.DisplayObjectContainer{

	private _mc1:egret.MovieClip;
	private _mc2:egret.MovieClip;
	private _isMc1:boolean;

	public constructor() {
		super();

		let data = RES.getRes("action1_json");
		let tex = RES.getRes("action1_png");
		let mf:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,tex);
		let md:egret.MovieClipData = mf.generateMovieClipData("stay");
		this._mc1 = new egret.MovieClip(md);
		this.addChild(this._mc1);
		this._mc1.play(-1);

		data = RES.getRes("action2_json");
		tex = RES.getRes("action2_png");
		let mf2:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data,tex);
		let md2:egret.MovieClipData = mf2.generateMovieClipData("weizhu");
		this._mc2 = new egret.MovieClip(md2);
		this._mc2.play(-2);

		this._isMc1 = true;

		this.anchorOffsetX = this.width/2;
		this.anchorOffsetY = this.height;

	}

	public set isMC1(ret:boolean){
		//先移除所有的动画
		if(this.numChildren){
			this.removeChildren();
		}
		this._isMc1 = ret;
		// 根据结果 添加对应的动画
		if(ret){
			//true
			this.addChild(this._mc1);
		}else{
			// false
			this.addChild(this._mc2);
		}
	}
}