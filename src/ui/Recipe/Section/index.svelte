<script lang="ts">
  import { all_products } from "@/core/data";
  import RecipeItem from "@/ui/Recipe/Item/index.svelte";

  export let product_code;
  $: product = null;
  $: if (product_code) {
    product = all_products.find((p) => p.code === product_code);
  }
</script>

<header>{product?.label}</header>
<section>
  <RecipeItem {product} />
</section>
