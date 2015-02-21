
var mainLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.winSize;
        
        var clock = new analogClock();
        clock.x = size.width/2;
        clock.y = size.height/2;
        clock.scale = 0.5;
        clock.setTime(new Date());
        this.addChild(clock);
        
        var clockD = new digitalClock();
        clockD.x = size.width/2;
        clockD.y = size.height/4;
        
        clockD.setTime(new Date());
        this.addChild(clockD);
        var that = this;
        
        var analogClockBtn = new cc.MenuItemImage(
            res.analogClockIcon,
            res.analogClockIcon,
            function () {
                that.goToGame(setAnalogGame)
            }, this);
        analogClockBtn.attr({
            x: 130 ,
            y: size.height / 2 ,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(analogClockBtn);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);
        
        return true;
    },
    goToGame: function(game){
        cc.director.runScene(new game());
    }
});

var mainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new mainLayer();
        this.addChild(layer);
    }
});