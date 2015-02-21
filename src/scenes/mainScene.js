
var mainLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.winSize;
        
        var bg = new cc.Sprite.create(res.bg);
        bg.x = size.width/2;
        bg.y = size.height/2;
        this.addChild(bg, -10);
        
        var clock = new analogClock();
        clock.x = size.width/2 - 0;
        clock.y = size.height/2 + 120;
        clock.scale = 0.5;
        clock.setTime(new Date());
        this.addChild(clock);
        
        var clockD = new digitalClock();
        clockD.x = 170;
        clockD.y = 520;
        
        clockD.setTime(new Date());
        this.addChild(clockD);
        var that = this;
        
        var analogClockBtn = new cc.MenuItemImage(
            res.analogClockIcon,
            res.analogClockIcon,
            function () {
                that.goToGame(setAnalogGame)
            }, this);
        analogClockBtn.setRotation(11)
        analogClockBtn.attr({
            x: 792 ,
            y: 205,
            anchor2: 0.5,
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