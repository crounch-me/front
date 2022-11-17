<script lang="ts">
  import { Link } from "svelte-navigator";
</script>

<nav>
  <Link to="/recipes">Mes recettes</Link>
</nav>

<style>
  nav {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 40px;
    line-height: 40px;
    width: 100%;
    background-color: white;
  }
</style>
