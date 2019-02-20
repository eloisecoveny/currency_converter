import Vue from "vue";

document.addEventListener("DOMContentLoaded", () => {
  new Vue({
    el: "#app",
    data: {
      rates: {},
      conversionAmount: null,
      selectedCurrency: "",
      convertedValue: null
    },
    mounted(){
      this.getCurrencies();
    },
    methods: {
      getCurrencies: function(){
        fetch("https://api.exchangeratesapi.io/latest")
          .then(response => response.json())
          .then(currencies => this.rates = currencies.rates);
      },
      calculateConversion: function(){
        if(this.conversionAmount > 0){
          const result = this.conversionAmount * this.rates[this.selectedCurrency];
          this.convertedValue = result.toFixed(2);
        };
      }
    }
  })
})
