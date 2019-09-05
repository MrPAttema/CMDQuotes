<template id="quote-vote">
    <div class="quote-vote">
        <i class="fas fa-angle-up fa-2x" @click="upvote(quote)" :class="{disabled: upvoted}"></i>
        <span class="vote-label">{{ quote.votes }}</span>
        <i class="fas fa-angle-down fa-2x" @click="downvote(quote)" :class="{disabled: downvoted}"></i>
        <span hidden readonly> {{ quote.id }}</span>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'

    const voteurl = "https://api.digitalden.nl/api/quote/update";
    
    export default {
        template: "#quote-vote",
        props: ['quote'],
        data: function() {
            return {
                upvoted: false,
                downvoted: false,
            }
        },
        methods: {
            upvote: function(quote) {
                this.upvoted = !this.upvoted;
                this.downvoted = false;
                quote.votes ++;
                console.log(quote.votes)
                axios.post(voteurl, {
                    id: quote.id,
                    vote: quote.votes,
                })
                .then(function (response) {
                    console.log(response.data);
                })  
            },
            downvote: function(quote) {
                this.downvoted = !this.downvoted;
                this.upvoted = false;
                this.votes(quote)
                var votes = quote.votes
                console.log(votes)
                quote.votes --;
                axios.post(voteurl, {
                    id: quote.id,
                    vote: quote.votes, 
                })
                .then(function (response) {
                    console.log(response.data);
                })  
            }
        },
        computed: {
            votes: function(quote) {
                console.log(quote.votes)
                if (this.upvoted) {
                    return this.votes ++
                } else if (this.downvoted) {
                    return this.votes --;
                } else {
                    return this.votes;
                }
            }
        }
    }
</script>