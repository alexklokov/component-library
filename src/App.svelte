<script>
  import Router from "./components/router/Router.svelte";
  import Faq from "./pages/faq/Faq.svelte";
  import Index from "./pages/index/Index.svelte";

  const router = {
    index: Index,
    "tools/faq": Faq,
  };
</script>

<main>
  <div class="container">
    <Router {router} />
  </div>
</main>

<style scoped>
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
