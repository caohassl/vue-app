<template>
    <div id="app">
        <div><img alt="Vue logo" src="./assets/logo.png"></div>
        <div>you load this page at {{date}}<br><br></div>
        <HelloWorld></HelloWorld>
    </div>
</template>


<script>
    import HelloWorld from './components/HelloWorld.vue'

    export default {
        name: 'app',
        components: {
            HelloWorld
        },
        data: function () {
            return {date: new Date().toUTCString()}
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
