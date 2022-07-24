<template>
  <div class="about">
    <h2>Compra</h2>
    <hr>
  </div>

  <h3>Seleccione una criptomoneda</h3>

  <div>
    <div v-if="view === 1">
      <button @click="Cripto(btc)">Bitcoin</button>
      <button @click="Cripto(eth)">Ethereum</button>
      <button @click="Cripto(usdt)">Tether</button>
      <div v-show="seeTable">
        <TablaCompra :agencies="agencies" :view="view" @change-view="changeView" @sendCoin="selectAgency"></TablaCompra>
      </div>
    </div>

    <div v-else-if="view === 2">
      <Comprar :type="type" :selectedCoin="selectedCoin" :view="view" @change-view="changeView" :coin="coin" :agencies="agencies" @registrar="registrar"></Comprar>
    </div>
  </div>
  
</template>

<script>
import CoinsServices from '../services/CoinsServices.js';
import TablaCompra from '@/components/TablaCompra.vue';
import Comprar from '@/components/Comprar.vue';
import LogIn from '@/components/LogIn.vue';
import {mapState, mapActions} from "vuex";

export default {
  name:'Compra',
  components: {
    TablaCompra,
    Comprar,
    LogIn,
  },
  data() {
    return {
      agencies: [],
      coin: "",
      view: 1,
      selectedCoin: "",
      dateTime: "",
      type:"purchase",
      btc: "btc",
      eth: "eth",
      usdt: "usdt",
      seeTable: false,
    };
  },
  computed:
    mapState({usuario: (state) => state.user,}),
  methods: {
    ...mapActions(['setMovements']),
    Cripto(value) {
      this.coin = value;
      CoinsServices.getCoins(this.coin) 
        .then((response) => {
          this.agencies = response.data;})
        .then(()=>this.changeSeeTable());
    },
    changeView() {
      if(this.view ==1) {      
       this.view = 2;
      }          
      else {
        this.view = 1; 
      }
    },
    changeSeeTable(){
      this.seeTable = true;
    },
    selectAgency(selected){
      this.selectedCoin = selected;
    },
    registrar(cantidadCripto, montoPesos){
      let date = new Date()
      this.dateTime = new Date(
				parseInt(date.getFullYear()),
				parseInt(date.getMonth()),
				parseInt(date.getDate()),
				parseInt(date.getHours()-3),
				parseInt(date.getMinutes())
			);
      CoinsServices.postOperation(this.usuario, this.type, this.coin, cantidadCripto, montoPesos, this.dateTime)
      .then(()=>this.$router.push({ name: "situacion" }));
      this.setMovements();
    },
  },
}
</script>

<style scoped>
  button{
    margin: 15px;
    font-size: 20px;
    padding: 5px 18px;
  }

  h3{
    font-size: 25px;
  }
</style>
