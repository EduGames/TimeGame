var digitalClock = cc.Sprite.extend({
    hourBOne: null,
    hourBTwo: null,
    minuteBOne: null,
    minuteBTwo: null,
    createBoard: function( position){
        var that = this;
        var drawBGNode = cc.DrawNode.create();
        drawBGNode.clear();
        drawBGNode.drawRect(cc.p(0,0), cc.p(30,40), cc.color.WHITE );
        drawBGNode.setAnchorPoint(cc.p(0.5,0.5));
        drawBGNode.setContentSize(cc.size(30,40));
        drawBGNode.setPosition(position);

        var label = new cc.LabelTTF("0");
        label.setColor(cc.color.BLACK);
        label.setPosition(cc.p(drawBGNode.getContentSize().width/2,drawBGNode.getContentSize().height/2));
        drawBGNode.addChild(label);
        drawBGNode.originalPosition = position;
        
        return {
            sprite: drawBGNode,
            setText: function(text){label.setString(text);},
            enableTouch: function(enable){
                if(enable){
                    cc.eventManager.addListener(that.touchHandler(), drawBGNode);
                }else{
                    cc.eventManager.removeListeners(drawBGNode);
                }
            }
        };
    },
    ctor: function(){
        this._super();
        
        var drawBGNode = cc.DrawNode.create();
        drawBGNode.clear();
        drawBGNode.drawRect(cc.p(-150,-25), cc.p(150,25), cc.color.GRAY );
        this.addChild(drawBGNode);
        
        this.hourBOne = this.createBoard(cc.p(-100,0));
        this.hourBTwo = this.createBoard(cc.p(-50,0));
        this.minuteBOne = this.createBoard(cc.p(50,0));
        this.minuteBTwo = this.createBoard(cc.p(100,0));
        
        this.addChild(this.hourBOne.sprite);
        this.addChild(this.hourBTwo.sprite);
        this.addChild(this.minuteBOne.sprite);
        this.addChild(this.minuteBTwo.sprite);
    },
    setHour: function(hour){
        this.hour = hour;
        hour = ("0" + hour).slice(-2);
        this.hourBOne.setText(hour[0]);
        this.hourBTwo.setText(hour[1]);
    },
    setMinute: function(minute){
        this.minute = minute;
        minute = ("0" + minute).slice(-2);
        this.minuteBOne.setText(minute[0]);
        this.minuteBTwo.setText(minute[1]);
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
    enableTouch: function(_enable){
        var enable = _enable !== false;
        this.hourBOne.enableTouch(enable);
        this.hourBTwo.enableTouch(enable);
        this.minuteBOne.enableTouch(enable);
        this.minuteBTwo.enableTouch(enable);
    },
    touchHandler: function() {
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
               
                target.setPosition(that.convertToNodeSpace(touch.getLocation()));
            },
            onTouchEnded: function(touch, event) {
                if(!clicked) return;
                var target = event.getCurrentTarget();
               
                target.setPosition(target.originalPosition);
            }
        });
    }
});
