<template>
  <div>
    <h3>Estado Actual</h3>
    <div class="tabla" v-if="$store.state.totalBTC>0 || $store.state.totalETH>0 || $store.state.totalUSDT>0">
      <table>
        <thead>
            <tr>
                <th>Coin</th>
                <th>Cantidad</th>
                <th>Precio Actual</th>
            </tr>
        </thead>
        <tbody>
              <tr v-show="$store.state.totalBTC>0">
                <td>{{BTC}}</td>
                <td>{{$store.state.totalBTC}}</td>
                <td>{{$store.state.priceBTC}}</td>
             </tr>

              <tr v-show="$store.state.totalETH>0">
                <td>{{ETH}}</td>
                <td>{{$store.state.totalETH}}</td>
                <td>{{$store.state.priceETH}}</td>
             </tr>

              <tr v-show="$store.state.totalUSDT>0">
                <td>{{USDT}}</td>
                <td>{{$store.state.totalUSDT}}</td>
                <td>{{$store.state.priceUSDT}}</td>
             </tr>
          </tbody>
      </table>
  </div>
  <div v-else>
    <p>No posee cryptomonedas</p>
  </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations} from "vuex";
import CoinsServices from '@/services/CoinsServices';

export default {
  data(){
    return{
      movements: [],
      seeTable: false,
      BTC: "BTC",
      ETH: "ETH",
      USDT: "USDT",
    };
  },
  computed:
    mapState(
      {usuario: (state) => state.user,}),
    ...mapGetters(['getBTCPrice', 'getETHPrice', 'getUSDTPrice', 'getCoins']),
  methods: {
    ...mapMutations(['getCurrentPriceBTC', 'getCurrentPriceETH', 'getCurrentPriceUSDT']),
  }
}
</script>

<style scoped>

</style>