/**
 * Created by zhaojm on 15/3/21.
 */
game.MyLoaderLayer = cc.LayerColor.extend({

    _loadingBar : null,
    _label : null,
    _spriteSheet : null,

    _startItem : null,

    ctor:function(){
        this._super(new cc.Color(43, 43, 43));

        var self = this;

        var bg = new cc.Sprite(loaderRes.loader_bg_jpg);
        bg.setPosition(cc.p(cc.winSize.width * 0.5, cc.winSize.height * 0.5));
        //this._spriteSheet.addChild(bg);
        this.addChild(bg);

        cc.spriteFrameCache.addSpriteFrames(loaderRes.loader_plist);
        this._spriteSheet = new cc.SpriteBatchNode(loaderRes.loader_png);
        this.addChild(this._spriteSheet);



        var load_bar_bg = new cc.Sprite('#bar_bg.png');
        this._spriteSheet.addChild(load_bar_bg);
        load_bar_bg.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height * 0.15));


        this._loadingBar = new cc.Sprite('#bar_front.png');
        this._spriteSheet.addChild(this._loadingBar);
        this._loadingBar.setAnchorPoint(cc.p(0, 0.5));
        this._loadingBar.setPosition(cc.p(cc.winSize.width / 2 - this._loadingBar.getContentSize().width / 2, cc.winSize.height * 0.15));
        this._loadingBar.setScaleX(0);



        var startFrame = cc.spriteFrameCache.getSpriteFrame('btn_start.png');
        this._startItem = new cc.MenuItemImage(startFrame, startFrame, startFrame,  function(){

            //game.init();
            cc.director.runScene(new game.GameScene());


        }, this);
        this._startItem.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.3);
        //this._startitem.setVisible(false);
        this._startItem.runAction(new cc.FadeOut(0.1));


        var moreFrame = cc.spriteFrameCache.getSpriteFrame("www.png");
        var moreItem = new cc.MenuItemImage(moreFrame, moreFrame, moreFrame, function(){

            window.location.href="http://mingz.me";

        }, this);
        moreItem.setPosition(cc.p(cc.winSize.width - 20, cc.winSize.height - 20));
        moreItem.setAnchorPoint(cc.p(1,1));

        var menu = new cc.Menu();
        menu.addChild(this._startItem);
        menu.addChild(moreItem);
        this.addChild(menu);
        menu.setPosition(0, 0);


        cc.loader.load(g_resources,
            function (result, count, loadedCount) {
                var percent = (loadedCount / count * 100) | 0;
                percent = Math.min(percent, 100);
                //self._label.setString(percent + "%");
                //self.loadingBar.setPercentage(percent * 100);
                self._loadingBar.setScaleX(percent / 100);


            }, function () {

                self._loadingBar.setScaleX( 1);

                self._startItem.runAction(new cc.FadeIn(2));

            });
    },


});