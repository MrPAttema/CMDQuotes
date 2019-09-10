<template>
<div>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/topvoted">Top Voted</router-link> |
            <router-link to="/upload">Inzenden</router-link>
        </div>
        <router-view/>
        <!-- <transition name="router-anim" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        </transition> -->
    </div>
</div>
</template>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Libre+Baskerville');
    @import url('https://fonts.googleapis.com/css?family=Open+Sans');
    html, body {
        margin: 0;
    }
    .announcement{
       position: fixed;
       height: 35px; 
       width: 100%;
       z-index: 999;
       background-color: #fff;
       font-family: 'Open Sans', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
       a {
            line-height: 35px;
            width: 100%;
            text-align: -webkit-center;
            margin: 0 auto;
        }
    }
    #app {
        font-family: 'Open Sans', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100vh;
        padding-top: 35px;
    }
    #nav {
        line-height: 50px;
        position: fixed;
        bottom: 0;
        height: 50px;
        width: 100%;
        box-shadow: 0px 0px 7px 3px #e4e4e4;
        z-index: 100;
        background-color: white;
    }
    #nav a {
        font-weight: bold;
        color: #2c3e50;
        text-decoration: none;
    }
    #nav a.router-link-exact-active {
        color: #5a9eb3;
    } 
</style>
