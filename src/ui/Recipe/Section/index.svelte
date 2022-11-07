<script lang="ts">
  import type { Product } from "@/core/domain/product";
  import RecipeItem from "@/ui/Recipe/Item/index.svelte";

  export let product: Product;
</script>

<section>
  <h2>Mes recettes</h2>
  <RecipeItem {product} />
</section>
