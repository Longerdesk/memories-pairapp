import React from 'react'
import Header from './Header'
import { useEffect, useState } from "react";
import './css/Home.css';
import './css/common.css';
import axios from 'axios';

function Days() {
  const userid = localStorage.getItem('userid');
  const pairid = localStorage.getItem('pairid');
  const nickname = localStorage.getItem('nickname');

  const [values, setValues] = useState({
    pairid: pairid
  })
  
  const [data, setData] = useState([]);

  const [memoDay, setMemoDay] = useState([]);
  
  useEffect(() => {
    axios.post('http://localhost:8081/getmemoD', values)
    .then(res => {
        console.log("res.data is")
        console.log(res.data);
        console.log("res.data.memoDay is")
        console.log(res.data.memoday);
        setMemoDay(res.data.memoday);
    })
    .catch(err => console.log(err));
  }, [])

  if(pairid != "null"){
    console.log('memoday is ' + memoDay);
    const today = new Date();
    const registerYear = memoDay.slice(0, 4);
    const registerMonth = memoDay.slice(5, 7);
    const registerDate = memoDay.slice(8, 10);
    const nowMonth = (today.getMonth() + 1);
    const nowYear = today.getFullYear();
    const nowDate = today.getDate();
    const ANNIVERSARY = new Date(registerYear, registerMonth - 1, registerDate);
    const diff = today.getTime() - ANNIVERSARY.getTime();
    const dayDifference =  Math.floor(diff/1000/60/60/24);
    let  monthDifference = convertToMonth(registerYear, registerMonth, registerDate, nowYear, nowMonth, nowDate);
    const toYearMonth2 = monthDifference % 12;
    const toYearMonth1 = (monthDifference - toYearMonth2)/12;
    let tillMonthly = getTillMonthly(registerDate, nowMonth, nowDate);
    const nextAnniYear = Number(registerYear)+Number(toYearMonth1) + 1;
    let nextMemoDay = new Date(nextAnniYear, registerMonth - 1, registerDate);
    const diffNextMemo = nextMemoDay.getTime() - today.getTime();
    const tillNextMemo = Math.floor(diffNextMemo/1000/60/60/24);
  
    return (
      <div>
          <Header />
          <div className="tytleFushime">~ DAYS ~</div>
          <h2>{nickname}さんようこそ！</h2>
              <h2>お二人の記念日は{registerYear}-{registerMonth}-{registerDate}です！</h2>
              
          <div className="fushime-container">
              <p className="fushimeCounter">今日は{dayDifference}日目</p>
          </div>
  
          <ul className = "daysContainers">
              <li>
                  <div className="toMonthContainer">
                      <p className="toMonthCounter">{monthDifference}ヵ月</p>
                  </div>
              </li>
              <li>
                  <div className="toYearMonthContainer">
                      <p className="toYearMonthCounter">{toYearMonth1}年と{toYearMonth2}ヵ月</p>
                  </div>
              </li>
          </ul>
  
          <ul className = "daysContainers">
              <li>
                  <h2>{monthDifference + 1}ヵ月まで</h2>
                  <div className="day-container">
                      <p className="dayCounter">{tillMonthly}日</p>
                  </div>
              </li>
              <li>
                  <h2>{toYearMonth1 + 1}年記念日まで</h2>
                  <div className="day-container">
                      <p className="dayCounter">{tillNextMemo}日</p>
                  </div>
              </li>
          </ul>
          <br />
      </div>
    )
  }else{
    return (
        <div>
          <Header />
          <div className="tytleFushime">~ DAYS ~</div>
          <h2>{nickname}さんようこそ！</h2>
          <h2>この機能を利用するには、</h2>
          <h2>まずはペアを登録しよう！</h2>
        </div>
    )
  }

  }

  //reg 2022-03-28  now 2024-1-14  
function convertToMonth(registerYear, registerMonth, registerDate, nowYear, nowMonth, nowDate){
    let count = 0;

    if(registerMonth <= nowMonth){
        count += (nowMonth - registerMonth);
        count += (nowYear-registerYear) * 12;
        if(nowDate < registerDate){
            count -= 1;
        }
    }else{
        count += (12 - (registerMonth - nowMonth));
        count += ((nowYear-registerYear)-1) * 12;
        if(nowDate < registerDate){
            count -= 1;
        }
    }

    return count;
}

function getTillMonthly(registerDate, nowMonth, nowDate){
    let count = 0;
    if(nowDate > registerDate){
        if(nowMonth == 2){
            count = 29 - (nowDate - registerDate);
        }else if(nowMonth == 4 || nowMonth == 6 || nowMonth == 9 || nowMonth == 11){
            count = 30 - (nowDate - registerDate);
        }else{
            count = 31 - (nowDate - registerDate);
        }
    }else{
        count = registerDate - nowDate;
    }

    return count;
}

export default Days