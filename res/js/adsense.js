///**
// * Created by zhaojm on 15/5/2.
// */
//var Ads = Ads || {};
//Ads.AdSense = /*cc.Class.extend(*/{
//    adsManager:null,
//    adsLoader:null,
//    adDisplayContainer:null,
//    intervalTimer:null,
//
//    adTagUrl:null,
//
//
//
//    linearAdSlotWidth:null,
//    linearAdSlotHeight:null,
//    nonLinearAdSlotWidth:null,
//    nonLinearAdSlotHeight:null,
//    px:null,
//    py:null,
//
//
//    videoContent:null,
//    adContainerDiv:null,
//    gameDiv:null,   // 广告 顶层
//
//    loop : null,
//
//    ctor:function(){
//
//    },
//
//    show:function(url, width, height, x, y) {
//        console.log('ads show');
//        this.adTagUrl = url;
//        this.linearAdSlotWidth = width;
//        this.linearAdSlotHeight = height;
//        this.nonLinearAdSlotWidth = width;
//        this.nonLinearAdSlotHeight = height;
//
//        this.px = x;
//        this.py = y;
//
//        this.init();
//        this.createDiv();
//
//        this.loop = window.setInterval(this.addAds.bind(this), 1000);
//        //egret.Ticker.getInstance().register(this.addAds, this, 1000);
//    },
//
//    init:function() {
//
//        window["googletag"] = window["googletag"]|| {};
//        var googletag = window["googletag"];
//        googletag.cmd = googletag.cmd || [];
//        (function() {
//            var gads = document.createElement('script');
//            gads.id = 'imaSprite';
//            gads.type = 'text/javascript';
//            gads.src = 'http://s0.2mdn.net/instream/html5/ima3.js';
//            var node = document.getElementsByTagName('script')[0];
//            node.parentNode.insertBefore(gads, node);
//
//            //console.log('node==', node);
//
//        })();
//    },
//
//
//    createDiv:function() {
//
//
//        var gameDiv = document.getElementById("gameDiv");
//        if(gameDiv) {
//            document.body.removeChild(gameDiv);
//        }
//        gameDiv = document.createElement("div");
//        gameDiv.id = "gameDiv";
//        gameDiv.style.position = 'fixed';
//        gameDiv.style.left = this.px + 'px';
//        gameDiv.style.top = this.py + 'px';
//        this.gameDiv = gameDiv;
//        document.body.appendChild(gameDiv);
//
//
//        var advertiseDiv = document.createElement("div");
//        advertiseDiv.id = "advertise";
//        gameDiv.appendChild(advertiseDiv);
//
//
//        var contentDiv = document.createElement("div");
//        advertiseDiv.appendChild(contentDiv);
//
//        this.videoContent = document.createElement("video");
//        contentDiv.appendChild(this.videoContent);
//
//
//        this.adContainerDiv = document.createElement("div");
//        this.adContainerDiv.style.left = this.px + "px";
//        this.adContainerDiv.style.top = this.py + "px";
//        advertiseDiv.appendChild(this.adContainerDiv);
//    },
//
//
//
//    addAds:function() {
//        if (window["google"]) {
//            //egret.Ticker.getInstance().unregister(this.addAds, this);
//            window.clearInterval(this.loop);
//
//            // 开始提出广告请求
//            this.requestAds();
//        }
//    },
//
//
//
//
//    requestAds:function() {
//        // 创建广告显示容器。
//        // 我们假设 adContainer 是
//        // 将要容纳广告的元素的 DOM ID。
//        //console.log('adContainerDiv=', this.adContainerDiv);
//        this.adDisplayContainer = new google.ima.AdDisplayContainer(this.adContainerDiv);
//
//        // 如果 requestAds 在用户操作过程中调用，则初始化容器。
//        // 仅在 iOS/Android 设备上需要此操作。
//        //this.adDisplayContainer.initialize();
//        // 创建广告加载器。
//        this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);
//        // 监听并响应已加载的广告和错误事件。
//        this.adsLoader.addEventListener(
//            google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
//            this.onAdsManagerLoaded.bind(this),
//            false);
//        this.adsLoader.addEventListener(
//            google.ima.AdErrorEvent.Type.AD_ERROR,
//            this.onAdError.bind(this),
//            false);
//
//        // 提出视频广告请求。
//        var adsRequest = new google.ima.AdsRequest();
//        adsRequest.adTagUrl = this.adTagUrl;
//
//        // 指定线性和非线性广告位的尺寸。如果返回多个广告，这有助于 SDK
//        // 选择正确的广告。
//        adsRequest.linearAdSlotWidth = this.linearAdSlotWidth;
//        adsRequest.linearAdSlotHeight = this.linearAdSlotHeight;
//
//        adsRequest.nonLinearAdSlotWidth = this.nonLinearAdSlotWidth;
//        adsRequest.nonLinearAdSlotHeight = this.nonLinearAdSlotHeight;
//
//        this.adsLoader.requestAds(adsRequest);
//    },
//
//
//
//    onAdsManagerLoaded:function(adsManagerLoadedEvent) {
//        // 获取广告管理器。
//        this.adsManager = adsManagerLoadedEvent.getAdsManager(
//            this.videoContent);  // 应被设置为内容视频元素
//
//        // 为所需事件添加监听器。
//        this.adsManager.addEventListener(
//            google.ima.AdErrorEvent.Type.AD_ERROR,
//            this.onAdError.bind(this)
//        );
//        this.adsManager.addEventListener(
//            google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
//            this.onContentPauseRequested.bind(this)
//        );
//        this.adsManager.addEventListener(
//            google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
//            this.onContentResumeRequested.bind(this)
//        );
//        this.adsManager.addEventListener(
//            google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
//            this.onAdEvent.bind(this)
//        );
//
//        // 如有必要，请监听其他任何事件。
//        this.adsManager.addEventListener(
//            google.ima.AdEvent.Type.LOADED,
//            this.onAdEvent.bind(this)
//        );
//        this.adsManager.addEventListener(
//            google.ima.AdEvent.Type.STARTED,
//            this.onAdEvent.bind(this)
//        );
//        this.adsManager.addEventListener(
//            google.ima.AdEvent.Type.COMPLETE,
//            this.onAdEvent.bind(this)
//        );
//
//        this.adsManager.addEventListener(
//            google.ima.AdEvent.Type.PAUSED,
//            this.onAdEvent.bind(this)
//        );
//
//        this.adsManager.addEventListener(
//            google.ima.AdEvent.Type.USER_CLOSE,
//            this.onAdUserClose.bind(this)
//        );
//
//        try {
//            // 初始化广告管理器。广告规则播放列表将在此时开始。
//            this.adsManager.init(this.linearAdSlotWidth, this.linearAdSlotHeight, google.ima.ViewMode.NORMAL);
//            // 调用播放以开始展示广告。单个视频和重叠式广告将
//            // 在此时开始；广告规则将忽略此调用。
//            this.adsManager.start();
//        } catch (adError) {
//            // 如果 VAST 响应存在问题，可能会引发错误。
//        }
//    },
//
//    onAdUserClose:function(){
//        console.log('onAdUserClose');
//        document.body.removeChild(this.gameDiv);
//    },
//
//    onAdEvent:function(adEvent) {
//        console.log('adEvent Type:::::', adEvent.type);
//        // 从事件检索广告。有些事件（例如 ALL_ADS_COMPLETED）
//        // 没有相关联的广告对象。
//        var self = this;
//        var ad = adEvent.getAd();
//        switch (adEvent.type) {
//            case google.ima.AdEvent.Type.LOADED:
//                // 这是为广告发送的第一个事件 - 可以
//                // 确定该广告是视频广告还是重叠式广告。
//                if (!ad.isLinear()) {
//                    // 准确定位重叠式广告的 AdDisplayContainer。
//                    // 使用 ad.width 和 ad.height。
//                }
//                break;
//            case google.ima.AdEvent.Type.STARTED:
//                // 此事件表示广告已启动 - 视频播放器
//                // 可以调整用户界面，例如显示暂停按钮和
//                // 剩余时间。
//                if (ad.isLinear()) {
//                    // 对于线性广告，可以启动计时器来查看
//                    // 剩余时间。
//                    this.intervalTimer = setInterval(
//                        function () {
//                            var remainingTime = self.adsManager.getRemainingTime();
//                        },
//                        300); // every 300ms
//                }
//                break;
//            case google.ima.AdEvent.Type.COMPLETE:
//                // 此事件表示广告已完成 - 视频播放器
//                // 可以执行相应的用户界面操作，例如删除
//                // 剩余时间检测的定时器。
//                if (ad.isLinear()) {
//                    clearInterval(this.intervalTimer);
//                }
//                break;
//        }
//    },
//
//
//    onAdError:function(adErrorEvent) {
//        // 处理错误日志记录。
//        console.log(adErrorEvent.getError());
//    },
//
//    onContentPauseRequested:function() {
//        this.videoContent.pause();
//        // 您应该使用此函数设置用户界面来展示广告（例如
//        // 展示广告计时器倒计时、停用搜寻等）
//        // setupUIForAds();
//    },
//
//    onContentResumeRequested:function() {
//        this.videoContent.play();
//        // 您应该使用此函数确保用户界面已准备好
//        // 播放内容。发布商负责
//        // 在必要时实施此函数。
//        // setupUIForContent();
//
//    },
//
//
//
//
//};//);
//
