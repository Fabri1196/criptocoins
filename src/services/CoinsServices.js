import axios from 'axios';
import Compra from '@/views/Compra.vue'

const apiClient = axios.create({
	baseURL: 'https://laboratorio3-f36a.restdb.io/rest',
	headers: {'x-apikey': '60eb09146661365596af552f'}
});

const apiCoins = axios.create({
	baseURL: 'https://criptoya.com/api/',
});

export default {
    getCoins(coin) {
      return apiCoins.get(`${coin}/ars`);
    },
    postOperation(user, type, cripto, amount, money, dateTime) {
      return apiClient.post("/transactions", {
        user_id: user,
        action: type,
        crypto_code: cripto,
        crypto_amount: amount,
        money: money.toFixed(2),
        datetime: dateTime,
      });
    },
    getUserInformation(user){
      return apiClient.get(`/transactions?q={"user_id": "${user}"}`);
    },
    getCurrentPrice(coin) {
      return apiCoins.get(`satoshitango/${coin}/ars`);
    },
    getMovementsById(id){
      return apiClient.get(`/transactions/${id}`)
    },
    deleteOperation(id){
      return apiClient.delete(`/transactions/${id}`)
    },
    changeMovement(movement){
      return apiClient.patch("transactions/" + movement._id, movement)
    }
}