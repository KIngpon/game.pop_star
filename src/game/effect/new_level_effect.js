/**
 * Created by zhaojm on 15/4/17.
 */

game.NewLavelEffect = cc.Class.extend({
    _levelLbl : null,
    _levelLbl2 : null,
    _layer : null,
    ctor:function(level, goal){
        var winSize = cc.winSize;
        if(game._Config.language == game._Enum.language.cn){
            this._levelLbl = cc.LabelTTF.create('关卡 '+level, 'Arial', 48);
        }else{
            this._levelLbl = cc.LabelTTF.create('Level '+level, 'Arial', 48);
        }

        //this._levelLbl.setColor(new cc.Color(255, 249, 84));
        this._levelLbl.setPosition(cc.p(winSize.width + this._levelLbl.getContentSize().width, winSize.height * 0.6));
        this._levelLbl.setAnchorPoint(cc.p(0.5, 0.5));
        //this.addChild(this._scoreLbl);

        if(game._Config.language == game._Enum.language.cn){

            this._goalLbl2 = new cc.LabelTTF('目标分数: ' + goal, 'Arial', 32);
        }else{

            this._goalLbl2 = new cc.LabelTTF('Goal: ' + goal, 'Arial', 32);
        }
        this._goalLbl2.setPosition(cc.p(winSize.width + this._goalLbl2.getContentSize().width, winSize.height * 0.4));
        this._goalLbl2.setAnchorPoint(cc.p(0.5, 0.5));

    },

    addToLayer : function(layer, callback){
        var winSize = cc.winSize;
        var self = this;
        this._layer = layer;
        layer.addChild(this._levelLbl);
        layer.addChild(this._goalLbl2);

        this._levelLbl.runAction(new cc.Sequence(
            new cc.MoveTo(0.3, cc.p(winSize.width * 0.5, winSize.height * 0.6)).easing(cc.easeBackOut()),
            new cc.CallFunc(function(){
                self._goalLbl2.runAction(new cc.Sequence(
                    new cc.MoveTo(0.3, cc.p(winSize.width * 0.5, winSize.height * 0.4)).easing(cc.easeBackOut()),
                    new cc.DelayTime(0.3),
                    new cc.FadeTo(0.3, 0),
                    new cc.CallFunc(function(){
                        self.removeFromLayer();
                        callback();
                    })
                ));
            }),
            new cc.DelayTime(0.6),
            new cc.FadeTo(0.3, 0)
        ));
    },

    removeFromLayer : function(){
        this._levelLbl.removeFromParent();
        this._goalLbl2.removeFromParent();
    },



});

