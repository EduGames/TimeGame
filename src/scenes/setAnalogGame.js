Number.prototype.FindClosestNumberThatIsDivisibleBy = function(n) {
  return Math.round(this / n) * n; //simplify as per Guffa

  /* originally:
     var c = Math.ceil(n);
     var f = Math.floor(n);
     var m = num % n;
     var r = f * n;
     if (m > (n / 2))
       r = c * n;
     return r;
  */
};

var setAnalogGameLayer = cc.Layer.extend({
    targetTime: null,
    score: 0,
    scoreLabel: null,
    clockD: null,
    clockA: null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.winSize;
        
        var bg = new cc.Sprite.create(res.bg_analogGame);
        bg.x = size.width/2;
        bg.y = size.height/2;
        this.addChild(bg, -10);
        
        this.clockA = new analogClock();
        this.clockA.x = 610;
        this.clockA.y = 300;
        this.clockA.scale = 0.9;
        this.clockA.addObserver(this);
        this.clockA.enableTouch();
        this.clockA.disableSeconds();
        this.addChild(this.clockA);
        
        this.clockD = new digitalClock();
        this.clockD.x = 125;
        this.clockD.y = 420;
        this.addChild(this.clockD);
        
        var backBtn = new cc.MenuItemImage(
            res.back_btn,
            res.back_btn,
            function () {
                cc.director.runScene(new mainScene());
            }, this);
        backBtn.attr({
            x: 40 ,
            y: 560,
            anchor2: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(backBtn);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);
        
        this.scoreLabel = new cc.LabelTTF("0");
        this.scoreLabel.setFontSize(40)
        this.scoreLabel.setColor(cc.color.BLACK);
        this.scoreLabel.setPosition(cc.p(370,60));
        this.scoreLabel.setAnchorPoint(cc.p(0,0.5))
        this.addChild(this.scoreLabel, 10);
        
        var star = new cc.Sprite.create(res.star);
        star.x = 330;
        star.y = 60;
        this.addChild(star, 10);
        
        this.resetClock();
        
        return true;
    },
    resetClock: function(){
        this.targetTime = this.getRandomTime()
        this.clockD.setTime(this.targetTime);
        this.clockA.setTime("12:30", true);
    },
    onClockChanged: function(msg, clock){
        console.log(msg);
        if(msg == this.targetTime){
            console.log("WON !!!")
            this.addStar();
            this.resetClock()
        } 
    },
    getRandomTime: function(){
        var hour = Math.floor(Math.random() * (12 - 1 + 1) + 0);
        var minute = Math.floor(Math.random() * (55 - 0 + 1) + 0).FindClosestNumberThatIsDivisibleBy(5);
        return hour + ":" + minute
    },
    addStar: function(){
        var that = this;
        var star = new cc.Sprite.create(res.star);
        star.x = 605;
        star.y = 300;
        this.addChild(star, 10);
        
        star.runAction(cc.sequence(cc.spawn(cc.scaleTo(1,4),cc.rotateBy(1,360)),
        cc.spawn(cc.scaleTo(1,1),cc.moveTo(1,cc.p(330, 60))),
        cc.callFunc(function(){
                that.scoreLabel.setVisible(true)
                that.score++;
                that.scoreLabel.setString(that.score)
                that.removeChild(star)
            }, that)
        
        ))
        
    }
});

var setAnalogGame = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new setAnalogGameLayer();
        this.addChild(layer);
    }
});