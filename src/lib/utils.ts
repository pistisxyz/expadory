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
  return cumulativeValues.find(({ key, value }) => r <= value)!.key;

}