
var mainLayer = cc.Layer.extend({
    clockA:null,
    clockD:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.winSize;
        
        var bg = new cc.Sprite.create(res.bg);
        bg.x = size.width/2;
        bg.y = size.height/2;
        this.addChild(bg, -10);
        
        this.clockA = new analogClock();
        this.clockA.x = size.width/2 - 0;
        this.clockA.y = size.height/2 + 120;
        this.clockA.scale = 0.5;
        this.clockA.setTime(new Date());
        this.addChild(this.clockA);
        
        this.clockD = new digitalClock();
        this.clockD.x = 170;
        this.clockD.y = 520;
        
        this.clockD.setTime(new Date());
        this.addChild(this.clockD);
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
        
        this.scheduleUpdate();
        return true;
    },
    goToGame: function(game){
        cc.director.runScene(new game());
    },
    update: function(dt){
        this.clockA.setTime(new Date());
        this.clockD.setTime(new Date());
    }
});

var mainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new mainLayer();
        this.addChild(layer);
    }
});