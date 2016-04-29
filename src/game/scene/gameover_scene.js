/**
 * Created by zhaojm on 15/4/5.
 */
game.GameOverScene = cc.Scene.extend({
    _data:null,
    onEnter:function(){
        this._super();

        if(game._Config.show_ads && game._Config.language == game._Enum.language.en) {
            Ads.fullViewAds(function(){
                //clearInterval(timer);
                //runScene();
            });
        }


        var layer = new game.GameOverLayer(this._data);
        this.addChild(layer);
    },

    setData : function(data){
        this._data = data;
    },
});