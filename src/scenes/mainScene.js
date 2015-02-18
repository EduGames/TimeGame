
var mainLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.winSize;
        
        var clock = new analogClock();
        clock.x = size.width/2
        clock.y = size.height/2
        clock.scale = 0.5
        
        clock.setTime(new Date());
        this.addChild(clock);
        
        return true;
    }
});

var mainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new mainLayer();
        this.addChild(layer);
    }
});