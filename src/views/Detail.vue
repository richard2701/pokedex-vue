<template>
  <div>
    <search-page />
    <footer class="py-3 footer fixed-bottom" v-if="!$store.state.loading">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-8 text-center align-self-center">
            <button class="btn btn-footer btn-footer--all rounded-pill mx-2" @click="getAll()">
              <img src="../assets/images/menuActive.svg" alt="" srcset="" v-if="!$store.state.disable">
              <img src="../assets/images/menu.svg" alt="" srcset="" v-if="$store.state.disable"> 
              <span class="align-middle ml-2" :class="!$store.state.disable ? 'btn-active' : ''">All</span>
            </button>
            <button class="btn btn-footer btn-footer--fav rounded-pill" @click="getFavorities(true)">
              <img src="../assets/images/VectorActive.svg" alt="" srcset="" v-if="$store.state.disable">
              <img src="../assets/images/Vector.svg" alt="" srcset="" v-else>
              <span class="align-middle ml-2" :class="$store.state.disable ? 'btn-active' : ''">Favorites</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  </div>

</template>

<script>
// @ is an alias to /src
import SearchPage from '@/components/SearchPage.vue'

export default {
  name: 'Datails',

  components: {
    SearchPage
  },

  methods: {
    getAll() {
      this.$store.commit('setFavorities', false)
      this.$store.commit('setBuscador', '')
      this.$store.dispatch('getPokemonAll')
    },

    getFavorities(value) {
      this.$store.commit('setFavorities', value)
    }
  }
}
</script>
