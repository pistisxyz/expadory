<script lang="ts">
    import { randomazo } from "../utils.js";
    import { metalStore } from "../resources.store.js";
    let { rawStone, malachite } = metalStore;

    let mining = false;
    let waitingTime = 2;
    let step = 25;
    function mine2() {
        if (mining) return;
        mining = true;
        let timer = waitingTime;
        let int = setInterval(() => {
            timer -= step / 1000;
            progressPercent = ((waitingTime - timer) / waitingTime) * 100;
            if (timer <= 0) {
                clearInterval(int);
                let choice = randomazo({ stone: 100, copper: 10 });
                ({ stone: rawStone, copper: malachite })[choice].update(
                    (v) => v + 1
                );
                mining = false;
                progressPercent = 0;
            }
        }, step);
    }

    let progressPercent = 0;
</script>

<div>
    <div>
        stone: {$rawStone} <br />
        malachite: {$malachite}
    </div>
    <button
        on:click={(_) => {mine2()}}
    >
        go mining
    </button>
    <div class="progress">
        <div class="bar" style={`width: ${progressPercent}%;`} />
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
