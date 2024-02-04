import Header from './Header'
import FileUPload from './FileUPload'
import axios from 'axios';
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import './css/Home.css';
import './css/common.css';
import './css/Pair.css';

function Account() {


  return (
    <div>
        <Header />
        <FileUPload/>
    </div>
  )
}

export default Account

/*
const [values, setValues] = useState({
  nickname: '',
})

const handleInput = (event) => {
  setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
}


const handleSubmit = (event) => {

}


<h2>ペアの登録をしよう！</h2>
<h2>パートナーと同じペアIDと記念日を入力してね！</h2>
<form action = "" onSubmit={handleSubmit}>
    <h2>ペア登録</h2>
    <div className="group">
        <input type="text" name='pairid'
        onChange={handleInput}/><span className="highlight"></span><span className="bar"></span>
        <label>ペア ID</label>
    </div>
    <button type='submit'className='btn btn-success w-100'>登録</button>
</form>*/