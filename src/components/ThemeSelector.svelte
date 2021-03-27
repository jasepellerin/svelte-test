<script lang="ts">
  import { Select, SelectItem } from 'carbon-components-svelte';
  import type { Theme } from '../types/Theme';

  export let theme: Theme;
</script>

<main>
  <Select inline labelText="Theme" bind:selected={theme}>
    <SelectItem value="white" text="White" />
    <SelectItem value="g10" text="Gray 10" />
    <SelectItem value="g90" text="Gray 90" />
    <SelectItem value="g100" text="Gray 100" />
  </Select>
</main>
