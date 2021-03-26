<script lang="ts">
  import ThemeContainer from './components/ThemeContainer.svelte';
  import ThemeSelector from './components/ThemeSelector.svelte';
  import Todos from './components/Todos.svelte';

  import type { Theme } from './types/Theme';

  let theme: Theme = 'g90';
</script>

<main>
  <ThemeContainer persist bind:theme>
    <Todos />
    <ThemeSelector bind:theme />
  </ThemeContainer>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
