export default {
    // calculate the date of a month ago
    monthAgo: function (inputDate) {
    
        let year = parseInt(inputDate.substring(0, 4));
        let month = parseInt(inputDate.substring(5, 7));
        let day = parseInt(inputDate.substring(8, 10));

        let dateObj = new Date(year, month - 1, day);

        // Getting required values
        const newyear = dateObj.getFullYear();
        const newmonth = dateObj.getMonth();
        const newday = dateObj.getDate();

        // Creating a new Date (with the delta)
        const monthAgoDate = new Date(newyear, newmonth, newday - 30);

        // final result

        const finalyear = monthAgoDate.getFullYear();
        let finalmonth = monthAgoDate.getMonth() + 1;
        if(finalmonth < 10) {
            finalmonth = "0" + finalmonth;
        }

        let finalday = monthAgoDate.getDate();
        if(finalday < 10) {
            finalday = "0" + finalday;
        }


        const final = finalyear + "-" + finalmonth + "-" + finalday;

        return(final);
    }
}