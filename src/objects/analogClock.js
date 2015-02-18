var analogClock = cc.Sprite.extend({
    minuteTick: null,
    hourTick: null,
    hour: null,
    minute: null,
    ctor: function(){
        this._super();
        
        var clockFrame = cc.Sprite.create(res.clock);
        this.addChild(clockFrame, 0);
        
        this.minuteTick = cc.Sprite.create(res.minuteTick);
        this.minuteTick.setName("minuteTick");
        this.minuteTick.setAnchorPoint(new cc.Point(0.5,0));
        this.addChild(this.minuteTick, 0);
        
        this.hourTick = cc.Sprite.create(res.hourTick);
        this.hourTick.setName("hourTick");
        this.hourTick.setAnchorPoint(new cc.Point(0.5,0));
        this.addChild(this.hourTick, 0);
        
        cc.eventManager.addListener(this.touchHandler(), this.hourTick);
        cc.eventManager.addListener(this.touchHandler(), this.minuteTick);
        
        var draw = cc.DrawNode.create();
        this.addChild( draw, 10 );
        draw.drawCircle(cc.p(0,0), 10, 360, 20, false, 2, cc.color(59, 67, 255, 255));
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
                //TODO: Refactor !!
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
                
                // TODO: Refactor !!
                if(target.getName() === "minuteTick"){
                    that.setMinute(timeConverter.degToMinutes(angle));
                }else if(target.getName() === "hourTick"){
                    that.setHour(timeConverter.degToHours(angle));
                }
            }
        });
    }
});

mm = {
    Point: {
        diff: function(to, from){
            return {x:from.x - to.x, y:from.y -to.y};
        },
        normalize: function(point){
            var u = Math.sqrt( (point.x * point.x) + (point.y * point.y) );
            return {x:point.x/u, y:point.y/u};
        },
        angle: function(point){
            var angle = Math.atan2(point.x,point.y) * 180 / Math.PI;
            if ( angle < 0 ) angle += 360;
            return angle;
        }
    }
};