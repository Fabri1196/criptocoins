<template>
<div class="tabla">
    <table>
        <thead>
            <tr>
                <th>Agencia</th>
                <th>Precio Compra</th>
                <th>Efectuar operación</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="agency in Object.keys(agencies)" :key="agency">
                <td>{{agency}}</td>
                <td>$ {{this.agencies[agency].totalAsk}}</td>
                <td><button @click="change(agency)">Comprar</button></td>
            </tr>
        </tbody>
    </table>
</div>
    
</template>

<script>
export default {
    name: 'Agencies',
    props: {
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
            selectedCoin: "",
        }
    },
    methods: {
        change(agency) {
            this.selectedCoin = agency;
            this.$emit("change-view");
            this.$emit('sendCoin', this.selectedCoin);
        },
    }
}
</script>

<style scoped>

</style>
