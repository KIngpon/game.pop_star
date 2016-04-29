/**
 * Created by zhaojm on 15/4/17.
 */

game.GameOverEffect = cc.Class.extend({
    _levelLbl : null,
    _layer : null,
    ctor:function(level){
        var winSize = cc.winSize;
        if(game._Config.language == game._Enum.language.cn){
            this._levelLbl = cc.LabelTTF.create('游戏结束', 'Arial', 48);
        }else{
            this._levelLbl = cc.LabelTTF.create('Game Over', 'Arial', 48);
        }

        //this._levelLbl.setColor(new cc.Color(255, 249, 84));
        this._levelLbl.setPosition(cc.p(winSize.width + this._levelLbl.getContentSize().width, winSize.height * 0.5));
        this._levelLbl.setAnchorPoint(cc.p(0.5, 0.5));
        //this.addChild(this._scoreLbl);
    },

    addToLayer : function(layer, callback){
        var winSize = cc.winSize;
        var self = this;
        this._layer = layer;
        layer.addChild(this._levelLbl);

        var contentSize = this._levelLbl.getContentSize();

        var self = this;
        this._levelLbl.runAction(new cc.Sequence(
            new cc.MoveTo(0.3, cc.p(winSize.width / 2, winSize.height / 2)).easing(cc.easeBackOut()),
            new cc.DelayTime(0.3),
            new cc.FadeTo(0.3, 0),
            new cc.CallFunc(function(){
                self.removeFromLayer();
                callback();
            })
        ));
    },

    removeFromLayer : function(){
        this._levelLbl.removeFromParent();
    },



});

