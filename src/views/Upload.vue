<template>
    <div class="main"> 
        <h1>Stuur hier je quote in!</h1>
        <form class="upload-quote" @submit.prevent="onSubmit">
            <input type="text" v-model="name" name="name" autofocus placeholder="Jouw naam">
            <input type="text" v-model="quotename" name="quotename" placeholder="Wie citeer je">
            Quote (Max: 100 tekens):<br>
            <span><i>{{ remaincharactersText }}</i></span>
            <textarea v-model="quote" v-on:keyup="charactersLeft()" rows="3" type="text" name="quote" placeholder="Je quote"></textarea>

            <!-- <span>Kies je tegel:</span>
            <div class="tiles-container" id="get-tile">
                <div class="tile">
                    <label class="form-radio">
                        <img for="one" class="tile-image" src="../assets/tegel_1.jpg" alt="">
                        <input type="radio" id="one" value="1" v-model="picked">
                    </label>
                </div>
                <div class="tile">
                    <label class="form-radio">
                        <img for="two" class="tile-image" src="../assets/tegel_2.jpg" alt="">
                        <input type="radio" id="two" value="2" v-model="picked">
                    </label>        
                </div>
            </div> -->

            <vue-recaptcha
                ref="invisibleRecaptcha"
                @verify="onVerify"
                @expired="onExpired"
                size="invisible"
                :sitekey="siteKey">
            </vue-recaptcha>

            <button action="submit">Stuur dit in!</button>

            <div class="copyright">&#169; 2019 - Patrick Attema
                <img src="../assets/PoweredByDD.png" alt="">
            </div>      
        </form>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    import VueRecaptcha from 'vue-recaptcha';

    const url = "http://api.digitalden.nl/api/quote/create"

    export default {
        components: {
            'vue-recaptcha': VueRecaptcha
        },
        data () {
            return {
                picked: '',
                name: '',
                quotename: '',
                quote : '',
                maxcharacter: 100,
                remaincharactersText: '',
                siteKey: '6Lc-7bcUAAAAAMZLJBjFl8rQFmnTubr7lDFHgfkt',
            }
        },
        methods: {
            onVerify: function (response) {
                var self = this;
                console.log(response);
                axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
                axios.post(url, {
                    name: self.name,
                    quotename: self.quotename,
                    quote: self.quote,
                    recaptcha: response
                })
                .then(function (response) {
                    alert(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            onExpired: function () {
                console.log('Expired')
            },
            resetRecaptcha () {
                this.$refs.recaptcha.reset();
            },
            onSubmit: function (){
                this.$refs.invisibleRecaptcha.execute()  
            },
            charactersLeft() {
                if (this.quote.length > this.maxcharacter) {
                    this.remaincharactersText = "Limiet met "+this.maxcharacter+" overschreden.";
                } else {
                    var remainCharacters = this.maxcharacter - this.quote.length;
                    this.remaincharactersText = "Nog " + remainCharacters + " tekens over.";
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

[grecaptcha-badge] {
    position: fixed;
    bottom: 40px;
}

.tiles-container {
        // The content width you use on your website
        --content-width: 25%;
        
        // The size of the gutter  
        --gutter: 0px;
        
        // The amount of columns
        --columns: 4;  
        
        // This is the calculation for the row height.   
        --row-size: calc(
            ( var(--content-width) - (var(--gutter) * (var(--columns) - 1))
            ) / var(--columns)
        );
        
        display: grid;

        width: 100%;
        
        grid-template-columns: repeat(var(--columns), 1fr);
        grid-auto-rows: var(--row-size);

        grid-column-gap: var(--gutter);
        grid-row-gap: var(--gutter);
        
        padding-bottom: 50px;
    }

    .main {
        position: absolute;
        margin-bottom: 75px;
        width: 100%
    }
    .upload-quote{
        max-width: 400px;
        margin: auto;
    }
    img {
        margin-top: 10px;
        max-width: 60%;
        margin: 0 auto;
    }
    .tile-image {
        max-width: 95%;
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
        cursor: pointer;
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
        font-family: 'Open Sans', sans-serif;
    }

</style>


