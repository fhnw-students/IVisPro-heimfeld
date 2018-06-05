import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class WinValue extends Vue {

  public static ANIMATION_TIME = 800;

  @Prop() public winValue: number;

  public counter: number = 0;

  private log = this.$createLogger('WinValue');

  public created(): void {
    this.evaluate(this.winValue, 0);
  }

  @Watch('winValue')
  public winValueChanged(newVal: number, oldVal: number = 0): void {
    this.evaluate(newVal, oldVal);
  }

  public evaluate(newVal: number, oldVal: number = 0): void {
    if (newVal !== oldVal && newVal !== undefined) {
      if (newVal > oldVal) {
        this.animateUp(oldVal, newVal);
      } else {
        this.animateDown(oldVal, newVal);
      }
    }
  }

  public animateUp(from: number, to: number): void {
    const diff = to - from;
    const stepInMs = WinValue.ANIMATION_TIME / diff;
    let counter = 0;
    this.log.info('animateUp', from, to, diff);
    const myInterval = setInterval(() => {
      if (this.counter === to || counter >= diff) {
        clearInterval(myInterval);
      } else {
        counter = counter + 1;
        this.counter = this.counter + 1;
      }
    }, stepInMs);
  }

  public animateDown(from: number, to: number): void {
    const diff = from - to;
    const stepInMs = WinValue.ANIMATION_TIME / diff;
    let counter = 0;
    this.log.info('animateDown', from, to, diff);
    const myInterval = setInterval(() => {
      if (this.counter === to || counter >= diff) {
        clearInterval(myInterval);
      } else {
        counter = counter + 1;
        this.counter = this.counter - 1;
      }
    }, stepInMs);
  }

}
