<script lang="ts">
  import { edible_products } from "./core/data";
  import IngredientList from "./ui/IngredientList.svelte";
  import RecipeArticle from "./ui/RecipeArticle.svelte";

  const [, product] = edible_products;
</script>

<main>
  <h1>Crounch App Reborn</h1>
  <sections>
    <h2>Mes recettes</h2>
    <RecipeArticle {product} />
  </sections>
</main>
