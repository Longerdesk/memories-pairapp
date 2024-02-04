import React, {useEffect, useState} from 'react'
import Header from './Header'
import axios from 'axios';
import './css/Home.css';
import './css/common.css';

import './css/SignUp.css';

function Home() {
    const userid = localStorage.getItem('userid');
    const nickname = localStorage.getItem('nickname');
    //const memoDay = localStorage.getItem('memoDay');

  return (
    <div>
        <Header />
        <h2>   </h2>
        <h2>{nickname}さんようこそ！</h2>
        <p>～Memoriesは、2人の大切な思い出を記録するウェブサイトです～</p>
        <p className='homeDesc'><img className = "iconPic" src="/images/pair1.png" alt="..." />  ペアの登録</p>
        <p className='homeDesc'><img className = "iconPic" src="/images/calendar.png" alt="..." />   日数に関するいろいろ</p>
        <p className='homeDesc'><img className = "iconPic" src="/images/photo3.png" alt="..." />   思い出の写真</p>
        <p className='homeDesc'><img className = "iconPic" src="/images/account.png" alt="..." />   アカウント情報</p>
        <p className='homeDesc'><img className = "iconPic" src="/images/logout.png" alt="..." />   ログアウト</p>
        <br />
    </div>
  )
}

export default Home