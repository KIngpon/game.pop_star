/**
 * Created by zhaojm on 15/4/14.
 */
game.UILayer = cc.Layer.extend({

    _bestScoreLbl : null,
    _goalScoreLbl : null,
    _levelLbl : null,
    _scoreLbl : null,

    ctor:function(){
        this._super();
        var winSize = cc.winSize;


        var head = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('head.png'));
        this.addChild(head);
        head.setAnchorPoint(cc.p(0.5, 1));
        head.setPosition(winSize.width / 2, winSize.height);

        //var bestscore_txt = cc.LabelTTF.create('最高纪录:', 'Arial', 24);
        //bestscore_txt.setColor(new cc.Color(130, 94, 42));
        //bestscore_txt.setPosition(cc.p(winSize.width * 0, winSize.height * 0.95));
        //bestscore_txt.setAnchorPoint(cc.p(0, 0));
        //this.addChild(bestscore_txt);

        //this._bestScoreLbl = cc.LabelTTF.create('999999', 'Arial', 24);
        //this._bestScoreLbl.setColor(new cc.Color(130, 94, 42));
        //this._bestScoreLbl.setPosition(cc.p(winSize.width * 0.25, winSize.height * 0.95));
        //this._bestScoreLbl.setAnchorPoint(cc.p(0, 0));
        //this.addChild(this._bestScoreLbl);

        //var goalscore_txt = cc.LabelTTF.create('目标分数:', 'Arial', 24);
        //goalscore_txt.setColor(new cc.Color(130, 94, 42));
        //goalscore_txt.setPosition(cc.p(winSize.width * 0.5, winSize.height * 0.95));
        //goalscore_txt.setAnchorPoint(cc.p(0, 0));
        //this.addChild(goalscore_txt);

        this._goalScoreLbl = cc.LabelTTF.create('1000', 'Arial', 24);
        this._goalScoreLbl.setColor(new cc.Color(16, 240, 250));
        this._goalScoreLbl.setPosition(cc.p(winSize.width * 0.25, winSize.height - 70));
        this._goalScoreLbl.setAnchorPoint(cc.p(0, 1));
        this.addChild(this._goalScoreLbl);

        //var level_txt = cc.LabelTTF.create('关卡:', 'Arial', 24);
        //level_txt.setColor(new cc.Color(130, 94, 42));
        //level_txt.setPosition(cc.p(winSize.width * 0, winSize.height * 0.9));
        //level_txt.setAnchorPoint(cc.p(0, 0));
        //this.addChild(level_txt);

        this._levelLbl = cc.LabelTTF.create('1', 'Arial', 20);
        this._levelLbl.setColor(new cc.Color(250, 250, 250));
        this._levelLbl.setPosition(cc.p(winSize.width * 0.5, winSize.height - 33));
        this._levelLbl.setAnchorPoint(cc.p(0.5, 1));
        this.addChild(this._levelLbl);

        //var score_txt = cc.LabelTTF.create('当前分数:', 'Arial', 24);
        //score_txt.setColor(new cc.Color(130, 94, 42));
        //score_txt.setPosition(cc.p(winSize.width * 0.5, winSize.height * 0.9));
        //score_txt.setAnchorPoint(cc.p(0, 0));
        //this.addChild(score_txt);

        this._scoreLbl = cc.LabelTTF.create('0', 'Arial', 24);
        this._scoreLbl.setColor(new cc.Color(255, 249, 84));
        this._scoreLbl.setPosition(cc.p(winSize.width * 0.75, winSize.height - 70));
        this._scoreLbl.setAnchorPoint(cc.p(0, 1));
        this.addChild(this._scoreLbl);



    },

    setLevel : function(level){
        this._levelLbl.setString(level);
    },

    setScore : function(score){
        this._scoreLbl.setString(score);
    },

    setGoalScore:function(score){
        this._goalScoreLbl.setString(score);
    },
    setBestScore:function(score){
        //this._bestScoreLbl.setString(score);
    },

});