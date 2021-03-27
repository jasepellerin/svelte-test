<script>
  import { Content, Grid, Row, Column } from 'carbon-components-svelte';
</script>

<Content>
  <Grid>
    <Row>
      <Column>
        <slot />
      </Column>
    </Row>
  </Grid>
</Content>
