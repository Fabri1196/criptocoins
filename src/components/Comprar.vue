<template>
    <div>
        <h4 class="agency">{{selectedCoin.toUpperCase()}}</h4>
        <label>Monto en pesos</label><input type="number" v-model.number="montoPesos" @input="calcularCripto"><br>
        <br>
        <label>Cantidad de criptomoneda</label><input type="number" v-model.number="cantidadCripto" @input="calcularPeso"><br>
        <br>
        <button @click="comprar">Comprar</button>
        <button @click="volver">Volver</button><br>
        <br>
    </div>
</template>


<script>
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
        view: {
            type: Number,
            required: true,
        }
    },
    data() {
        return {
            montoPesos: "",
            cantidadCripto: "",
        }
    },
    methods: {
        calcularCripto() {
            this.cantidadCripto = (this.montoPesos * 1/(this.agencies[this.selectedCoin].totalAsk));
        },
        calcularPeso() {
            this.montoPesos = (this.cantidadCripto * this.agencies[this.selectedCoin].totalAsk);
            
        },
        comprar(){
            this.$emit('registrar', this.cantidadCripto, this.montoPesos);
        },
        volver() {
            this.$emit("change-view");
        },
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

