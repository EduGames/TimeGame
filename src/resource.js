var res = {
    bg: "res/intro_background.jpg",
    bg_analogGame: "res/bg_analogGame.jpg",
    back_btn: "res/back_btn.png",
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    clock: "res/analog_clock_frame.png",
    clock_main: "res/analog_clock_frame_1.png",
    minuteTick: "res/minute.png",
    hourTick: "res/hour.png",
    minuteTick_main: "res/minute_tick_1.png",
    hourTick_main: "res/hour_tick_1.png",
    analogClockIcon: "res/analogClockIcon.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}