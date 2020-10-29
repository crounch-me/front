<template>
  <div>
    <h1>Version</h1>
    <p>
      Front:
      <span v-text="frontVersion" />
    </p>
    <p>
      Back:
      <span v-text="backVersion" />
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { health } from '@/api/health';
import { getVersion } from '@/utils/environment';

@Component
export default class Version extends Vue {
  backVersion: string = '';
  frontVersion: string = getVersion();

  mounted() {
    health().then(res => (this.backVersion = res.version));
  }
}
</script>
