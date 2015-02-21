var analogClock = cc.Sprite.extend({
    minuteTickCreate: function(){
        var that = this;
        var sprite = cc.Sprite.create(res.minuteTick);
        sprite.setAnchorPoint(new cc.Point(0.5,0));
        sprite.updateTimeOnAngle = function(angle){
            that.setMinute(timeConverter.degToMinutes(angle));
        };
        cc.eventManager.addListener(this.touchHandler(), sprite);
        this.minuteTick = sprite;
        return sprite;
    },
    hourTickCreate: function(){
        var that = this;
        var sprite = cc.Sprite.create(res.hourTick);
        sprite.setAnchorPoint(new cc.Point(0.5,0));
        sprite.updateTimeOnAngle = function(angle){
            that.setHour(timeConverter.degToHours(angle));
        };
        cc.eventManager.addListener(this.touchHandler(), sprite);
        this.hourTick = sprite;
        return sprite;
    },
    hour: null,
    minute: null,
    hourTick: null,
    minuteTick: null,
    ctor: function(){
        this._super();
        var clockFrame = cc.Sprite.create(res.clock);
        this.addChild(clockFrame, 0);
        
        this.addChild(this.minuteTickCreate(), 1);
        this.addChild(this.hourTickCreate(), 1);
    },
    setHour: function(hour){
        this.hour = hour;
        this.hourTick.setRotation(timeConverter.hoursToDeg(hour));
    },
    setMinute: function(minute){
        this.minute = minute;
        this.minuteTick.setRotation(timeConverter.minutesToDeg(minute));
    },
    setTime: function(time){
        if(typeof time === "string"){
            this.setHour(time.split(":")[0]);
            this.setMinute(time.split(":")[1]);
        }else if(Object.prototype.toString.call(time) === '[object Date]'){
            this.setHour(time.getHours());
            this.setMinute(time.getMinutes());
        }
    },
    touchHandler: function(){
        var that = this;
        var clicked = false;
        return cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function (touch, event) {
                // event.getCurrentTarget() returns the *listener's* sceneGraphPriority node.
                var target = event.getCurrentTarget();

                //Get the position of the current point relative to the button
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                //Check the click area
                if (cc.rectContainsPoint(rect, locationInNode)) {
                    clicked = true;
                    return true;
                }
                return false;
            },
            onTouchMoved: function(touch, event) {
                if(!clicked) return;
                var target = event.getCurrentTarget();
                
                var arrow = mm.Point.diff(that.getPosition(), touch.getLocation());
                var angle = mm.Point.angle(arrow);
               
                target.updateTimeOnAngle(angle);
            }
        });
    }
});
