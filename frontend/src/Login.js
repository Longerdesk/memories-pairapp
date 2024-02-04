import React, {useState} from 'react';
import './css/SignUp.css';
import './css/common.css';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
import SignupHeader from './SignupHeader'



function Login() {
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
            axios.post('http://localhost:8081/login', values)
            .then(res =>{
                if(res.data === "Error") {
                    alert("Account not found");
                }else{
                    localStorage.setItem('userid', values.userid);
                    localStorage.setItem('pairid', res.data.pairid);
                    localStorage.setItem('nickname', res.data.nickname);
                    navigate('/home');
                }
            })
            .catch(err => console.log(err));
        }
    }

  return (
    <div className = "background">
        <SignupHeader />
        <div>
            <form action = "" onSubmit={handleSubmit}>
                <h2>Log in</h2>
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
                <button type='submit'className='btn btn-success w-100'>ログイン</button>
                <p>初めてご利用の方は</p>
                <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>アカウント作成ページへ</Link>
            </form>
            <br className='loginBr'/>
        </div>
    </div>
  )
}

export default Login

/*
<form>
    <div class="group">
        <input type="text"/><span class="highlight"></span><span class="bar"></span>
        <label>Pair ID</label>
    </div>
    <div class="group">
        <input type="email"/><span class="highlight"></span><span class="bar"></span>
        <label>Password</label>
    </div>
    <button type="button" class="button buttonBlue">Log In
        <div class="ripples buttonRipples"><span class="ripplesCircle"></span></div>
    </button>
    <div>
        Don't have account? Go 
        <a href="file:///C:/Users/matsu/WebPage/SuzuPage/RegisterPage.html" class = "logIn">sign up</a>
    </div>
</form>
*/
/*
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-50'>
            <h2>Sign-In</h2>
            <form action = "" onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder='Enter Email' name='email'
                    onChange={handleInput} className='form-control rouned-0'/>
                    {errors.email && <span className='text-danger'> {errors.email}</span>}
                </div>
                <div className='mb-3'>
                    <label hemlFor="password">Password</label>
                    <input type="password" placeholder='Enter Password' name='password'
                    onChange={handleInput} className='form-control rouned-0' />
                    {errors.password && <span className='text-danger'> {errors.password}</span>}
                </div>
                <button type='submit' className='btn btn-success w-100'>Log in</button>
                <p>You are agree to our terms and policies</p>
                <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
            </form>
        </div>
    </div>
    */