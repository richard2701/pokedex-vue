<template>
  <div>
    <transition @enter="startTransitionModal" @after-enter="endTransitionModal" @before-leave="endTransitionModal" @after-leave="leaveTransitionModal">
      <div class="modal fade" v-if="$store.state.showModal" ref="modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div>
              <div class="position-relative">
                <button class="close position-absolute p-2 modal__equis" type="button" @click="close()">
                  <img src="../assets/images/equis.svg" alt="" srcset="">
                </button>
                <img src="../assets/images/image_16.svg" alt="" class="modal__img-pokemon">
                <img src="../assets/images/image_14.svg" alt="" class="modal__background mw-100 w-100 ">
              </div>
            </div>
            
            <div class="modal-body text-left">
              <template v-if="$store.state.loadingModal">
                <Loader />
              </template>
              <template v-else>
                <p class="text-capitalize"><span class="font-weight-bold">Name:</span> {{ singlePokemon.name }}</p>
                <hr>
                <p class="text-capitalize"><span class="font-weight-bold">Weight:</span> {{ singlePokemon.weight }}</p>
                <hr>
                <p class="text-capitalize"><span class="font-weight-bold">Height:</span> {{ singlePokemon.height }}</p>
                <hr>
                
                <p>
                  <span class="font-weight-bold">Type:</span>
                  <span v-for="types in singlePokemon.types" :key="types.id" class="text-capitalize">
                      {{ types.type.name }} 
                  </span>
                </p>
                <hr>
              </template>
            </div>
            <div class="alert alert-primary" role="alert" v-if="textCopyMessage">
              Text Copied
            </div>
            <div class="modal-footer" v-if="!$store.state.loadingModal">
              <div class="d-flex justify-content-between w-100">
                <button class="btn btn-red btn-red--modal rounded-pill" type="button" @click="copytext(singlePokemon)">Share to my friends</button>
                <div>
                  <img src="../assets/images/Active.svg" alt="" v-if=(singlePokemon.favorities)>
                  <img src="../assets/images/Disabled.svg" alt="" v-else>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="modal-backdrop fade d-none" ref="backdrop"></div>
  </div>

</template>

<script>
import Loader from '@/components/Loader.vue'
export default {
  components: { Loader },
  data () {
    return {
      textCopyMessage: false
    }
  },

  props:[ 'singlePokemon'],

  methods: {
    startTransitionModal() {
      this.$refs.backdrop.classList.toggle("d-block");
      this.$refs.modal.classList.toggle("d-block");
    },

    endTransitionModal() {
      this.$refs.backdrop.classList.toggle("show");
      this.$refs.modal.classList.toggle("show");
    },

    leaveTransitionModal() {
      this.$refs.backdrop.classList.toggle("d-block");
    },

    close() {
      this.$store.commit('openModal', false)
    },

    copytext(item) {
      let type = []
      let textCopy
      let result

      item.types.forEach(element => {
        type.push(element.type.name)
      })

      type.toString()
      
      textCopy = [`Name:${item.name}`,` Weight:${item.weight} `,` Height: ${item.height}`, ` Type: ${type}`];
      result = textCopy.toString();

      let copytex = result
      navigator.clipboard.writeText(copytex).then(() => {
        this.textCopyMessage = true
        setTimeout(() => {
          this.textCopyMessage = false
        }, 1500);
      }, err => {
        console.error('Async: Could not copy text: ', err);
      })

    }
  }
}
</script>
