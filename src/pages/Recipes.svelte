<script lang="ts">
  import { edible_products } from "../core/data";
  import { Link } from "svelte-navigator";
</script>

<header>Recettes</header>
<ul>
  {#each edible_products as product}
    <li><Link to={`/recipes/${product.code}`}>{product.label}</Link></li>
  {/each}
</ul>
