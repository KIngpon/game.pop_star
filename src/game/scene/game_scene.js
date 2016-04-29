/**
 * Created by zhaojm on 15/4/1.
 */
game.GameScene = cc.Scene.extend({

    _gameLayer : null,



    onEnter : function(){
        this._super();
        this._gameLayer = new game.GameLayer();
        this.addChild(this._gameLayer);
    },

    onExit:function(){
        this._super();
    },




});



game.GameScene.create = function(){
    return new game.GameScene();
};