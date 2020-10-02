/* eslint-disable vue/valid-v-bind */
<template>
  <div class="app-home">
    <div class="container">
      <div class="row align-content-center justify-content-center app-home__content">
        <div class="col-12 text-center">
            <Loader v-if="$store.state.loading"/>
            <div v-else class="pt-5 pt-md-0">
              <img src="../assets/images/P1-Welcome.png" alt="">
              <h2 class="my-5">Welcome to Pokédex</h2>
              <h4>The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.</h4>
              <div class="my-5">
                <router-link tag="button" class="btn btn-red rounded-pill" to="/Detail">Go Chart</router-link>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/Loader.vue'

export default {
  components: { Loader },

  mounted() {
    this.$store.dispatch('loader')
  }

}
</script>
