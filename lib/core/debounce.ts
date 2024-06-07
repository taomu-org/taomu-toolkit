export class Debounce {
  private TM: number = Date.now()

  debounce(callBack: () => void, t: number) {
    this.TM = Date.now()
    setTimeout(() => {
      if (Date.now() - this.TM >= t) {
        callBack()
      }
    }, t)
  }

  throttle(callBack: () => void, t: number) {
    if (Date.now() - this.TM >= t) {
      callBack()
      this.TM = Date.now()
    }
  }
}
