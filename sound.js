var lastClap = (new Date()).getTime();

app.factory('sound', function() {

    return {
        detectClap: function(data) {

            var t = (new Date()).getTime();
            if (t - lastClap < 200) return false; 
            var zeroCrossings = 0,
                highAmp = 0;
            for (var i = 1; i < data.length; i++) {
                if (Math.abs(data[i]) > 0.25) highAmp++; 
                if (data[i] > 0 && data[i - 1] < 0 || data[i] < 0 && data[i - 1] > 0) zeroCrossings++;
            }
            if (highAmp > 20 && zeroCrossings > 30) { 
                lastClap = t;
                return true;
            }
            return false;
        }
    }

})