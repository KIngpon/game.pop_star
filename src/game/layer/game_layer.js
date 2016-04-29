/**
 * Created by zhaojm on 15/4/1.
 */
game.GameLayer = cc.Layer.extend({

    _levelMgr : null,
    _starsLevel : null,

    _uiLayer : null,
    _hubLayer : null,

    _spriteSheet : null,

    ctor:function(){
        this._super();
        var winSize = cc.winSize;

        var background = new cc.Sprite(res.bg_jpg);
        this.addChild(background);
        background.setPosition(winSize.width / 2, 0);
        background.setAnchorPoint(cc.p(0.5, 0));

        cc.spriteFrameCache.addSpriteFrames(res.gamelayer_plist);
        this._spriteSheet = new cc.SpriteBatchNode(res.gamelayer_png);
        this.addChild(this._spriteSheet);

        this._uiLayer = new game.UILayer();
        this.addChild(this._uiLayer);

        this._hubLayer = new game.HubLayer();
        this.addChild(this._hubLayer);

        this._starsLevel = new game.StarsLevel(this, this._spriteSheet);

        this._levelMgr = new game.LevelMgr(this, this._starsLevel, this._uiLayer);

        this._levelMgr.levelNew();






    },


    gameOver : function(){
        cc.log('gameover...');
        var self = this;
        (new game.GameOverEffect()).addToLayer(this._uiLayer, function(){
            var scene = new game.GameOverScene();
            scene.setData({
               score :  self._levelMgr._score
            });
            cc.director.runScene(scene);
        });
    },







});