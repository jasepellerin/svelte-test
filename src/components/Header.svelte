<script lang="ts">
  import { Header } from 'carbon-components-svelte';
  import ThemeSelector from './ThemeSelector.svelte';
  import type { Theme } from '../types/Theme';

  export let theme: Theme;
</script>

<Header company="Jase P" platformName="Todo App">
  <ThemeSelector bind:theme />
</Header>
