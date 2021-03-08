(() => {
    let htmlHeader = document.getElementById("troll-tuesday-header");
    let htmlStatus = document.getElementById("troll-tuesday-status");

    function nextTrollTuesday(year, month) {
        // get days in the specified month
        let daysInMonth = new Date(year, month, 0).getDate();

        // third tuesday of each month.
        let tuesday = 0;
        for (let i = 0; i < daysInMonth; i++) {
            let thisDate = new Date(year, month, i);

            // 2 is day for tuesday
            if (thisDate.getDay() == 2) {
                tuesday++;

                if (tuesday >= 3) {
                    // found it!
                    return thisDate;
                }
            }
        }

        throw new Error(`No troll tuesday in month ${month} of year ${year}!`);
    }
    
    function updateTrollTuesday() {
        let date = new Date();
        let trollDate = nextTrollTuesday(date.getFullYear(), date.getMonth());
        //let trollDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 13, 0);

        if (date.getDate() == trollDate.getDate()) {
            // it's troll tuesday!
            htmlHeader.active = false;
            htmlStatus.innerHTML = "Today is Troll Tuesday.";
        } else {
            // not troll tuesday
            htmlHeader.active = false;
            htmlStatus.innerHTML = timerString(trollDate - date);
        }
    }

    function timerString(milliseconds) {
        // get components
        let seconds = Math.trunc(milliseconds / 1000);
        let minutes = Math.trunc(seconds / 60);
        let hours = Math.trunc(minutes / 60);
        let days = Math.trunc(hours / 24);

        return [
            unit(days, "day"),
            unit(hours % 24, "hour"),
            unit(minutes % 60, "minute"),
            unit(seconds % 60, "second"),
        ].join(", ");
    }

    function unit(num, unit) {
        if (num == 1)
            return `${num} ${unit}`;
        else
            return `${num} ${unit}s`;
    }

    window.setInterval(updateTrollTuesday, 1000);

    // call once to have ready for page load
    updateTrollTuesday();
})();
