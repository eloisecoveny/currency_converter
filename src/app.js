import Vue from "vue";

document.addEventListener("DOMContentLoaded", () => {
  new Vue({
    el: "#app",
    data: {
      rates: {},
      fromSelectedCurrency: "",
      euroConversionValue: null,
      toSelectedCurrency: "",
      selectedCurrencyValue: null
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
        if(this.euroConversionValue > 0){
          const rate = this.rates[this.toSelectedCurrency] / this.rates[this.fromSelectedCurrency];
          const result = rate * this.euroConversionValue;
          this.selectedCurrencyValue = result.toFixed(2);
        };
      },
      convertToBaseValue: function(){
        const euroRate = 1 / this.rates[this.toSelectedCurrency];
        const result = this.selectedCurrencyValue * euroRate;
        this.euroConversionValue = result.toFixed(2);
      },
      convertToNewCurrencyValue: function(){
        const rate = this.rates[this.fromSelectedCurrency] / this.rates[this.toSelectedCurrency];
        const result = rate * this.selectedCurrencyValue;
        this.euroConversionValue = result.toFixed(2);
      }
    }
  })
});
