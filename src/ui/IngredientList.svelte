<script lang="ts">
  import type { Ingredient } from "../core/domain/ingredient";
  import IngredientListItem from "./IngredientListItem.svelte";

  export let ingredients: Ingredient[];
</script>

<ul>
  {#each ingredients as ingredient}
    <IngredientListItem {ingredient} />
  {/each}
</ul>
