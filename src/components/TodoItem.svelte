<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import { Tile } from 'carbon-components-svelte';

  const dispatch = createEventDispatcher();

  const remove = () => dispatch('remove', { id });

  const toggleStatus = () => dispatch('toggle', { id, newStatus: !complete });

  export let id: string;
  export let text: string;
  export let complete: boolean;
</script>

<li in:fly={{ x: 900, duration: 500 }} out:fade>
  <Tile>
    <span class:complete>
      {text}
    </span>
    {#if complete}
      <button on:click={toggleStatus}> ✔️ </button>
    {:else}
      <button on:click={toggleStatus}> ❌ </button>
    {/if}
    <button on:click={remove}> 🗑 </button>
  </Tile>
</li>

<style>
  .complete {
    text-decoration: line-through;
    color: green;
  }
</style>
