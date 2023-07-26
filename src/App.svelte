<script lang="ts">
  import { writable } from 'svelte/store';
  import Mine from './lib/pages/mine.svelte';
  import Factory from './lib/pages/factory.svelte';

  type View = 'start' | 'mine' | 'factory';
  let currentView: View = 'start';

  function changeView(view: View) {
    return () => (currentView = view);
  }

  let allowedViews: View[] = [];
</script>

<main>
  <nav>
    <ul>
      {#each allowedViews as view}
        <li>
          <button on:click={changeView(view)} class="p-4 border-white border-2 hover:border-gray-500">{view}</button>
        </li>
      {/each}
    </ul>
  </nav>

  {#if currentView == 'start'}
    <button
      class="p-4 border-white border-2 hover:border-gray-500"
      on:click={(_) => {
        allowedViews = [...allowedViews, 'mine'];
        changeView('mine')();
      }}
    >
      buy mining license
    </button>
  {:else if currentView == 'mine'}
    <Mine />
  {:else if currentView == 'factory'}
    <Factory />
  {/if}
</main>

<style>
  main {
    width: 100%;
  }
  main > nav {
    width: 100%;
    display: flex;
  }
  li {
    display: inline;
  }
</style>
