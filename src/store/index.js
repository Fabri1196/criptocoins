import { createStore } from 'vuex';
import CoinsServices from '@/services/CoinsServices';
import { ssrContextKey } from 'vue';

export default createStore({
  state: {
    user: "",
    showMainView: 0,
    values: [],
    priceBTC: 0,
    priceETH: 0,
    priceUSDT: 0,
    movements: [],
    totalBTC: 0,
    totalETH: 0,
    totalUSDT: 0,
    resultadoBTC: 0,
    resultadoETH: 0,
    resultadoUSDT: 0,
  },
  getters: {
    getUser(state){
      return state.user
    },
    getBTCPrice(state){
      return state.priceBTC
    },
    getETHPrice(state){
      return state.priceETH
    },
    getUSDTPrice(state){
      return state.priceUSDT
    },
    getMovements(state){
      return state.movements
    },
    getCoins(state){
      return {
        totalBTC: state.totalBTC,
        totalETH: state.totalETH,
        totalUSDT: state.totalUSDT
      }
    }
  },
  mutations: {
    setUser(state, newUser){
      state.user = newUser;
    },
    changeShowMainView(state,view){
      state.showMainView = view;
    },
    getCurrentPriceBTC(state, btc){
      CoinsServices.getCurrentPrice(btc)
      .then((response) => {
        state.values = response.data;
        state.priceBTC = parseFloat(state.values.totalBid).toFixed(2);
      })
    },
    getCurrentPriceETH(state, eth){
      CoinsServices.getCurrentPrice(eth)
      .then((response) => {
        state.values = response.data;
        state.priceETH = parseFloat(state.values.totalBid).toFixed(2);
      })
    },
    getCurrentPriceUSDT(state, usdt){
      CoinsServices.getCurrentPrice(usdt)
      .then((response) => {
        state.values = response.data;
        state.priceUSDT = parseFloat(state.values.totalBid).toFixed(2);
      })
    },

    getMovements(state, movements){
      state.totalBTC = 0;
      state.totalETH = 0;
      state.totalUSDT = 0;
      state.resultadoBTC = 0;
      state.resultadoETH = 0;
      state.resultadoUSDT = 0;
      state.movements = movements
      for(let coin of state.movements){
        if(coin.crypto_code === "btc"){
          if(coin.action === "purchase"){
            state.totalBTC += coin.crypto_amount;
            state.resultadoBTC -= parseFloat(coin.money).toFixed(2)
          }
          else{
            state.totalBTC -= coin.crypto_amount;
            state.resultadoBTC -= parseFloat(coin.money).toFixed(2)
          }
        }
        if(coin.crypto_code === 'eth'){
          if(coin.action === "purchase"){
            state.totalETH += coin.crypto_amount;
            state.resultadoETH -= parseFloat(coin.money).toFixed(2)
          }
          else{
            state.totalETH -= coin.crypto_amount;
            state.resultadoETH += parseFloat(coin.money)
          }
        }
        if(coin.crypto_code === 'usdt'){
          if(coin.action === "purchase"){
            state.totalUSDT += coin.crypto_amount;
            state.resultadoUSDT -= parseFloat(coin.money) 
          }
          else{
            state.totalUSDT -= coin.crypto_amount;
            state.resultadoUSD += parseFloat(coin.money)
          } 
        }
      }
      state.resultadoBTC += state.priceBTC*state.totalBTC;
      state.resultadoETH += state.priceETH*state.totalETH;
      state.resultadoUSDT += state.priceUSDT*state.totalUSDT;

      if(state.resultadoBTC != 0){
        state.resultadoBTC = (state.resultadoBTC).toFixed(2)
      }
      if(state.resultadoETH != 0){
        state.resultadoETH = (state.resultadoETH).toFixed(2)
      }
      if(state.resultadoUSDT != 0){
        state.resultadoUSDT = (state.resultadoUSDT).toFixed(2)
      }
    },
    
    cleanMovements(state){
      state.movements = [];
    }
  },
  actions: {
    setMovements(resource){
      CoinsServices.getUserInformation(resource.state.user) 
       .then((response) => {
        resource.commit("cleanMovements");

        resource.commit("getMovements", response.data);
        
        resource.commit("changeShowMainView", 1)
      })
    },
  },
  modules: {
  }
})
