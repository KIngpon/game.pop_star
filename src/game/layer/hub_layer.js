/**
 * Created by zhaojm on 15/4/17.
 */
game.HubLayer = cc.Layer.extend({
    _touchListener : null,
    ctor:function(){
        this._super();
        var self = this;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,// true 为不向下传递
            onTouchBegan: function(touch, event){
                var pos = touch.getLocationInView();
                var col_width = cc.winSize.width / game._Config.col_num;
                var row_height = col_width;

                var col = Math.floor(pos.x / col_width);
                var row = Math.floor((pos.y - game._Config.bottomHeight) / row_height);

                //cc.log(pos, col, row, game._Config.col_num, game._Config.row_num);

                if(col >= 0 && col < game._Config.col_num && row >= 0 && row < game._Config.row_num){

                    //cc.log("start ", col, row);
                    self._parent._starsLevel.onStarClicked(col, row);

                }




                return true;
            },
        });
        this._touchListener = listener;

        this.setTouchEnabled(true);
    },

    setTouchEnabled:function(b){
        cc.eventManager.removeListener(this._touchListener);
        if(b){
            cc.eventManager.addListener(this._touchListener, this);
        }

    },
});