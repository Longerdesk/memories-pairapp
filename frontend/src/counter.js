import Days from './Days';

const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");
const monthSmall = document.getElementById("monthSmall");
const nextYears = document.getElementById("nextYears");
const tillAnniversary = document.getElementById("tillAnniversary");
const anniToMonth = document.getElementById("anniToMonth");
const nextMonthly = document.getElementById("nextMonthly");
const tillMonthly = document.getElementById("tillMonthly");

function countDaysFromBeginning(){
    const registerYear = 2022;
    const registerMonth = 2;
    const registerDate = 28;
    const now = new Date();
    const ANNIVERSARY = new Date(registerYear, registerMonth, registerDate);
    const diff = now.getTime() - ANNIVERSARY.getTime();
    const nowMonth = now.getMonth();
    const nowYear = now.getFullYear();
    const nowDate = now.getDate();
    if(nowDate > registerDate){
        if(nowMonth != 12){
            nextMonthlyAnni = new Date(nowYear, nowMonth+1, registerDate);
        }else{
            nextMonthlyAnni = new Date(nowYear+1, 1, registerDate);
        }
    }else{
        nextMonthlyAnni = new Date(nowYear, nowMonth, registerDate);
    }
    const tillMonthlyDiff = nextMonthlyAnni.getTime() - now.getTime();

    const dayDifference =  Math.floor(diff/1000/60/60/24);
    const convertToMonth = Math.floor(dayDifference/30);
    const convertToYear = Math.floor(convertToMonth/12);
    const getSmallMonth = Math.floor(convertToMonth - (12*convertToYear));
    const nextYearsNum = Math.ceil(dayDifference/365);
    const tillAnniversaryNum = Math.ceil(365*nextYearsNum-dayDifference);
    const tillAnniMonth = Math.floor(tillAnniversaryNum/30);
    const tillMonthlyNum = Math.floor(tillMonthlyDiff/1000/60/60/24);


    day.innerHTML = dayDifference;
    month.innerHTML = convertToMonth;
    year.innerHTML = convertToYear;
    monthSmall.innerHTML = getSmallMonth;
    nextYears.innerHTML = nextYearsNum;
    tillAnniversary.innerHTML = tillAnniversaryNum;
    anniToMonth.innerHTML = tillAnniMonth;
    nextMonthly.innerHTML = convertToMonth+1;
    tillMonthly.innerHTML = tillMonthlyNum;
}

countDaysFromBeginning();