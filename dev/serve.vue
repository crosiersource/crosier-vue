<script>
import { defineComponent } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
import { CrosierVueSample } from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
  components: {
    CrosierVueSample,
  }
});
</script>

<template>
  <div id="app">
    <crosier-vue-sample />
  </div>
</template>
