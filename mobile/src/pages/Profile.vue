<template>
    <WebView :source="{ uri: `https://github.com/${username}` }"/>
</template>

<script>
import store from "../store";
import {WebView} from 'react-native-webview'

export default {
      // props: {
  //   navigation: {
  //     type: Object,
  //   },
  // },

    components: {
        WebView
    },
    
  computed: {
    username() {
      /**NÃO usando VUEX, mas recebendo como parametro do navigation */
      // console.log("Username");
      // return this.navigation.getParam('github_username');

      

      /**Usando VUEX */
    //   console.log("Username");
      return store.state.github_username;
    },
  },
};
</script>

<style>
</style>