/* eslint-disable vue/valid-v-bind */
<template>
  <div class="app-search">
    <div class="container">
      <div class="row justify-content-center app-search__content">
        <div class="col-12 col-md-8" v-if="$store.state.loading">
          <Loader class="align-self-center vh-100 d-flex" />
        </div>
        <div class="col-12 col-md-8 text-center mb-5" v-else>
          <div class="pt-5">
            <div class="input-group mb-2 shadow">
              <div class="input-group-prepend border-0">
                <span class="input-group-text border-0" id="basic-addon1"><img src="../assets/images/search.svg" alt="" srcset=""></span>
              </div>
              <input type="text" class="form-control border-0" placeholder="Search to name" v-model="searching" :disabled="$store.state.disable">
            </div>
          </div>

          <div class="app-search__list">
            <template v-if="$store.getters.filterElements.length === 0 && !$store.state.loading ">
              <h2>Uh-oh!</h2>
              <h4 class="my-4">You look lost on your journey!</h4>
              <div class="text-center ">
                <router-link tag="button" class="btn btn-red rounded-pill" to="/">Go back home</router-link>
              </div>
            </template>
            <template v-else>
              <div v-for="item in $store.getters.filterElements" :key="item.id">
                <div class="card mt-3 mt-md-4">
                  <div class="p-2 d-flex justify-content-between">
                    <div class="align-self-center text-left w-100" @click="openModal(item)" style="cursor: pointer;">
                      <h4 class="text-capitalize">{{ item.name }}</h4>
                    </div>
                    <div>
                      <img src="../assets/images/Active.svg" alt="" v-if=(item.favorities) @click="addFavorite(item, false)">
                      <img src="../assets/images/Disabled.svg" alt="" v-else @click="addFavorite(item, true)">
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <router-link tag="button" class="btn btn-red rounded-pill my-5" to="/" v-if="$store.getters.filterElements.length > 0">Go back home</router-link>

            <!-- Modal-->
            <Modal :singlePokemon="singlePokemon" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import Loader from '@/components/Loader.vue'
import Modal from '@/components/Modal.vue'

export default {
  components: { Loader, Modal },

  data () {
    return {
      singlePokemon: []
    }
  },
  
  computed: {
    ...mapGetters(['filterElements']),
    searching: {
      get() { return this.$store.state.query },
      set(value) { this.$store.commit('setBuscador', value) }

    }
  },

  methods: {
    addFavorite(item, value) {
      this.$store.commit('changeFavorites', {item, value})
    },

    async openModal(item)  {
      this.$store.commit('openModal', true)
      this.$store.commit('loadingModal', true)


      await axios.get(`https://pokeapi.co/api/v2/pokemon/${item.name}`,{
        headers: {
          'Authorization': 'Bearer' + 'Your Bearer Pssword',
          "Content-Type": "application/json",
        }
      })
      .then(response => {
        this.singlePokemon = response.data
        this.singlePokemon.favorities = item.favorities
        this.$store.commit('loadingModal', false)
      }) 
      
    }
  },

  mounted() {
    this.$store.dispatch('getPokemonAll')
  }

}
</script>
