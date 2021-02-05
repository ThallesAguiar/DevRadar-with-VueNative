<template>
  <safe-area-view class="map">
    <MapView class="map" :initialRegion="currentRegion">
      <Marker
        :v-if="currentRegion"
        v-for="user in users"
        :key="user._id"
        :coordinate="{
          longitude: user.location.coordinates[0],
          latitude: user.location.coordinates[1],
        }"
      >
        <image
          class="avatar"
          :source="{
            uri: user.avatar_url,
          }"
        />

        <Callout @press="goToProfileScreen(user.github_username)">
          <view class="callout">
            <text class="userName">{{ user.name }}</text>
            <text class="userStatus">{{ user.bio }}</text>
          </view>
        </Callout>
      </Marker>
    </MapView>
    <view class="searchBtn">
      <touchable-opacity :on-press="loadUsers" class="buttonLoadUsers">
        <image class="imgBtn" :source="require('../../assets/users.png')" />
      </touchable-opacity>

      <touchable-opacity :on-press="loadUsers" class="buttonLoadStores">
        <image class="imgBtn" :source="require('../../assets/store.png')" />
      </touchable-opacity>
    </view>
  </safe-area-view>
</template>

<script>
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/MaterialIcons";

import api from "../services/api";
import store from "../store";

export default {
  // Declare `navigation` as a prop
  props: {
    navigation: {
      type: Object,
    },
  },
  components: {
    MapView,
    Marker,
    Callout,
    Icon,
  },

  data: () => ({
    currentRegion: null,
    users: [],
  }),

  created() {
    this.loadInitialPosition();
  },

  methods: {
    async loadInitialPosition() {
      const { granted } = await Location.requestPermissionsAsync();
      // granted significa se deu permissão ou não

      if (granted) {
        const { coords } = await Location.getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = coords;

        this.currentRegion = {
          latitude,
          longitude,
          // calculos navais para obter o zoom dentro do mapa.
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        };
      }
    },

    async goToProfileScreen(github_username) {
      /* Usando VUEX, e aqui estou passando o valor para uma ACTION através do dispatch.
      Mesmo usando action, tenho que usar Asyncronismo, pois quando os dados chegam na outra pagina, 
      a pagina renderiza sem esses dados, e acaba ocorrendo erro.*/

      await store.dispatch("ACTION_GITHUB_USERNAME", github_username);
      this.navigation.navigate("Profile");

      /*outra alternativa é passar valor por parametros. E a pagina que recebe o valor, usa this.navigation.getParam('github_username')
      mas não pode esquecer de pega o valor do navigation como prop. 
      props: {
        navigation: {
          type: Object,
        },
      },
      */

      // await this.navigation.navigate("Profile",{ github_username });
    },

    async loadUsers() {
      const { latitude, longitude } = this.currentRegion;

      const response = await api.get("/search", {
        params: {
          latitude,
          longitude,
        },
      });

      this.users = response.data.users;
    },
  },
};
</script>

<style>
.map {
  flex: 1;
}

.avatar {
  width: 54;
  height: 54;
  border-radius: 25;
  border-width: 4;
  border-color: #fff;
}

.callout {
  width: 260;
}

.userName {
  font-weight: bold;
  font-size: 16;
}

.userStatus {
  color: #777;
  margin-top: 5;
}

.searchBtn {
  position: absolute;
  bottom: 20;
  left: 20;
  right: 20;
  z-index: 5;
  flex-direction: row;
}

.buttonLoadUsers,
.buttonLoadStores {
  width: 50;
  height: 50;
  background-color: teal;
  border-radius: 25;
  justify-content: center;
  align-items: center;
  margin-left: 15;
  left: 90;
}

.imgBtn {
  width: 42;
  height: 42;
}
</style>
