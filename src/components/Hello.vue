<template>
  <div>
    <h4 v-if="authenticated">
      Hello there !
    </h4>
    <h4 v-if="!authenticated">
      Hep ! I don't know who you are !!
    </h4>
  </div>
</template>

<script>
export default {
  name: 'hello',
  props: ['authenticated']
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  font-weight: normal;
}
</style>
