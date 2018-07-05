<template>
  <h2>{{ msg }}</h2>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to the Crounch application',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h2 {
  font-weight: normal;
}
</style>
