<script lang="ts">
  import Content from './components/Content.svelte';
  import Header from './components/Header.svelte';
  import ThemeContainer from './components/ThemeContainer.svelte';
  import Todos from './components/Todos.svelte';

  import type { Theme } from './types/Theme';

  let theme: Theme = 'g90';
</script>

<main>
  <ThemeContainer persist bind:theme>
    <Header bind:theme />
    <Content>
      <Todos />
    </Content>
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
