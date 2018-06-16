<template>
  <div class="main"> 
    <h1>Stuur hier je quote in!</h1>
    <form class="upload-quote" @submit.prevent="onSubmit">
        Ingezonden door:<br>
        <input type="text" v-model="name" name="name" autofocus>

        Wie citeer je?<br>
        <input type="text" v-model="quotename" name="quotename">

        Quote (Max: 100 tekens):<br>
        <span><i>{{ remaincharactersText }}</i></span>
        <textarea v-model="quote" v-on:keyup="charactersLeft()" rows="3" type="text" name="quote"></textarea>
          <vue-recaptcha
            ref="invisibleRecaptcha"
            @verify="onVerify"
            @expired="onExpired"
            size="invisible"
            :sitekey="sitekey">
          </vue-recaptcha>
          <button type="submit">I'm still gonna send it!</button>
        <div class="copyright">&#169; 2018 - Patrick Attema</div>
    </form>
  </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    import VueRecaptcha from 'vue-recaptcha'

    const url = "https://api.patrickattema.nl/v3/quotes/create"

    export default {
        components: { 
             'vue-recaptcha': VueRecaptcha
        },
        data () {
            return {
                name: '',
                quotename: '',
                quote : '',
                maxcharacter: 100,
                remaincharactersText: '',
                sitekey: ''
            }
        },
        methods: {
            onVerify: function (response) {
                console.log('Verify: ' + response)
            },
            onExpired: function () {
                console.log('Expired')
            },
            resetRecaptcha () {
                this.$refs.recaptcha.reset() // Direct call reset method
            },
            charactersLeft() {
                if (this.quote.length > this.maxcharacter) {
                    this.remaincharactersText = "Limiet met "+this.maxcharacter+" overschreden.";
                } else {
                    var remainCharacters = this.maxcharacter - this.quote.length;
                    this.remaincharactersText = "Nog " + remainCharacters + " tekens over.";
                }
            },
            onSubmit: function (){
                this.$refs.invisibleRecaptcha.execute()
                var self = this
                axios.post(url, {
                    name: self.name,
                    quotename: self.quotename,
                    quote: self.quote
                })
                .then(function (response) {
                    self.name = '';
                    self.quotename = '';
                    self.quote = '';
                    alert(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });       
            }
        }
    }
</script>

<style>
    .grecaptcha-badge {
        bottom: 55px !important;
        z-index: 300;
    }
    .main {
        width: 100%;
        position: absolute;
    }
    .upload-quote{
        max-width: 300px;
        margin: auto;
    }
    .copyright {
        margin-top: 15px;
        font-family: 'Open Sans', sans-serif;
    }
    button {
        padding: 10px 20px;
        border-style: none;
        width: 100%;
        border-radius: 3px;
        font-family: 'Open Sans', sans-serif;
        border-radius: 3px;
        border-style: solid;
        border-width: thin;
        border-color: #a0a6ff;
        background-color: #b5b7e2;
    } 
    input {
        padding: 10px 20px;
        border-style: none;
        width: 100%;
        border-radius: 3px;
        font-family: 'Open Sans', sans-serif;
    }  
    input[type="text"] {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        border-radius: 3px;
        border-style: solid;
        border-width: thin;
        border-color: #a2a2a2;
    }
    textarea {
        max-width: 100%;
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        border-radius: 3px;
        border-style: solid;
        border-width: thin;
    }
</style>


