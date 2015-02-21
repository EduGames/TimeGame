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
        
        this.clockA = new analogClock();
        this.clockA.x = size.width/2;
        this.clockA.y = size.height/2;
        this.clockA.scale = 0.5;
        this.clockA.addObserver(this);
        this.clockA.enableTouch();
        this.addChild(this.clockA);
        
        this.clockD = new digitalClock();
        this.clockD.x = size.width/2;
        this.clockD.y = size.height/4;
        this.addChild(this.clockD);
        
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