/**
 * Created by zhaojm on 15/4/5.
 */
game.GameOverLayer = cc.Layer.extend({

    _score : null,
    ctor:function(data){
        this._super();
        var self = this;

        //window.facebook = window.facebook || (window["plugin"] ? window["plugin"]["FacebookAgent"]["getInstance"]() : null);

        var background = new cc.Sprite(res.gameover_bg_jpg);
        this.addChild(background);
        //background.setAnchorPoint(cc.p(0, 0));
        background.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));


        cc.spriteFrameCache.addSpriteFrames(res.gameover_plist);
        this._spriteSheet = new cc.SpriteBatchNode(res.gameover_png);
        this.addChild(this._spriteSheet);



        var level = new cc.Sprite('#level1.png');
        level.setPosition(cc.p(cc.winSize.width * 0.5, cc.winSize.height * 0.73));
        this.addChild(level);


        this._score = cc.LabelTTF.create('', 'Arial', 24);
        this._score.setColor(new cc.Color(130, 94, 42));
        this._score.setPosition(cc.p(cc.winSize.width * 0.7, cc.winSize.height * 0.58));
        this.addChild(this._score);
        //this.numScore.setAnchorPoint(cc.p(0, 0.5));

// 最高纪录
        this.highScore = cc.LabelTTF.create('', 'Arial', 24);
        this.highScore.setColor(new cc.Color(130, 94, 42));
        this.highScore.setPosition(cc.p(cc.winSize.width * 0.7, cc.winSize.height * 0.43));
        this.addChild(this.highScore);
        //this.distance.setAnchorPoint(cc.p(0, 0.5));


        var name = 'pop_star_data';
        var temp = cc.sys.localStorage.getItem(name);
        //将字符串转化为json
        temp = JSON.parse(temp);

        cc.log('temp==', temp, 'data=', data);


        if(temp == null || temp == "" || temp == 'undefined'){
            cc.sys.localStorage.setItem(name, JSON.stringify(data));
            level.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame('level0.png'));
            // TODO 第一次
            cc.log('first time...');
            this._score.setString(data.score.toFixed(0));
            this.highScore.setString(data.score.toFixed(0));

        }else{
            cc.log('not first time');


            if(temp.score < data.score) {
                cc.sys.localStorage.setItem(name, JSON.stringify(data));
                // TODO 覆盖 最高纪录
                cc.log('big score num ');
                this._score.setString(data.score.toFixed(0));
                this.highScore.setString(data.score.toFixed(0));
                // 最高
                level.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame('level0.png'));

            }else{
                cc.log('再接再厉。。');
                level.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame('level1.png'));
                this._score.setString(data.score.toFixed(0));

                if(temp.score){
                    this.highScore.setString(temp.score.toFixed(0));
                }else{
                    this.highScore.setString(data.score.toFixed(0));
                }

            }

        }


        var shareFrame = cc.spriteFrameCache.getSpriteFrame("btn_1.png");
        var shareItem = new cc.MenuItemImage(shareFrame,shareFrame, shareFrame, function() {
            // TODO share

            cc.log('on share...');
            if (game._Config.language == game._Enum.language.cn) {
                self.addChild(new game.ShareLayer());
            }else{

                // TODO  facebook share
                //
                //var map = {
                //    "dialog": "shareLink",
                //    "name": "Cocos2d-JS web site",
                //    "caption": "Cocos2d-JS caption",
                //    "description":"Cocos2d-JS description",
                //    //"to": "100008180737293,100006738453912",
                //    //"picture": "http://files.cocos2d-x.org/images/orgsite/logo.png",
                //    "link": "http://www.cocos2d-x.org"
                //};
                //
                //if(window.facebook.canPresentDialog(map)){
                //    window.facebook.dialog(map,function(errorCode,msg){
                //        cc.log(JSON.stringify(msg));
                //    });
                //}else{
                //    map["dialog"] = "feedDialog";
                //    window.facebook.dialog(map,function(errorCode,msg){
                //        cc.log(JSON.stringify(msg));
                //    });
                //}




            }



        }, this);
        shareItem.setAnchorPoint(cc.p(1, 0.5));
        shareItem.setPosition(cc.p(cc.winSize.width * 0.5 - 4, cc.winSize.height * 0.3));



        var againFrame = cc.spriteFrameCache.getSpriteFrame("btn_0.png");
        var againItem = new cc.MenuItemImage(againFrame,againFrame, againFrame, function(){

            cc.director.runScene(new game.GameScene());

        }, this);
        againItem.setAnchorPoint(cc.p(0 ,0.5));
        againItem.setPosition(cc.p(cc.winSize.width * 0.5 + 2, cc.winSize.height * 0.3));



        var moreFrame = cc.spriteFrameCache.getSpriteFrame("www.png");
        var moreItem = new cc.MenuItemImage(moreFrame,moreFrame, moreFrame, function(){

            if(game._Config.language == game._Enum.language.en){
                window.location.href="http://ookor.com";
            }else {
                window.location.href="http://www.59600.com";
            }

        }, this);

        moreItem.setPosition(cc.p(cc.winSize.width - 20, cc.winSize.height - 20));
        moreItem.setAnchorPoint(cc.p(1,1));
        //moreitem.setScale(0.5);

        var menu = new cc.Menu(shareItem, againItem, moreItem);
        //menu.alignItemsVertically();
        this.addChild(menu);
        menu.setPosition( cc.p(0, 0));

    },








});