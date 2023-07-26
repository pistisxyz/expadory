import { writable, type Writable } from 'svelte/store';

export function randomazo<T>(options: { [option in keyof T]: number }) {
  const keys = Object.keys(options);
  const totalSum = keys.reduce((acc, item) => acc + options[item], 0);

  let runningTotal = 0;
  const cumulativeValues = keys.map((key) => {
    const relativeValue = options[key] / totalSum;
    const cv = {
      key,
      value: relativeValue + runningTotal,
    };
    runningTotal += relativeValue;
    return cv;
  });

  const r = Math.random();
  return cumulativeValues.find(({ value }) => r <= value)!.key;
}

export function smartProgress(opts: {
  waitingTime: number;
  step: number;
  clickStep: number;
  randomazoOpts: { [option: string]: number };
  updateMap: { [option: string]: Writable<number> };
  updateStep?: number;
}) {
  let timer = opts.waitingTime;
  let doing = false;
  let progressPercent = writable(0);
  if (!opts.updateStep) opts.updateStep = 1;
  return [
    progressPercent,
    () => {
      if (doing) {
        timer -= opts.clickStep;
        return;
      }
      timer = opts.waitingTime;
      doing = true;
      let int = setInterval(() => {
        timer -= opts.step / 1000;
        progressPercent.set(((opts.waitingTime - timer) / opts.waitingTime) * 100);
        if (timer <= 0) {
          clearInterval(int);
          let choice = randomazo(opts.randomazoOpts);
          opts.updateMap[choice].update((v) => v + 1);
          doing = false;
          progressPercent.set(0);
        }
      }, opts.step);
    },
  ] as [Writable<number>, () => void];
}
