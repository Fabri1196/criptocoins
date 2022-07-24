<template>
    <h3>Editar movimiento</h3>
    <form
        @submit.prevent="cambiarMovimiento"
        @reset="volver"
    >
        <select v-model="newValues.crypto_code">
            <option value="btc">Bitcoin</option>
            <option value="eth">Etherium</option>
            <option value="usdt">Tether</option>
        </select>

        <select v-model="newValues.action">
            <option value="purchase">Comprar</option>
            <option value="sale">Ventar</option>
        </select>

        <label>Monto en pesos</label>
            <input type="number" v-model.number="newValues.money" step="0.01" 
            @input="calcularCrypto">
            <br>
        <label>Cantidad de criptomoneda</label>
            <input type="number" v-model.number="newValues.crypto_amount" step="0.00001"
            @input="calcularPeso">
            <br>
            <br>
        <div>
            <input id="botones"
                type="submit"
                value="Aceptar"
                :disabled="
                    newValues.crypto_amount <= 0 ||
                    newValues.money <= 0
                "
            />
            <input id="botones" type="reset" value="Cancelar" />
        </div>
    </form>
    
</template>

<script>
export default{
    data() {
        return{
            newValues: this.information,
            price: this.price,
        }
    },
    props: {
        information:{
            required: true,
        },
        price: {
            required: true,
        }
    },
    methods:{
        calcularCrypto() {
            this.newValues.crypto_amount = (this.newValues.money * 1/this.price).toFixed(5);
        },
        calcularPeso() {
            this.newValues.money = (this.newValues.crypto_amount * this.price).toFixed(2);
            
        },
        volver() {
            this.$emit("goBack")
        },
        cambiarMovimiento() {
            this.$emit("changeOperation", this.newValues)
        }
    }
}
</script>

<style scoped>
#botones{
    font-size: 20px;
    margin: 0px 2px 0px 2px;
    padding: 0px;
    font-size: 15px;
    background-color: rgb(75, 94, 177);
    color: white;
    font-family: 'Roboto Slab', serif;
}
</style>

