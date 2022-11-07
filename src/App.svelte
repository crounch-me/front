<script lang="ts">
  import { edible_products } from "./core/data";
  import RecipeSection from "./ui/Recipe/Section/index.svelte";

  const [, product] = edible_products;
</script>

<main>
  <h1>Crounch App Reborn</h1>

  <RecipeSection {product} />
</main>
