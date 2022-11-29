<script lang="ts">
  import type { Product } from "@/core/domain/product";
  import IngredientList from "@/ui/Ingredient/List/index.svelte";

  export let product: Product | null;
  $: recipe = product?.recipe;
</script>

<section>
  {#if product}
    <h4>Ingrédients</h4>
    <IngredientList ingredients={recipe.ingredients} />

    {#if recipe?.steps.length}
      <h4>Etapes</h4>
      <ol>
        {#each recipe.steps as step}
          <li>{step.label}</li>
        {/each}
      </ol>
    {/if}
  {/if}
</section>

<style>
  section {
    text-align: left;
  }
</style>
