// Let's create our own strategy
var strat = {};


// Prepare everything our strat needs
strat.init = function() {
    this.addTulipIndicator('ema10', 'ema', {
        optInTimePeriod: this.settings.slow
    });
    this.addTulipIndicator('ema21', 'ema', {
        optInTimePeriod: this.settings.fast
    });
}

// Based on the newly calculated
// information, check if we should
// update or not.
strat.check = function(candle) {
    const ema10 = this.tulipIndicators.ema10.result.result;
    const ema21 = this.tulipIndicators.ema21.result.result;

    if(ema10 > ema21){
        this.advice({
            direction: 'long',
            trigger: {
                type: 'trailingStop',
                trailPercentage: 8
            }
        });
    } else {
        this.advice('short');
    }
}

module.exports = strat;