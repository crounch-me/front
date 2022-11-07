<script lang="ts">
  import type { Product } from "@/core/domain/product";
  import IngredientList from "@/ui/Ingredient/List/index.svelte";

  export let product: Product;
  const { recipe } = product;
</script>

<section>
  <h3>{product.label}</h3>

  <h4>Ingrédients</h4>
  <IngredientList ingredients={recipe.ingredients} />

  <h4>Etapes</h4>
  <ol>
    <li>Etaler la pâte</li>
    <li>Faire des trous</li>
    <li>Mettre la compote</li>
    <li>Mettre les pommes</li>
  </ol>
</section>

<style>
  section {
    text-align: left;
  }
</style>
