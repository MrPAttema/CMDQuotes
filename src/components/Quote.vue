<template>
    <div class="quote-item" >
        <div class="quote-text">
            "{{ quote.quote }}" - {{ quote.quoteBy }}
            <div class="quote-sendby">
                Ingezonden door: {{ quote.sendInBy }}
            </div>
        </div>
        <div class="quote-vote">
            <i class="fas fa-angle-up fa-2x" @click="upvote" :class="{disabled: upvoted}"></i>
            <span class="vote-label">{{ votes }}</span>
            <i class="fas fa-angle-down fa-2x" @click="downvote" :class="{disabled: downvoted}"></i>
            <span hidden readonly> {{ quote.id }}</span>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'

    const voteurl = "https://api.digitalden.nl/api/quote/vote";
    
    export default {
        name: 'quote',
        props: {
            quote: {
                id: Number,
                quote: String,
                quoteBy: String,
                sendInBy: String,
                votes: Number,
            },
            upvoted: Boolean,
            downvoted: Boolean,
        },
        methods: {
            upvote: function() {
                this.upvoted = !this.upvoted;
                this.downvoted = false;
                console.log(this.votes)
                axios.post(voteurl, {
                    id: this.quote.id,
                    votes: this.quote.votes,
                })
                .then(function (response) {
                    console.log("Upvoted");
                })
            },
            downvote: function() {
                this.downvoted = !this.downvoted;
                this.upvoted = false;
                console.log(this.votes)
                axios.post(voteurl, {
                    id: this.quote.id,
                    votes: this.quote.votes, 
                })
                .then(function (response) {
                    console.log("Downvoted");
                })
            }
        },
        computed: {
            votes: function() {
                if (this.upvoted) {
                    return this.quote.votes + 1;
                } else if (this.downvoted) {
                    return this.quote.votes - 1;
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
    span.vote-label {
        background-color: #42567d;
        color: white;
        padding: 5px 15px;
        border-radius: 3px;
        top: -5px;
        position: relative;
    }
    .fa, .fas {
        color: #46608b;
        transition: opacity .25s ease-in-out;
        -moz-transition: opacity .25s ease-in-out;
        -webkit-transition: opacity .25s ease-in-out;
    }
    .disabled {
        color: #b5c7e6;
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