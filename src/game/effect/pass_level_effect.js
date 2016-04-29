/**
 * Created by zhaojm on 15/4/17.
 */
game.PassLevelEffect = cc.Class.extend({
    _sprite : null,
    _layer : null,
    ctor:function(name){
        var winSize = cc.winSize;
        this._sprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(name));
        this._sprite.setPosition(winSize.width / 2, winSize.height / 2);
        this._sprite.setScale(0);
    },

    addToLayer : function(layer){
        //cc.log('add to layer');
        var winSize = cc.winSize;
        var self = this;
        this._layer = layer;
        layer.addChild(this._sprite);

        var contentSize = this._sprite.getContentSize();


        if(game._Config.language == game._Enum.language.cn){
            var lastScale = 0.3;
            var interval_width = 10;
            var interval_height = 0;
        }else{
            var lastScale = 0.4;
            var interval_width = 20;
            var interval_height = -20;
        }



        this._sprite.runAction(new cc.Sequence(
            new cc.ScaleTo(0.3, 1.0).easing(cc.easeBackOut()),
            new cc.DelayTime(0.5),
            new cc.Spawn(
                new cc.ScaleTo(0.3, lastScale),
                new cc.MoveTo(0.3, cc.p(winSize.width - contentSize.width * lastScale * 0.5 + interval_width, winSize.height - contentSize.height * 0.7 * 0.5 + interval_height)),
                new cc.RotateBy(0.3, 45)
            )
        ));
    },

    removeFromLayer : function(){
        //cc.log('remove fromlayer');
        this._sprite.removeFromParent();
    },



});


game.PassLevelEffect.createCongratulationsEffect = function(){
    return new game.PassLevelEffect('congratulations.png');
};