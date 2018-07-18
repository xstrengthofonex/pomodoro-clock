const defaultbreakValue = 5,
      defaultSessionValue = 25;

class PomodoroClock {
    constructor (breakDecrement, breakIncrement, breakLength, 
                sessionDecrement, sessionIncrement, sessionLength, 
                reset, startStop, timerLabel, timeLeft, beep){
                    
        this.state = {
            breakValue: defaultbreakValue,
            sessionValue: defaultSessionValue,
            timeInSeconds: defaultSessionValue * 60,
            timerStarted: false,
            buttonValue: "Start", 
            interval: null, 
            timeMode: "Session", 
        };

        this.breakDecrement = breakDecrement;
        this.breakIncrement = breakIncrement;
        this.breakLength = breakLength;
        this.sessionDecrement = sessionDecrement;
        this.sessionIncrement = sessionIncrement;
        this.sessionLength = sessionLength;
        this.reset = reset;
        this.startStop = startStop;
        this.timerLabel = timerLabel;
        this.timeLeft = timeLeft;
        this.beep = beep;

        this.breakDecrement.click(this.onClickBreakDecrement.bind(this));
        this.breakIncrement.click(this.onClickBreakIncrement.bind(this));
        this.sessionDecrement.click(this.onClickSessionDecrement.bind(this));
        this.sessionIncrement.click(this.onClickSessionIncrement.bind(this));
        this.reset.click(this.onClickReset.bind(this));
        this.startStop.click(this.onClickStartStop.bind(this));
    }

    setState(keyValue){
        Object.assign(this.state, keyValue);
        this.onSetState();
    }

    onSetState(){
        this.render();
    }

    onClickBreakDecrement(){
        if (this.state.breakValue > 1){
            this.setState({breakValue: this.state.breakValue -=1})
        }
    }

    onClickBreakIncrement(){
        if (this.state.breakValue < 60){
            this.setState({breakValue: this.state.breakValue +=1})
        }  
    }

    onClickSessionDecrement(){
        if (this.state.sessionValue > 1){
            this.setState({
                sessionValue: this.state.sessionValue -= 1,
                timeInSeconds: this.state.sessionValue * 60
            });
        }
    }

    onClickSessionIncrement(){
        if (this.state.sessionValue < 60){
            this.setState({
                sessionValue: this.state.sessionValue += 1,
                timeInSeconds: this.state.sessionValue * 60
            });
        }  
    }

    onClickStartStop(){
        if (!this.state.timerStarted){
            this.setState({
                buttonValue: "Stop",
                timerStarted: true,
                interval: setInterval(this.updateTime.bind(this), 1000)
            });
        } else {
            this.setState({
                buttonValue: "Start",
                timerStarted: false
            });
            clearInterval(this.state.interval);
        }
    }

    onClickReset(){
        clearInterval(this.state.interval);
        this.setState({
            breakValue: defaultbreakValue,
            sessionValue: defaultSessionValue,
            timeInSeconds: defaultSessionValue * 60,
            timerStarted: false,
            buttonValue: "Start", 
            interval: null, 
            timeMode: "Session", 
        });
    
        this.beep.pause();
        this.beep.currentTime = 0;


    }

    updateTime(){
        if (this.state.timeInSeconds > 0){
            this.setState({timeInSeconds: this.state.timeInSeconds-=1});
        } else {
            this.beep.play().catch(function(){});
            if (this.state.timeMode === "Session"){
                this.setState({
                    timeInSeconds: this.state.breakValue * 60,
                    timeMode: "Break"
                });
            } else {
                this.setState({
                    timeInSeconds: this.state.sessionValue * 60,
                    timeMode: "Session"
                }); 
            }  
        }
    }

    formatTimeMMSS(secs){
        let minutes = Math.floor((secs / 60)),
            seconds = secs - (minutes * 60);
        minutes >= 10 ? minutes : minutes = "0" + minutes;
        seconds >= 10 ? seconds : seconds = "0" + seconds;
        return minutes + ":" + seconds;
    };

    render(){
        this.breakLength.text(this.state.breakValue);
        this.sessionLength.text(this.state.sessionValue);  
        this.timeLeft.text(this.formatTimeMMSS(this.state.timeInSeconds));
        this.timerLabel.text(this.state.timeMode); 
        this.startStop.text(this.state.buttonValue);
    }
}