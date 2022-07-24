<template>
  <div>
    <h3>Historia</h3>
    <div class="tabla">
      <table>
        <thead>
            <tr>
                <th>Coin</th>
                <th>Operación</th>
                <th>Cantidad</th>
                <th>Dinero Invertido</th>
                <th>Fecha</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
             <tr v-for="movement in $store.state.movements" :key="movement.user_id">
                <td>{{movement.crypto_code.toUpperCase()}}</td>
                <td>{{movement.action.toUpperCase()}}</td>
                <td>{{movement.crypto_amount}}</td>
                <td>$ {{movement.money}}</td>
                <td>{{date(movement)}}</td>
                <td>
                  <button @click="operation(movement._id, 2)">Ver</button>
                  <button @click="operation(movement._id, 3)">Editar</button>
                  <button @click="operation(movement._id, 4)">Eliminar</button>
                </td>
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
    };
  },
  computed:
    mapState({usuario: (state) => state.user,}),
    ...mapGetters(['getBTCPrice', 'getETHPrice', 'getUSDTPrice']),

  methods: {
    ...mapMutations(['getCurrentPriceBTC', 'getCurrentPriceETH', 'getCurrentPriceUSDT']),
    
    operation(id, view) {
			this.$emit('showOperation', id, view);
		},

    date(movement) {
				return (
					movement.datetime.substring(8, 10) +
					"-" +
					movement.datetime.substring(5, 7) +
					"-" +
					movement.datetime.substring(0, 4) +
					" / " +
					movement.datetime.substring(11, 13) +
					":" +
					movement.datetime.substring(14, 16)
				);
		},
  }
}
</script>

<style scoped>

</style>