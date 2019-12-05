<template>
  <button>
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ClickButton extends Vue { }
</script>

<style scoped>
.red {
  background: red;
}
</style>
