$(document).ready(function(){
    let pomodoroClock = new PomodoroClock(
        $("#break-decrement"), 
        $("#break-increment"),
        $("#break-length"),
        $("#session-decrement"),
        $("#session-increment"),
        $("#session-length"),
        $("#reset"),
        $("#start_stop"),
        $("#timer-label"),
        $("#time-left"),
        $("#beep")[0]
    );
    pomodoroClock.render();
});