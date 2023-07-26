<script lang="ts">
  import { smartProgress } from '../utils.js';
  import { metalStore } from '../resources.store.js';
  let { rawStone, malachite } = metalStore;

  let waitingTime = 2;
  let step = 25;
  let [progressPercent, mine2] = smartProgress({
    waitingTime,
    step,
    clickStep: 1,
    randomazoOpts: { rawStone: 80, malachite: 20 },
    updateMap: { rawStone, malachite },
  });
</script>

<div>
  <div>
    stone: {$rawStone} <br />
    malachite: {$malachite} <br />
  </div>
  <button
    on:click={(_) => {
      mine2();
    }}
  >
    go mining
  </button>
  <div class="progress">
    <div class="bar" style={`width: ${$progressPercent}%;`} />
  </div>
</div>

<style>
  .progress {
    width: 100px;
    height: 20px;
    outline: black 1px solid;
    border-radius: 6px;
  }
  .bar {
    height: 20px;
    background: gainsboro;
    border-radius: 6px;
    z-index: -2;
    transition: width 0.1s ease;
  }
</style>
