/**
 * Created by zhaojm on 15/4/6.
 */
game.ShareLayer = cc.Layer.extend({
    ctor:function(){
        this._super();

        var size = cc.winSize;
        var share = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('share_bg.png'));
        share.setPosition(size.width / 2, size.height / 2);
        this.addChild(share);


        var goback = cc.spriteFrameCache.getSpriteFrame("share_goback.png");

        var self = this;
        var goBackItem = new cc.MenuItemImage(goback,goback, goback, function(){
            self.removeFromParent();
        }, this);

        goBackItem.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height * 0.3));
        goBackItem.setAnchorPoint(cc.p(0.5,0.5));
        //moreitem.setScale(0.5);


        var menu = new cc.Menu(goBackItem);
        //menu.alignItemsVertically();
        this.addChild(menu);
        menu.setPosition( cc.p(0, 0));


        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,// true 为不向下传递
            onTouchBegan: function(touch, event){
                var self = event.getCurrentTarget();    // 获取当前
                //self.parent._hero.jump();
                self.removeFromParent();
                return true;
            },
            //onTouchMoved: this.onTouchMoved,
            //onTouchEnded: this.onTouchEnded,
            //onTouchCancel: this.onTouchCancel
        });
        this._touchListener = listener;
        cc.eventManager.addListener(listener, this);



    },
});