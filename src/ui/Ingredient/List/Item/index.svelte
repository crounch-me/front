<script lang="ts">
  import type { Ingredient } from "@/core/domain/ingredient";
  import { Link } from "svelte-navigator";

  export let ingredient: Ingredient;

  const unit = ingredient.unit ?? "";
</script>

<li>
  {#if ingredient.product.recipe}
    <Link to="/recipes/{ingredient.product.code}">
      {ingredient.quantity}{unit}
      {ingredient.product.label}
    </Link>
  {:else}
    {ingredient.quantity}{unit}
    {ingredient.product.label}
  {/if}
</li>
