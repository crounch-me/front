<template>
  <div>{{ value }}</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ClickButton extends Vue {
  @Prop(String)
  value!: string;
}
</script>

<style scoped>
.zouz {
  background: red;
}
</style>
