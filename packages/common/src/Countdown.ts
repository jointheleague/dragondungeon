import { Schema, type } from "@colyseus/schema";

export class Countdown extends Schema {

	@type("number")
	pastTime: number = 0;

	@type("number")
	seconds: number = 0;

	@type("number")
	minutes: number = 0;

	@type("boolean")
	done: boolean = false;

	constructor(minutes: number, seconds: number) {
		super()
		this.seconds = seconds;
		this.minutes = minutes;
		this.pastTime = Date.now();
		this.done = false;
	}

	elaspseTime(){
		var newTime = Date.now();
		this.subtractTime(newTime - this.pastTime);
		this.pastTime = newTime;
	}

	subtractTime(milliseconds: number){
		this.seconds -= milliseconds/1000;
		if(this.seconds <= 0){
			if(this.minutes > 0){
				this.minutes --;
				this.seconds += 60;
			}else{	
				this.done = true;
			}
		}
	}

}