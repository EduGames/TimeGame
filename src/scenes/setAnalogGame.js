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
    targetTime:null,
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
        
        this.resetLevel();
        
        return true;
    },
    resetLevel: function(){
        this.targetTime = this.getRandomTime()
        this.clockD.setTime(this.targetTime);
        this.clockA.setTime("12:30", true);
    },
    onClockChanged: function(msg, clock){
        console.log(msg);
        if(msg == this.targetTime){
            console.log("WON !!!")
            this.resetLevel()
        } 
    },
    getRandomTime: function(){
        var hour = Math.floor(Math.random() * (12 - 1 + 1) + 0);
        var minute = Math.floor(Math.random() * (55 - 0 + 1) + 0).FindClosestNumberThatIsDivisibleBy(5);
        return hour + ":" + minute
    }
});

var setAnalogGame = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new setAnalogGameLayer();
        this.addChild(layer);
    }
});