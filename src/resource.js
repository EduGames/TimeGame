var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    clock: "res/analog_clock_frame.png",
    minuteTick: "res/minute.png",
    hourTick: "res/hour.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}