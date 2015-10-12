export default class CounterLabel {

  constructor(id) {
    this.label = document.getElementById(id);
    this.rafId = 0;
  }

  countUp(sec) {
    const self = this;
    self.label.innerText = 0;
    let start = performance.now();

    return new Promise((resolve)=>{
      let wait = ()=>{
        let elapsed = performance.now() - start;
        self.label.innerText = '' + Math.floor(elapsed / 1000);
        if(elapsed/1000 < sec) {
          setTimeout(wait, 1000);
        } else {
          resolve();
        }
      };
      setTimeout(wait, 1000);
    });
  }
}