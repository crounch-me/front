<script lang="ts">
  import type { Ingredient } from "../domain/ingredient";

  export let ingredients: Ingredient[];
</script>

<ul>
  {#each ingredients as ingredient}
    <li>{ingredient.quantity} {ingredient.unit} {ingredient.name}</li>
  {/each}
</ul>
