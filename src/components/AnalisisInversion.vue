<template>
  <div>
    <h3>Analisis</h3>
    <div class="tabla">
      <table>
        <thead>
            <tr>
                <th>Coin</th>
                <th>Resultado</th>
            </tr>
        </thead>
        <tbody>
              <tr v-show="$store.state.resultadoBTC != 0">
                <td>{{BTC}}</td>
                <td>$ {{$store.state.resultadoBTC}}</td>
             </tr>

              <tr v-show="$store.state.resultadoETH != 0">
                <td>{{ETH}}</td>
                <td>$ {{$store.state.resultadoETH}}</td>
             </tr>
             
              <tr v-show="$store.state.resultadoUSDT != 0">
                <td>{{USDT}}</td>
                <td>$ {{$store.state.resultadoUSDT}}</td>
             </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations} from "vuex";

export default {
  data(){
    return{
      movements: [],
      BTC: "BTC",
      ETH: "ETH",
      USDT: "USDT",
    };
  },
  computed:
    mapState({usuario: (state) => state.user,}),
    ...mapGetters(['getBTCPrice', 'getETHPrice', 'getUSDTPrice']),
  methods: {
    ...mapMutations(['getCurrentPriceBTC', 'getCurrentPriceETH', 'getCurrentPriceUSDT']),
    changeSeeTable(){
      this.seeTable = true;
    },
  }
}
</script>

<style scoped>

</style>