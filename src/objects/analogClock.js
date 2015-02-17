var analogClock = cc.Sprite.extend({
    minuteTick: null,
    hourTick: null,
    ctor: function(){
        this._super();
        
        var clockFrame = cc.Sprite.create(res.clock);
        this.addChild(clockFrame, 0);
        
        this.minuteTick = cc.Sprite.create(res.minuteTick);
        this.minuteTick.setAnchorPoint(new cc.Point(0.5,0));
        this.addChild(this.minuteTick, 0);
        
        this.hourTick = cc.Sprite.create(res.hourTick);
        this.hourTick.setAnchorPoint(new cc.Point(0.5,0));
        this.addChild(this.hourTick, 0);
    },
    setHour: function(hour){
        this.hourTick.setRotation(timeConverter.hoursToDeg(hour));
    },
    setMinute: function(minute){
        this.minuteTick.setRotation(timeConverter.minutesToDeg(minute));
    }
})