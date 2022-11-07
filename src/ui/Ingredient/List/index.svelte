<script lang="ts">
  import type { Ingredient } from "@/core/domain/ingredient";
  import IngredientListItem from "@/ui/Ingredient/List/Item/index.svelte";

  export let ingredients: Ingredient[];
</script>

<ul>
  {#each ingredients as ingredient}
    <IngredientListItem {ingredient} />
  {/each}
</ul>
