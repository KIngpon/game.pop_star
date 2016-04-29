/**
 * Created by zhaojm on 15/4/13.
 */
game.Star = cc.Class.extend({
    _sprite:null,
    _row : null,    // 行
    _col : null,    // 列

    _type : null,
    _scale : null,

    _spriteSheet : null,

    _bangAction:null,

    _contentSize : null,



    ctor:function(){
        var winSize = cc.winSize;
        var self = this;

        this._type =  Math.floor(Math.random() * 5); // 0 ~ 4

        this._sprite = new cc.Sprite("#stars/" + this._type + ".png");
        //this._sprite.setAnchorPoint(cc.p(0, 0));

        var size = this._contentSize = this._sprite.getContentSize();


        var col_width = winSize.width / game._Config.col_num;

        this._scale =  col_width / size.width;

        this._sprite.setScale(this._scale);


        this._bangAction = new cc.Animate(
            new cc.Animation([0, 1, 2, 3].map(function (i) {
                return cc.spriteFrameCache.getSpriteFrame("bang/" + self._type + i + ".png");
            }), 0.1)
        );


    },

    addTolayer : function(spriteSheet, col, row){
        this._spriteSheet = spriteSheet;
        this._col = col;
        this._row = row;
        var size = this._sprite.getContentSize();
        var winSize = cc.winSize;

        var win_row = (winSize.height / (this._scale * size.height)).toFixed(0);
        this._row += win_row - 1;
        //cc.log((winSize.height / (this._scale * size.height)).toFixed(0));
        var start_pos = cc.p(
            size.width * this._col * this._scale + this._contentSize.width * this._scale * 0.5,
            size.height * this._row * this._scale + this._contentSize.height * this._scale * 0.5 + game._Config.bottomHeight
        );
        this._sprite.setPosition(start_pos);

        this._spriteSheet.addChild(this._sprite);


        this.moveToPos(col, row);
    },

    removeFromLayer : function(callback){
        var self = this
        //cc.log('remove from layer...');
        this._sprite.runAction(new cc.Spawn(
            new cc.Sequence(
                this._bangAction,
                new cc.CallFunc(function(){
                    self._sprite.removeFromParent();
                })
            ),
            new cc.Sequence(
                new cc.DelayTime(0.1),
                new cc.CallFunc(callback)
            )
        ));
    },

    moveToPos : function(col, row){
        var duration = (this._row - row) * 0.1;

        this._col = col;
        this._row = row;

        var size = this._sprite.getContentSize();
        var x = size.width * this._col * this._scale + this._contentSize.width * 0.5 * this._scale;
        var y = size.height * this._row * this._scale + this._contentSize.height * 0.5 * this._scale + game._Config.bottomHeight;
        var pos = cc.p( x, y);



        this._sprite.runAction(
            new cc.MoveTo(duration, pos).easing(cc.easeBackIn())
        );

    },


    setLight : function(b){
        if(b){
            // TODO light star
            //this._sprite.setBlendFunc(gl.SRC_ALPHA, gl.ONE);   // 颜色混合
            //var shaky3D = new cc.Shaky3D(15, new cc.Size(15, 10), 4, false);
            //this._sprite.runAction(new cc.RepeatForever(new cc.RotateBy(1, 10)));
            var blink = new cc.Blink(1, 3);
            this._sprite.runAction(new cc.RepeatForever(blink));
        }else{
            // TODO un light star
            //this._sprite.setBlendFunc(gl.SRC_COLOR, gl.ONE);   // 颜色混合
            this._sprite.stopAllActions();
            this._sprite.setVisible(true);
        }
    },

});