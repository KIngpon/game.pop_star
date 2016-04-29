/**
 * Created by zhaojm on 15/4/14.
 */
game.LevelMgr = cc.Class.extend({

    _starsLevel : null,
    _layer : null,
    _spriteSheet : null,
    _uiLayer : null,
    _hubLayer : null,


    _level : null,  // 关卡
    _score : null,  // 当前分数
    _bestScore : null,  // 最高分数
    _goalScore : null,  // 目标分数

    _hasPasslevel : null,

    _passLevelEffect : null,


    ctor:function(layer, starsLevel, uiLayer){
        this._layer = layer;

        this._uiLayer = uiLayer;

        this._starsLevel = starsLevel;
        starsLevel._levelMgr = this;



        this._level = 0;
        this._score = 0;
        this._bestScore = 0;    // 从本地存储读取
        this._goalScore = 0;
        this._hasPasslevel = false;

        this._passLevelEffect = game.PassLevelEffect.createCongratulationsEffect();

    },


    // 新的一关
    levelNew : function(){
        this._level++;
        //this._score = 0;


        var self = this;
        self._goalScore = game._Config.getGoalScoreByLevel(self._level);
        (new game.NewLavelEffect(this._level, this._goalScore)).addToLayer(this._uiLayer, function(){

            self._uiLayer.setLevel(self._level);
            self._uiLayer.setScore(self._score);
            self._uiLayer.setGoalScore(self._goalScore);
            self._uiLayer.setBestScore(self._bestScore);

            if(self._score >= self._goalScore){
                self._hasPasslevel = true;
            }else{
                self._hasPasslevel = false;
                if(self._passLevelEffect){
                    self._passLevelEffect.removeFromLayer();
                }
                self._passLevelEffect = game.PassLevelEffect.createCongratulationsEffect();
            }

            self._starsLevel.levelNew();

        });


    },

    // 积分
    countStar : function(num){
        var score = game._Config.getAddScoreByNum(num);
        this._score += score;
        this._uiLayer.setScore(this._score);

        if(!this._hasPasslevel && this._score >= this._goalScore){
            this._hasPasslevel = true;
            this._passLevelEffect.addToLayer(this._uiLayer);
        }

    },


    // 一关结束
    levelOver : function(){
        var self = this;
        this._starsLevel.levelOver(function(){
            if(self._score > self._bestScore){
                // TODO 记录最高分到本地存储
            }
            if(self._score > self._goalScore){
                // TODO 下一关
                self.levelNew();
            }else{
                // TODO gameover
                self._layer.gameOver();
            }

        });
    },



});