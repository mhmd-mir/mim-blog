import moment from "jalali-moment"

const toJalali = (date) => {
    if(date)
        return moment(date.slice(0,10), 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')
    return 'بدون تاریخ'
}


export default toJalali