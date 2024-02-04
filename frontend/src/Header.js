import React, {useEffect, useState} from 'react';
import './css/SignUp.css';
import './css/common.css';
import './css/Header.css';
import Days from './Days';

import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';

function Header(){
    //const pairid = localStorage.getItem('pairid');
    const [data, setData] = useState([]);

    const [values, setValues] = useState({
        userid: localStorage.getItem('userid')
    })

    useEffect(() => {
        axios.post('http://localhost:8081/account', values)
        .then(res => {
            setData(res.data);
            console.log(res);
        })
        .catch(err => console.log(err));
    }, [])



    return(
            <>
        <div className="Header">
            <h2 className = "tytle">
                <a className="memories" href="/home">Memories</a>
            </h2>
            <nav className="pc-nav">
                <ul className = "linklist">
                    <ul className = "icon">
                        <li><a href="/pair"><img className = "iconPic" src="/images/pair1.png" alt="..." /></a></li>
                        <li><a className="iconText" href="/pair">Pair</a></li>
                    </ul>
                    <ul className = "icon">
                        <li><a href="/days"><img className = "iconPic" src="/images/calendar.png" alt="..." /></a></li>
                        <li><a className="iconText" href="/days">Days</a></li>
                    </ul>
                    <ul className = "icon">
                        <li><a href="/photo"><img className = "iconPic" src="/images/photo3.png" alt="..." /></a></li>
                        <li><a className="iconText" href="/photo">Photos</a></li>
                    </ul>
                    <ul className = "icon">
                        <li><a href="/account"><img className = "userIcon" src={'http://localhost:8081/images/' + data.iconpic} alt="" /></a></li>
                        <li><a className="iconText" href="/account">Account</a></li>
                    </ul>
                    <ul className = "icon">
                        <li><a href="file:///C:/Users/matsu/WebPage/SuzuPage/AboutPage.html"><img className = "iconPic" src="/images/logout.png" alt="..." /></a></li>
                        <li><a className="iconText" href="/">Logout</a></li>
                    </ul>
                </ul>
            </nav>
        </div>
        </>
    );
}

export default Header;