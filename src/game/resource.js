



var loadingRes = {
    loading_png : "res/" + game._Config.language + "/loading.png"
};

var loaderRes = {
    loader_plist : "res/" + game._Config.language + "/plist/loader.plist",
    loader_png : "res/" + game._Config.language + "/plist/loader.png",
    loader_bg_jpg : "res/" + game._Config.language + "/jpg/loader_bg.jpg",
};

var res = {
    bg_jpg : "res/common/jpg/bg.jpg",


    gameover_bg_jpg : "res/" + game._Config.language + "/jpg/gameover_bg.jpg",
    loader_bg_jpg : "res/" + game._Config.language + "/jpg/loader_bg.jpg",

    gamelayer_plist : "res/" + game._Config.language + "/plist/gamelayer.plist",
    gamelayer_png : "res/" + game._Config.language + "/plist/gamelayer.png",

    gameover_plist : "res/" + game._Config.language + "/plist/gameover.plist",
    gameover_png : "res/" + game._Config.language + "/plist/gameover.png",


};


var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}


var g_loaderResources = [];
for (var i in loaderRes) {
    g_loaderResources.push(loaderRes[i]);
}
