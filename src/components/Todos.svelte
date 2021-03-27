<script lang="ts">
  import { FluidForm, TextInput } from 'carbon-components-svelte';
  import { collectionData } from 'rxfire/firestore';
  import { startWith } from 'rxjs/operators';
  import { db } from '../firebase';
  import TodoItem from './TodoItem.svelte';

  export let userId = 1;

  let text = '';

  const query = db
    .collection('todos')
    .where('userId', '==', userId)
    .orderBy('created');

  const todos = collectionData(query, 'id').pipe(startWith([]));

  const add = event => {
    console.log(event);
    db.collection('todos').add({
      userId,
      text,
      complete: false,
      created: Date.now()
    });
    text = '';
  };

  const updateStatus = event => {
    console.log(event);
    const { id, newStatus } = event.detail;
    db.collection('todos').doc(id).update({ complete: newStatus });
  };

  const removeItem = event => {
    console.log(event);
    const { id } = event.detail;
    db.collection('todos').doc(id).delete();
  };
</script>

<ul>
  {#each $todos as todo}
    <TodoItem {...todo} on:remove={removeItem} on:toggle={updateStatus} />
  {/each}
</ul>

<hr />

<FluidForm on:submit={add}>
  <TextInput
    bind:value={text}
    labelText="Create a new task"
    placeholder="Task content..."
  />
</FluidForm>
