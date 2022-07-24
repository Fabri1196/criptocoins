<template>
  <div class="page">
    <div v-if="showMainView === 1">
      <div id="topper">
        <router-link to="/">Situación Actual</router-link> |
        <router-link to="/compra">Compra</router-link> |
        <router-link to="/venta">Venta</router-link>
        
        <h1>CriptoMarket</h1>
        <p id="name">Usuario: {{$store.state.user}}</p>

        <button id="inicioButton" @click="changeUser">Cambiar</button>
          
      </div>

      <router-view/>

    </div>

    <div id="logIn" v-if="showMainView === 0">
      <LogIn @user-log-in="userName"></LogIn>
    </div>
  </div>
  
  <div class="loadingPage" v-if="showMainView === 2">
    <h4 id="loadingText">
      Por favor, espere un momento. <br>
      Estamos procesando su solicitud.
    </h4>
      <img id="imgCargando"
        src="https://c.tenor.com/XK37GfbV0g8AAAAC/loading-cargando.gif"
      />
    </div>
  
</template>

<script>
import LogIn from '@/components/LogIn.vue';
import { mapState, mapMutations, mapActions } from "vuex";

export default{
  components: {
    LogIn,
  },
  data() {
    return {
      usuario: "",
      btc: "btc",
      eth: "eth",
      usdt: "usdt",
    }
  },
  computed: {
    ...mapState({
      showMainView: (state) => state.showMainView
    }),
  },
  methods: {
    ...mapMutations(['cleanMovements', 'setUser', 'changeShowMainView',
          'getCurrentPriceBTC', 'getCurrentPriceETH', 'getCurrentPriceUSDT']),
     ...mapActions(['setMovements']),

    changeUser() {
        this.cleanMovements();
        this.changeShowMainView(0)
    },
    userName(user) {
      this.setUser(user);
      this.setMovements();
      this.getCurrentPriceBTC(this.btc);
      this.getCurrentPriceETH(this.eth);
      this.getCurrentPriceUSDT(this.usdt);
      this.changeShowMainView(2)
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#topper {
  background-color: rgba(0, 0, 255, 0.281);
}

h1{
  font-size: 30px;
  margin: 10px 0px 0px 0px;
  font-family: 'Roboto Slab', serif;
}

#name{
  font-size: 20px;
  margin: 0px;
  margin-top: 15px;
}

.page{
  align-items: center;
  top: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
  margin-top: 0px;
}

.tabla{
  padding: 15px 0px 15px 0px;
  font-weight: bold;
  font-family: 'Lato', sans-serif;
  grid-column: 1/3;
  margin: 0 auto;
}
 
.tabla th{
  border: 1px black solid;
  font-size: 18px;
}
.tabla td{
  border: 1px black solid;
  font-size: 15px;
}

table{
  border-collapse: collapse;
  border-spacing: 0;
  text-align: center;
  margin: 0 auto;
}

#logIn{
  display: flex;
	justify-content: center;
	align-items: center;
	height: 80vh;
}

button{
  margin: 0px 2px 0px 2px;
  padding: 0px;
  font-size: 15px;
  background-color: rgb(75, 94, 177);
  color: white;
  font-family: 'Roboto Slab', serif;
}

#inicioButton{
  margin: 0px 0px 10px 0px;
  padding: 5px;
}

h2{
  font-family: "Times New Roman", Times, serif;
  font-size: 30px;
}

h3{
  background-color: rgba(0, 13, 54, 0.829);
  color: white;
}

.loadingPage {
  display: flex;
	justify-content: center;
	align-items: center;
	height: 80vh;
}

#imgCargando{
  width: 150px;
  height: 150px;
}

footer{
  color: gray;
  text-align: right;
  padding: 0 8px 0 0px; 
  vertical-align: text-bottom;
}
</style>
