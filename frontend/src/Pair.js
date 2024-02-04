import React from 'react'
import Header from './Header'
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import './css/Home.css';
import './css/common.css';
import './css/Pair.css';
import {useNavigate} from 'react-router-dom';
import Validation from './PairValidation';
import axios from 'axios';


function Pair() {
    const nickname = localStorage.getItem('nickname');
    const pairid = localStorage.getItem('pairid');

    const [values, setValues] = useState({
        pairid: '',
        userid: localStorage.getItem('userid'),
        memoDay: ''
    })

    const [pairidToSend, setPairidToSend] = useState({
        pairid: pairid
    })
    
    const [pairdata, setPairdata] = useState([]);
    const [icon1, setIcon1] = useState([]);
    const [icon2, setIcon2] = useState([]);
    
    const [userid1, setUserid1] = useState({
      userid: ''
    });
    const [userid2, setUserid2] = useState({
      userid: ''
    });

    useEffect(() => {
      axios.post('http://localhost:8081/getpair', pairidToSend)
      .then(res => {
        setPairdata(res.data);
        const updateUserid1 = {
          ...userid1,
          userid: pairdata.user1
        }
        setUserid1(updateUserid1)
        const updateUserid2 = {
          ...userid2,
          userid: pairdata.user2
        }
        setUserid2(updateUserid2)
          axios.post('http://localhost:8081/account', userid1)
          .then(res => {
            setIcon1(res.data);
            axios.post('http://localhost:8081/account', userid2)
            .then(res => {
              setIcon2(res.data);

            })
            .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
    })


    

    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

    const [errors, setErrors] = useState({})

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if(errors.pairid === "" && errors.memoDay === ""){
            axios.post('http://localhost:8081/checkpair', values)
            .then(res => {
                if(res.data == "Found"){
                    alert("This pairid is already used or 記念日 is wrong");
                }else if(res.data == "Error"){
                    alert("Unknown Error");
                }else if (res.data == "Already"){
                    alert("You already joined to this pair. Try reload");
                }else if (res.data == "Add"){            
                    axios.post('http://localhost:8081/addpair', values)
                    .then(res =>{
                        console.log("Successfully Added");
                        axios.post('http://localhost:8081/assignpair', values)
                            .then(res => {
                                if(res.data == "Success"){
                                    console.log("Success assigning pair");
                                    localStorage.setItem('pairid', values.pairid);
                                    localStorage.setItem('memoDay', values.memoDay);
                                    window.location.reload()
                                }
                            })
                            .catch(err => console.log(err));
                    })
                }else if(res.data == "Join1"){      
                    axios.post('http://localhost:8081/checkmemoDay', values)
                    .then(res => {
                        if(res.data == "Success"){
                            axios.post('http://localhost:8081/joinpair1', values)
                            .then(res =>{
                                console.log("Successfully Joined");
                                axios.post('http://localhost:8081/assignpair', values)
                                .then(res => {
                                    if(res.data == "Success"){
                                        console.log("Success assigning pair");
                                        localStorage.setItem('pairid', values.pairid);
                                        localStorage.setItem('memoDay', values.memoDay);
                                        window.location.reload()
                                    }
                                })
                                .catch(err => console.log(err))
                            })
                            .catch(err => console.log(err));
                        }else if(res.data == "Wrong"){
                            alert("Wrong memoDay");
                        }else{
                            alert("Unknown Error in checking memoDay");
                        }
                    })
                    .catch(err => console.log(err));
                }else if(res.data == "Join2"){ 
                    axios.post('http://localhost:8081/checkmemoDay', values)
                    .then(res => {
                        if(res.data == "Success"){
                            axios.post('http://localhost:8081/joinpair2', values)
                            .then(res =>{
                                console.log("Successfully Joined");
                                axios.post('http://localhost:8081/assignpair', values)
                                .then(res => {
                                    if(res.data == "Success"){
                                        console.log("Success assigning pair");
                                        localStorage.setItem('pairid', values.pairid);
                                        window.location.reload()
                                    }
                                })
                                .catch(err => console.log(err))
                            })
                            .catch(err => console.log(err));
                        }else if(res.data == "Wrong"){
                            alert("Wrong memoDay");
                        }else{
                            alert("Unknown Error in checking memoDay");
                        }
                    })
                    .catch(err => console.log(err));
                    
                }
            })
        }
    }


    const [storages, setstorages] = useState({
        pairid: localStorage.getItem('pairid'),
        userid: localStorage.getItem('userid'),
        memoDay: localStorage.getItem('memoDay')
    })
    const handleLeave = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/deletepairid', storages)
        .then(res => {
            if(res.data == "Success"){
                axios.post('http://localhost:8081/checkUserNum', storages)
                .then(res => {
                    if(res.data == "Found1"){
                        console.log("found in user1");
                        axios.post('http://localhost:8081/leavepair1', storages)
                        .then(res => {
                            if(res.data == "Success"){
                                axios.post('http://localhost:8081/checkIfDeletePair', storages)
                                .then(res => {
                                    if(res.data == "Delete"){
                                        axios.post('http://localhost:8081/deletePair', storages)
                                        .then(res => {
                                            if(res.data == "Success"){
                                                localStorage.setItem('pairid', "null");
                                                window.location.reload()
                                            }
                                        })
                                    }else if(res.data == "NoDelete"){
                                        localStorage.setItem('pairid', "null");
                                        window.location.reload()
                                    }
                                })
                                .catch(err => console.log(err))
                            }
                            
                        })
                        .catch(err => console.log(err))
                    }else if(res.data == "Found2"){
                        console.log("found in user2");
                        axios.post('http://localhost:8081/leavepair2', storages)
                        .then(res => {
                            if(res.data == "Success"){
                                axios.post('http://localhost:8081/checkIfDeletePair', storages)
                                .then(res => {
                                    if(res.data == "Delete"){
                                        axios.post('http://localhost:8081/deletePair', storages)
                                        .then(res => {
                                            if(res.data == "Success"){
                                                localStorage.setItem('pairid', "null");
                                                window.location.reload()
                                            }
                                        })
                                    }else if(res.data == "NoDelete"){
                                        localStorage.setItem('pairid', "null");
                                        window.location.reload()
                                    }
                                })
                            }
                        })
                        .catch(err => console.log(err))
                    }else{
                        alert("Could not leave pair");
                    }
                })
            }else{
                alert("Unknown Error in delete pairid");
            }
        })
        .catch(err => console.log(err));
    }

    if(pairid == "null"){
        return (
            <div>
                <Header />
                <h2>ペアの登録をしよう！</h2>
                <h2>パートナーと同じペアIDと記念日を入力してね！</h2>
                <form action = "" onSubmit={handleSubmit}>
                    <h2>ペア登録</h2>
                    <div className="group">
                        <input type="text" name='pairid'
                        onChange={handleInput}/><span className="highlight"></span><span className="bar"></span>
                        <label>ペア ID</label>
                        {errors.pairid && <span className='text-danger'> {errors.pairid} </span>}
                    </div>
                    <div className="group">
                        <input type="text" name='memoDay' placeholder='(例)2022-03-28'
                        onChange={handleInput}/><span className="highlight"></span><span className="bar"></span>
                        <label>記念日 (yyyy-mm-dd)</label>
                        {errors.memoDay && <span className='text-danger'> {errors.memoDay} </span>}
                    </div>
                    <button type='submit'className='btn btn-success w-100'>登録</button>
                </form>
            </div>
          )
    }else{
        return (
            <div>
                <Header />
                <h2>あなたのペアは{pairid}です</h2>
                <ul className='pairListIcons'>
                 <ul className='pairIconAndNickname1'>
                    <img className = 'pairPostIcon1' src = {'http://localhost:8081/images/' + icon1.iconpic} alt = '' />
                    <h2>{icon1.nickname}</h2>
                 </ul>
                 <ul className='pairIconAndNickname2'>
                    <img className = 'pairPostIcon2' src = {'http://localhost:8081/images/' + icon2.iconpic} alt = '' />
                    <h2>{icon2.nickname}</h2>
                 </ul>
                </ul>
                <button className='leavePairButton' onClick={handleLeave}>ペアを抜ける</button>
                <br />
            </div>
        )
    }
}

export default Pair