/**
 * Created by zhaojm on 15/4/13.
 */
game.StarsLevel  = cc.Class.extend({

    _levelMgr : null,


    _stars : null,  // all stars

    _light_stars : null,    //

    _spriteSheet : null,
    _layer : null,


    ctor:function(layer, spriteSheet){
        this._layer = layer;
        this._spriteSheet = spriteSheet;
    },

    levelNew : function(){
        this._stars = [];
        this._light_stars = [];
        this._initStars();

    },

    _initStars : function(){
        for(var i = 0; i < game._Config.col_num; i++){
            this._stars[i] = [];
            for(var j = 0; j < game._Config.row_num; j++){
                this._stars[i][j] = new game.Star();
                this._stars[i][j].addTolayer(this._spriteSheet, i, j);
            }

        }
    },



    onStarClicked : function(col, row){
        var self = this;
        if(col >= this._stars.length || row >= this._stars[col].length){
            return;
        }
        var start = this._stars[col][row];
        this._light_stars.push(start);
        this.checkList(0);
        if(this._light_stars.length == 1){
            //start.setLight(false);
            this._light_stars.remove(start);
            return;
        }

        this._layer._hubLayer.setTouchEnabled(false);

        var light_count = this._light_stars.length;
        // TODO 刷新level
        self._levelMgr.countStar(light_count);

        // TODO 删除 数组中的star
        this.removeLightStars(function(){
            // TODO 删除空的列
            var col = 0;
            while(col < self._stars.length) {
                var col_list = self._stars[col];    // 每一列
                if(col_list.length == 0){
                    self._stars.remove(col_list);
                }else{
                    col++;
                }
            }

            // TODO 刷新star位置
            for(var col = 0; col < self._stars.length; col++){
                var col_list = self._stars[col];    // 每一列
                //cc.log('col=', col, 'length=', col_list.length);
                for(var row = 0; row < col_list.length; row++){
                    var star = col_list[row];
                    star.moveToPos(col, row);
                }
            }

            if(self.checkOver()){
                self._levelMgr.levelOver();
            }


            // TODO 判断播放效果动画

            if(light_count <= 4){
                // nothing
                //game.CoolEffect.createCoolEffect().addToLayer(self._layer);
                //game.CoolEffect.createGoodEffect().addToLayer(self._layer);
                //game.CoolEffect.createGreatEffect().addToLayer(self._layer);
            }else if(light_count == 5){
                // cool
                game.CoolEffect.createCoolEffect().addToLayer(self._layer);
            }else if(light_count == 6){
                // good
                game.CoolEffect.createGoodEffect().addToLayer(self._layer);
            }else if(light_count > 6){
                // great
                game.CoolEffect.createGreatEffect().addToLayer(self._layer);
            }

            self._layer._hubLayer.setTouchEnabled(true);


        });

    },

    removeLightStars : function(callback){
        var self = this;
        if(self._light_stars.length > 0){
            var star = self._light_stars[0];
            star.removeFromLayer(function(){
                self._stars[star._col].remove(star);
                self._light_stars.splice(0, 1);

                self.removeLightStars(callback);
            });
        }else{
            callback();
        }
    },


    checkList :function(idx){
        // 查找周围一样的，放入列表，递归
        var current = this._light_stars[idx];
        //cc.log(current, idx, this._light_stars.length);
        var row = current._row;
        var col = current._col;

        var left = col - 1 >= 0 ? this._stars[col - 1][row] : null;
        var right = col + 1 < this._stars.length ? this._stars[col + 1][row] : null;
        var down = row - 1 >= 0 ? this._stars[col][row - 1] : null;
        var top = row + 1 < this._stars[col].length ? this._stars[col][row + 1] : null;

        var neighbours = [left, right, down, top];

        for(var i = 0; i < neighbours.length; i++){
            if(neighbours[i] != null && neighbours[i]._type == current._type && this._light_stars.indexOf(neighbours[i]) == -1){
                this._light_stars.push(neighbours[i]);
                //neighbours[i].setLight(true);
            }
        }

        idx++;
        if(idx < this._light_stars.length){
            this.checkList(idx);
        }
    },

    checkOver : function(){
        // TODO 检查相邻的是否有同类型的
        for(var col = 0; col < this._stars.length; col++){
            for(var row = 0; row < game._Config.row_num; row++){
                if(!this._stars[col][row]){
                    break;
                }
                if( this._stars[col][row + 1] && this._stars[col][row]._type == this._stars[col][row + 1]._type ){
                    return false;
                }

                if(this._stars[col + 1] && this._stars[col + 1][row] && this._stars[col][row]._type == this._stars[col + 1][row]._type){
                    return false;
                }
            }
        }

        return true;


    },

    levelOver:function(callback){
        var self = this;
        // TODO remove listener

        self.removeAllStars(callback);

    },


    removeAllStars : function(callback){
        var self = this;
        if( self._stars.length > 0){
            var col_list = self._stars[0];

            if(col_list.length > 0){
                var star = col_list[col_list.length - 1];

                star.removeFromLayer(function(){
                    self._stars[0].remove(star);
                    self.removeAllStars(callback);
                });

            }else{
                self._stars.remove(col_list);
                self.removeAllStars(callback);
            }

        }else{
            callback();
        }
    },




});