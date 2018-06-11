<template>
  <div class="main">
    <div class="grid-container">
        <div class="quote-item">
            <div class="quote-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mattis lobortis risus.
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .main {
        width: 100%;
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
    }
    .quote-item{
        font-family: 'Libre Baskerville', serif;
        background-image: url('http://members.upc.nl/p.petri/dbt/tegel01-h800.jpg');
        background-size: cover;
        background-position: center center;
        background-color: whitesmoke;
        .quote-text {
            text-rendering: geometricPrecision;
            color: #46608b;
            font-size: 1.5em;
            position: relative;
            width: 70%;
            overflow: hidden;
            -webkit-transform: translate3d(-50%, -50%, 0);
            transform: translate3d(-50%, -50%, 0);
            top: 50%;
            left: 50%;
        }
    }
    @media (max-width: 450px){
        .grid-container{
            --columns: 1;
        }
    }
    @media (min-width: 800px){
        .grid-container{
            --columns: 2;
        }
    }
    @media (min-width: 1080px){
        .grid-container{
            --columns: 3;
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
