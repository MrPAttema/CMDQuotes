<template>
    <div class="main">
        <div class="grid-container" v-infinite-scroll="loadMore" infinite-scroll-distance="-10" infinite-scroll-disabled="busy" infinite-scroll-throttle-delay="25">
            <Quote :quote="quote" v-for="quote in quotes" :key="quote.id"/>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    import Quote from '@/components/Quote.vue'

    const geturl = "https://api.digitalden.nl/api/quote/read";

    export default {
        components: {
            Quote,
        },
        data() {
            return {
                busy: false,
                atEnd: false,
                quotes: [],
                results: [],
                limit: 100,
            }
        },
        methods: {
            loadMore() {
                if (!this.atEnd) {
                    this.busy = true;
                    axios.get(geturl).then(res => {
                        const append = res.data.slice(this.quotes.length,this.quotes.length + this.limit)
                        this.quotes = this.quotes.concat(append);
                        this.busy = false;
                        if (this.quotes.length == res.data.length) {
                            this.atEnd = true;
                        }
                    }).catch( (err) => {
                        this.busy = false;
                    })
                }
            }
        },
        created() {
            this.loadMore();
        }
    }
</script>

<style lang="scss" scoped>
    .banner {
        height: 30px;
        line-height: 30px;
        background-color: #42567d;
        color: white;
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
    }
    .disabled {
        color: #b5c7e6;
    }
    .grid-container {
        // The content width you use on your website
        --content-width: 100vw;

        // The size of the gutter
        --gutter: 0px;

        // The amount of columns
        --columns: 1;

        // This is the calculation for the row height.
        --row-size: calc(
            ( var(--content-width) - (var(--gutter) * (var(--columns) - 1))
            ) / var(--columns)
        );

        display: grid;

        width: 100%;
        max-width: var(--content-width);

        grid-template-columns: repeat(var(--columns), 1fr);
        grid-auto-rows: var(--row-size);

        grid-column-gap: var(--gutter);
        grid-row-gap: var(--gutter);

        padding-bottom: 10px;
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
            font-size: 1.3em;
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
        height: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: relative;
    }
    @media (max-width: 414px){
        .grid-container{
            --columns: 1;
        }
        .quote-text {
            font-size: 1.1em !important;
        }
    }
    @media (min-width: 650px){
        .grid-container{
            --columns: 2;
        }
        .quote-text {
            font-size: 1em !important;
        }
    }
    @media (min-width: 1080px){
        .grid-container{
            --columns: 3;
        }
        .quote-text {
            font-size: 1.2em !important;
        }
    }
    @media (min-width: 1440px){
        .grid-container{
            --columns: 4;
        }
    }
    @media (min-width: 2000px){
        .grid-container{
            --columns: 5;
        }
    }
    @media (min-width: 4096px){
        .grid-container{
            --columns: 6;
        }
    }
</style>
