/**
 * Created by zhaojm on 15/4/17.
 */
game.CoolEffect = cc.Class.extend({
    _sprite : null,
    _layer : null,
    ctor:function(name){
        var winSize = cc.winSize;
        this._sprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(name));
        this._sprite.setPosition(winSize.width / 2, winSize.height / 2);
        this._sprite.setScale(0);
    },

    addToLayer : function(layer){
        this._layer = layer;
        layer.addChild(this._sprite);

        var self = this;
        this._sprite.runAction(new cc.Sequence(
            new cc.ScaleTo(0.3, 1).easing(cc.easeBackOut()),
            new cc.DelayTime(0.5),
            new cc.CallFunc(function(){
                self._sprite.removeFromParent();
            })
        ));
    },

    removeFromLayer : function(){
        this._sprite.removeFromParent();
    },



});

game.CoolEffect.createCoolEffect = function(){
    return new game.CoolEffect('cool.png');
};
game.CoolEffect.createGoodEffect = function(){
    return new game.CoolEffect('good.png');
};
game.CoolEffect.createGreatEffect = function(){
    return new game.CoolEffect('great.png');
};