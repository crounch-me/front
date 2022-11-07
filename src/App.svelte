<script lang="ts">
  import { all_recipes } from "./data/all_recipes";
  import IngredientList from "./ui/IngredientList.svelte";

  const recipe = all_recipes[0];
</script>

<main>
  <h1>Crounch App Reborn</h1>
  <section>
    <h2>{recipe.name}</h2>
    <IngredientList ingredients={recipe.ingredients} />
  </section>
</main>
