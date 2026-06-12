<script lang="ts">
  let count = $state(0)
</script>

<div class="micro-app micro-app--svelte">
  <span class="micro-app__badge">Svelte 5</span>
  <h1>Svelte 子应用</h1>
  <p>可独立运行，也可通过 bootstrap / mount / unmount 接入微前端基座。</p>
  <button type="button" onclick={() => count++}>Count: {count}</button>
</div>
