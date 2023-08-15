'use strict';

const Homey = require('homey');

class MyApp extends Homey.App {

  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.everyHour();
    this.everyDay();
    this.log('MyApp has been initialized');
  }

  async onUninit() {
		this.log('App onUninit called');
		this.homey.removeAllListeners('everyhour');
	}

  everyHour() {
    const now = new Date();
    const nextHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0, 0, 50);
    const timeToNextHour = nextHour - now;
    this.homey.setTimeout(() => {
      this.homey.setInterval(async () => {
        this.homey.emit('everyhour', true);
      }, 60 * 60 * 1000);
      // }, 5000);
      this.homey.emit('everyhour', true);
    }, timeToNextHour);
    //}, 5000);
    this.log('everyHour job started');
  }

  everyDay() {
    // Pull everday between 14-15
    const now = new Date();
    const tomorrow = new Date();
    if (tomorrow.getHours() > 14){
      tomorrow.setDate(now.getDate() + 1);
    }
    tomorrow.setHours(14);
    const timeToNextDay = tomorrow - now;
    this.homey.setTimeout(() => {
      this.homey.setInterval(async () => {
        this.homey.emit('everyday', true);
      }, 24 * 60 * 60 * 1000);
      this.homey.emit('everyday', true);
    }, timeToNextDay);
    this.log('everyDay job started');
  }

}

module.exports = MyApp;
