<template>
  <div>
    <h4 v-if="authenticated">
      Hello there !
    </h4>
    <h4 v-if="!authenticated">
      Hep ! I don't know who you are !!
    </h4>
    <h3>{{msg}}</h3>
  </div>
</template>

<script>
export default {
  name: "hello",
  props: ["authenticated"],
  data() {
    return {
      msg: ""
    };
  },
  mounted() {
    if (!this.authenticated) {
      this.axios.get("http://localhost:3000/_health").then(response => {
        this.msg = response.data.status;
      });
    } else {
      this.axios.get("http://localhost:3000/_health/private").then(response => {
        this.msg = response.data.status;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  font-weight: normal;
}
</style>
