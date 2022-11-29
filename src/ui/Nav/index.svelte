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
    text-align: center;
    background-color: rgb(66, 60, 60);
  }
</style>
