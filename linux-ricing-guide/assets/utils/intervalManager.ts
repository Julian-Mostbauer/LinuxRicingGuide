class IntervalManager {
  private intervalId: number | undefined;

  constructor() {
    this.intervalId = undefined;
  }

  start(callback: () => void, interval: number) {
    this.stop();
    this.intervalId = window.setInterval(callback, interval);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }
}

export default IntervalManager;