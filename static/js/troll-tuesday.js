(() => {
    let htmlHeader = document.getElementById("troll-tuesday-header");
    let htmlStatus = document.getElementById("troll-tuesday-status");

    function getTrollTuesdayIn(year, month) {
        // get days in the specified month
        let daysInMonth = new Date(year, month, 0).getDate();

        // third tuesday of each month.
        let tuesday = 0;
        for (let i = 1; i <= daysInMonth; i++) {
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
    
    function nextTrollTuesday(dateRef) {
        let date = new Date(dateRef.getTime());

        let troll = getTrollTuesdayIn(date.getFullYear(), date.getMonth());

        if (date.getDate() > troll.getDate()) {
            // look in next month
            date.setMonth(date.getMonth() + 1);
            return getTrollTuesdayIn(date.getFullYear(), date.getMonth());
        } else {
            return troll;
        }
    }

    function updateTrollTuesday() { 
        let date = new Date();
        //let date = new Date(2021, 2, 22);
        let trollDate = nextTrollTuesday(date);

        if (date.getDate() == trollDate.getDate() &&
            date.getMonth() == trollDate.getMonth() &&
            date.getFullYear() == trollDate.getFullYear()) {
            // it's troll tuesday!
            htmlStatus.innerHTML = "Today is Troll Tuesday.";
        } else {
            // not troll tuesday
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
