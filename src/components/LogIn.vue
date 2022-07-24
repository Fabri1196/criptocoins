<template>
    <div id="ingreso">
        <h1>Bienvenido a CryptoMarket</h1>
        <input type="text" placeholder="Ingrese su usuario" v-model="usuario"><br>
        <br>
        <button @click="entrar">Ingresar</button>
        <p>{{error}}</p>
        <Compra :usuario="usuario"></Compra>
    </div>
</template>

<script>
export default {
    data() {
        return {
            usuario:"",
            error: "",
        }
    },
    props: {
        showMain: {
            type: Number,
            required: true,
        }
    },
    methods: {
        entrar() {
            if((this.usuario).trim() != "")
            {
                this.$emit('ingresar')
                this.$emit('user-log-in', this.usuario)
            }
            else{
                this.error ="Debe ingresar un usuario";
            }
        }
    }
}
</script>

<style scoped>
    #ingreso{
        background-color: #474d91;
        border-radius: 20px;
        box-sizing: border-box;
        height: 350px;
        padding: 20px;
        width: 320px;
    }

    input{
        width: 220px;
        font-size: 18px;
        margin-top: 50px;
        border: 1px black solid;
        border-radius: 5px;
    }

    button{
        font-size: 20px;
        margin-top: 40px;
        padding: 5px;
        border-radius: 5px;
        border: none;
        background-color: rgb(9, 15, 94)
    }

    h1{
        color: white;
    }

    p{
        color: rgb(155, 4, 4);
        font-size: 20px;
        font-weight: bold;
    }
</style>
