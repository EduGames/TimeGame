var analogClock = cc.Sprite.extend({
    observers: [],
    minuteTickCreate: function(){
        var that = this;
        var sprite = cc.Sprite.create(res.minuteTick_main);
        sprite.setAnchorPoint(new cc.Point(0.5,0.25));
        sprite.updateTimeOnAngle = function(angle){
            that.setMinute(timeConverter.degToMinutes(angle));
        };
        sprite.enableTouch = function(enable){
            if(enable){
                cc.eventManager.addListener(that.touchHandler(), sprite);
            }else{
                cc.eventManager.removeListeners(sprite);
            }
        };
        this.minuteTick = sprite;
        return sprite;
    },
    hourTickCreate: function(){
        var that = this;
        var sprite = cc.Sprite.create(res.hourTick_main);
        sprite.setAnchorPoint(new cc.Point(0.5,0.25));
        sprite.updateTimeOnAngle = function(angle){
            that.setHour(timeConverter.degToHours(angle));
        };
        sprite.enableTouch = function(enable){
            if(enable){
                cc.eventManager.addListener(that.touchHandler(), sprite);
            }else{
                cc.eventManager.removeListeners(sprite);
            }
        };
        this.hourTick = sprite;
        return sprite;
    },
    secondTickCreate: function(){
        var that = this;
        var sprite = cc.Sprite.create(res.secondTick_main);
        sprite.setAnchorPoint(new cc.Point(0.5,0.25));
        sprite.updateTimeOnAngle = function(angle){
            that.setSecond(timeConverter.degToSeconds(angle));
        };
        this.secondTick = sprite;
        return sprite;
    },
    hour: null,
    minute: null,
    second: null,
    hourTick: null,
    minuteTick: null,
    secondTick: null,
    ctor: function(){
        this._super();
        var clockFrame = cc.Sprite.create(res.clock_main);
        this.addChild(clockFrame, 0);
        
        this.addChild(this.secondTickCreate(), 1);
        this.addChild(this.minuteTickCreate(), 1);
        this.addChild(this.hourTickCreate(), 1);
        this.setContentSize(cc.size(450,450));
        this.setAnchorPoint(cc.p(0,0));
    },
    disableSeconds: function(){
        this.secondTick.setVisible(false);
    },
    setHour: function(hour, _animate){
        this.hour = hour;
        if(_animate === true){
            var rotateTo = cc.rotateTo(0.2, timeConverter.hoursToDeg(hour))
            this.hourTick.runAction(rotateTo);
        }else{
            this.hourTick.setRotation(timeConverter.hoursToDeg(hour));
        }
    },
    setMinute: function(minute, _animate){
        this.minute = minute;
        if(_animate === true){
            var rotateTo = cc.rotateTo(0.2, timeConverter.minutesToDeg(minute))
            this.minuteTick.runAction(rotateTo)
        }else{
            this.minuteTick.setRotation(timeConverter.minutesToDeg(minute));
        }
    },
    setSecond: function(second, _animate){
        this.second = second;
        if(_animate === true){
            var rotateTo = cc.rotateTo(0.2, timeConverter.secondsToDeg(second))
            this.secondTick.runAction(rotateTo)
        }else{
            this.secondTick.setRotation(timeConverter.secondsToDeg(second));
        }
    },
    setTime: function(time, animate){
        if(typeof time === "string"){
            this.setHour(time.split(":")[0], animate);
            this.setMinute(time.split(":")[1], animate);
            this.setSecond(0, animate);
        }else if(Object.prototype.toString.call(time) === '[object Date]'){
            this.setHour(time.getHours(), animate);
            this.setMinute(time.getMinutes(), animate);
            this.setSecond(time.getSeconds(), animate);
        }
    },
    enableTouch: function(_enable){
        var enable = _enable !== false;
        this.hourTick.enableTouch(enable);
        this.minuteTick.enableTouch(enable);
    },
    touchHandler: function(){
        var that = this;
        var clicked = false;
        return cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
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
            },
            onTouchEnded: function(touch, event) {
                if(!clicked) return;
                that.broadCast(that.hour + ":" + that.minute)
            }
        });
    },
    addObserver: function(o){
        this.observers.push(o);
    },
    broadCast: function(msg){
        var o;
        for (var i = 0; i < this.observers.length; i++){
            o = this.observers[i]
            if(o.onClockChanged) o.onClockChanged(msg, this);
        }
    }
});
