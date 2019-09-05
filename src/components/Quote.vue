<template>
    <div class="quote-item" >
        <div class="quote-text">
            "{{ quote.quote }}" - {{ quote.quote_by }}
            <div class="quote-sendby">
                Ingezonden door: {{ quote.send_in_by }}
            </div>
        </div>
        <div class="quote-vote">
            <i class="fas fa-angle-up fa-2x" @click="upvote" :class="{disabled: upvoted}" :disabled="voted === true"></i>
            <span class="vote-label-voted" v-if="voted === true">{{ votes }}</span>
            <span class="vote-label" v-else>{{ votes }}</span>
            <i class="fas fa-angle-down fa-2x" @click="downvote" :class="{disabled: downvoted}" :disabled="voted === true"></i>
            <span hidden readonly> {{ quote.id }}</span>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    import VueCookies from 'vue-cookies'

    Vue.use(VueCookies)

    const voteurl = "https://api.digitalden.nl/api/quote/update/";
    
    export default {
        name: 'quote',
        data() {
            return {
                upvoted: false,
                downvoted: false,
                voted: false,
            }
        },
        props: {
            quote: {
                id: Number,
                quote: String,
                quoteBy: String,
                sendInBy: String,
                votes: Number,
            }
        },
        created() {
            this.checkVote();
            this.$cookies.config('12h');
        },
        methods: {
            checkVote: function() {
                if ((this.$cookies.get("quoteVote" + this.quote.id)) == 1) {
                    this.voted = true;
                    this.upvoted = true;
                    this.downvoted = true;
                    return true;
                }
                return false;
            },
            upvote: function() {
                var self = this;
                self.upvoted = !self.upvoted;
                self.downvoted = false;
                if (!self.checkVote() == true) {
                    var voteVar = self.quote.votes +1;
                    axios.post(voteurl + self.quote.id, {
                        id: self.quote.id,
                        votes: voteVar,
                    })
                    self.$cookies.set("quoteVote" + self.quote.id, 1);
                    self.voted = true;
                }
            },
            downvote: function() {
                var self = this;
                self.downvoted = !self.downvoted;
                self.upvoted = false;   
                if (!self.checkVote() == true) {
                    var voteVar = self.quote.votes -1;
                    axios.post(voteurl + self.quote.id, {
                        id: self.quote.id,
                        votes: voteVar, 
                    })
                    self.$cookies.set("quoteVote" + self.quote.id, 1,);
                    self.voted = true;
                }
            }
        },
        computed: {
            votes: function() {
                if (this.upvoted == true) {
                    return this.quote.votes +1;
                } else if (this.downvoted == true) {
                    return this.quote.votes -1;
                } else {
                    return this.quote.votes;
                }
            } 
        }
    }
</script>

<style lang="scss" scoped>
    .main {
        width: 100%;
        top: 0;
        position: absolute;
    }
    span.vote-label-voted {
        background-color: #b5c7e6;
        color: white;
        padding: 5px 15px;
        margin: 0 10px;
        border-radius: 3px;
        top: -5px;
        position: relative;
    }
     span.vote-label {
        background-color: #42567d;
        color: white;
        padding: 5px 15px;
        margin: 0 10px;
        border-radius: 3px;
        top: -5px;
        position: relative;
    }
    .fa, .fas {
        color: #46608b;
        transition: opacity .25s ease-in-out;
        -moz-transition: opacity .25s ease-in-out;
        -webkit-transition: opacity .25s ease-in-out;
        pointer-events: visible;
        cursor: pointer;
    }
    .disabled {
        color: #b5c7e6;
        pointer-events: none;

    }
    .quote-item{
        font-family: 'Libre Baskerville', serif;
        background-image: url('../assets/tegel_2.jpg');
        background-size: cover;
        background-position: center center;
        background-color: whitesmoke;
        .quote-text {
            text-rendering: geometricPrecision;
            color: #46608b;
            font-size: 1.2em;
            position: relative;
            width: 70%;
            height: 40%;
            overflow: hidden;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            top: 52%;
            left: 50%;
            .quote-sendby {
                font-size: 0.65em;
                margin: 5px auto;
                max-width: 80%;
            }
        }
    }
    .quote-vote {
        height: 30%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: relative;
    }
</style>