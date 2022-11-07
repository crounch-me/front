<script lang="ts">
  import type { Ingredient } from "../core/domain/ingredient";

  export let ingredient: Ingredient;

  const unit = ingredient.unit ?? "";
</script>

<li>
  {#if ingredient.product.recipe}
    <a href="/recipe/{ingredient.product.code}">
      {ingredient.quantity}{unit}
      {ingredient.product.label}
    </a>
  {:else}
    {ingredient.quantity}{unit}
    {ingredient.product.label}
  {/if}
</li>
