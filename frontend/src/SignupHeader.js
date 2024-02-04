import React, {useState} from 'react';
import './css/SignUp.css';
import './css/common.css';
import './css/Header.css';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';

function SignupHeader(){
    return(
            <>
        <div className="Header">
            <h2 className = "tytle">
                <a className="memories" href="file:///C:/Users/matsu/WebPage/SuzuPage/TopPage.html">Memories</a>
            </h2>
        </div>
        </>
    );
}

export default SignupHeader;