
var mm = mm || {};

mm.Point =  {
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
    };

