import Vue from 'vue'
import Vuex from 'vuex'
/* eslint-disable no-console */
import axios from 'axios'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    loading: true,
    loadingModal: false,
    showModal: false,
    searching: '',
    queryFav: '',
    pokemonList: [],
    query: '',
    disable: false
  },
  mutations: {
    loading(state, value) {
      state.busqueda = value
      state.loading = value
    },

    loadingModal(state, value) {
      state.loadingModal = value
    },

    setPokemonAll(state, value) {
      state.pokemonList = value
    },

    setBuscador(state, query) {
      state.query = query
    },

    setFavorities(state, value) {
      state.queryFav = value
    },

    openModal(state, value) {
      state.showModal = value
    },

    changeFavorites(state, value) {
      let data = JSON.parse(localStorage.getItem('data'))
      return state.pokemonList.find((item, key) => {
        if(item.name === value.item.name) {
          data[key].favorities = value.value       
          item.favorities = value.value
          localStorage.clear('data')
          localStorage.setItem('data', JSON.stringify(state.pokemonList))
        }
      })
      

    }
  },
  actions: {
    loader( {commit} ) {
      setTimeout(() => {
        commit('loading', false)
      }, 1000);
    },

   getPokemonAll: async ( { commit }) => {
    await axios.get ('https://pokeapi.co/api/v2/pokemon' , {
      headers: {
      'Authorization': 'Bearer' + 'Your Bearer Pssword',
      "Content-Type": "application/json",
      }
    })
    .then(response => {
      commit('loading', false)
      response.data.results.forEach(element => {
        element.favorities = false
      })

      if(JSON.parse(localStorage.getItem('data'))) {
        let data = JSON.parse(localStorage.getItem('data'))
        commit('setPokemonAll', data)
      }else {
        localStorage.setItem('data', JSON.stringify(response.data.results))
        let data = JSON.parse(localStorage.getItem('data'))
        commit('setPokemonAll', data)
      }
    })
    .catch(function (error) {
          console.log(error)
      })
    }

  },
  getters: {
    filterElements: (state) => {
      if(state.query.length > 0 || state.queryFav === true) {
        return state.pokemonList.filter((item) => {
          if(item.name === state.query) {
            return item 
          } else if (item.favorities === state.queryFav) {
            state.disable = true
            return item
          }
        })
      } else {
        state.disable = false
        return state.pokemonList
      }
    }
  }
})
