<script lang="ts">
  import Nav from "./ui/Nav/index.svelte";
  import { Router, Route } from "svelte-navigator";
  import Recipes from "@/pages/Recipes.svelte";
  import RecipeSection from "@/ui/Recipe/Section/index.svelte";
</script>

<Router>
  <main>
    <Route path="/" />

    <Route path="/recipes" component={Recipes} />
    <Route path="/recipes/:code" let:params>
      <RecipeSection product_code={params.code} />
    </Route>
    <Nav />
  </main>
</Router>
