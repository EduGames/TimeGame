var timeConverter = {
    hoursToDeg : function(hours){
        return hours * 30;
    },
    minutesToDeg: function(minutes){
        return minutes * 6;
    },
    degToHours: function(degs){
        return Math.floor(degs / 30);
    },
    degToMinutes: function(degs){
        return Math.floor(degs / 6);
    }
}