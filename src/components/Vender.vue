<template>
    <div>
        <h4 class="agency">{{selectedCoin.toUpperCase()}}</h4>
        <label>Monto en pesos</label><input type="number" v-model.number="montoPesos" @input="calcularCripto"><br>
        <br>
        <label>Cantidad de criptomoneda</label><input type="number" v-model.number="cantidadCripto" @input="calcularPeso"><br>
        <br>
        <button @click="comprar">Vender</button>
        <button @click="volver">Volver</button><br>

    </div>
    <div v-show="view === 1">
        <p>No posee cantidad suficiente de criptomoneda para realizar la operación</p>
    </div>

</template>

<script>
import { mapState } from "vuex"; 

export default{
    props: {
        selectedCoin: {
            type: String,
            required: true,
        },
        agencies: {
            type: Object,
            required: true,
        },
        coin: {
            type: String,
            required: true,
        },
        view: {
            type: Number,
            required: true,
        }
    },
    data() {
        return {
            montoPesos: "",
            cantidadCripto: "",
            view: 0,
        }
    },
    computed: {
        ...mapState({ totalBTC: (state) => state.totalBTC,
        totalETH: (state) => state.totalETH,
        totalUSDT: (state) => state.totalUSDT,})
    },
    methods: {
        calcularCripto() {
            this.cantidadCripto = (this.montoPesos * 1/(this.agencies[this.selectedCoin].totalBid));
        },
        calcularPeso() {
            this.montoPesos = (this.cantidadCripto * this.agencies[this.selectedCoin].totalBid);
        },
        comprar(){
            if(this.coin === "btc"){
                if(this.totalBTC >= this.cantidadCripto){
                    this.$emit('registrar', this.cantidadCripto, this.montoPesos);
                }
                else{
                    this.view = 1;
                }
            };
            if(this.coin === "eth"){
                if(this.totalETH >= this.cantidadCripto){
                    this.$emit('registrar', this.cantidadCripto, this.montoPesos);
                }
                else{
                    this.view = 1;
                }
            };
            if(this.coin === "usdt"){
                if(this.totalUSDT >= this.cantidadCripto){
                    this.$emit('registrar', this.cantidadCripto, this.montoPesos);
                }
                else{
                    this.view = 1;
                }
            }
        },
        volver() {
            this.$emit("change-view");
        }
    }
}
</script>

<style scoped>
h4{
    font-family: Verdana, Arial, sans-serif;
    font-size: 20px;
}

button{
    font-size: 20px;
    padding: 3px;
}
</style>