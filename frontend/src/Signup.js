import React, {useState} from 'react';
import './css/SignUp.css';
import './css/common.css';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';
import SignupHeader from './SignupHeader'


function Signup() {
    const [values, setValues] = useState({
        userid: '',
        password: ''
    })

    const navigate = useNavigate();

    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if(errors.userid === "" && errors.password === ""){
            axios.post('http://localhost:8081/check', values)
            .then(res => {
                if(res.data == "Found"){
                    alert("this userid is already used");
                }else if(res.data == "Error"){
                    alert("Unknown Error");
                }else{            
                    axios.post('http://localhost:8081/signup', values)
                    .then(res =>{
                        navigate('/');
                    })
                    .catch(err => console.log(err));
                }
            })
        }
    }

  return (
    <div>
        <SignupHeader />
        <form action = "" onSubmit={handleSubmit}>
            <h2>Sign-Up</h2>
            <div className="group">
                <input type="text" name='userid'
                onChange={handleInput}/><span className="highlight"></span><span className="bar"></span>
                <label>ユーザー ID</label>
                {errors.userid && <span className='text-danger'> {errors.userid} </span>}
            </div>

            <div className="group">
                <input type="password" name='password'
                onChange={handleInput}/><span className="highlight"></span><span className="bar"></span>
                <label>パスワード</label>
                {errors.password && <span className='text-danger'> {errors.password} </span>}
            </div>

            <div className="group">
                <input type="text" name='nickname'
                onChange={handleInput}/><span className="highlight"></span><span className="bar"></span>
                <label>ニックネーム</label>
                {errors.nickname && <span className='text-danger'> {errors.nickname} </span>}
            </div>

            <p></p>
            <button type='submit' className='btn btn-success w-100'>アカウント作成</button>
            <p>アカウントをお持ちですか？</p>
            <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>ログインページへ</Link>
        </form>
        <br />
    </div>
  )
}
export default Signup

/*
<div className="group">
                <input type="text" placeholder='yyyy-mm-dd  (ex: 2022-03-28)' name='memoDay'
                onChange={handleInput}/><span className="highlight"></span><span className="bar"></span>
                <label>記念日</label>
                {errors.memoDay && <span className='text-danger'> {errors.memoDay} </span>}
            </div>
            */