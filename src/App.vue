<template>
  <v-app>
    <v-main>
      <HelloWorld />
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
.v-input__control {
  height: 30px;
}
.v-input--selection-controls {
  margin-top: 0px !important;
}
.image34 {
  border-radius: 10px !important;
  width: 100%;
}
.selected {
  background: white;
  border: 1px solid #a2a2a2;
  border-radius: 5px;
  width: 100%;
}
</style>
