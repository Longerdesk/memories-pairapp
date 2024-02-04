import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './css/Account.css';

function FileUPload() {
    const [file, setFile] = useState();  
    const userid = localStorage.getItem('userid');
    let nickname = localStorage.getItem('nickname');
    const [data, setData] = useState([]);
    
    const [values, setValues] = useState({
        nickname: '',
        userid: localStorage.getItem('userid')
    })

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

    useEffect(() => {
        axios.post('http://localhost:8081/account', values)
        .then(res => {
            setData(res.data);
            localStorage.setItem('nickname', res.data.nickname);
        })
        .catch(err => console.log(err));
    }, [])

    const handleSubmit = (event) => {
        console.log(values.nickname);
        console.log(values.userid);
        axios.post('http://localhost:8081/updatenickname', values)
        .then(res => {
            if(res.data == "Success"){
                localStorage.setItem('nickname', res.data.nickname);
                nickname = values.nickname;
                window.location.reload();
            }else{
                console.log("Failed");
            }
        })
        .catch(err => console.log(err));
    }

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    }


    const handleUpload = () =>{
        const formdata = new FormData();
        formdata.append('image', file);
        formdata.append('userid', userid);
        axios.post('http://localhost:8081/upload', formdata)
        .then(res => {
            if(res.data.Status == "Success"){
                window.location.reload()
            }else{
                console.log("Failed");
            }
        })
        .catch(err => console.log(err));
    }

  return (
    <div className='container'>
        <h2>ユーザーid: {userid}</h2>
        <img className = 'account_icon' src = {'http://localhost:8081/images/' + data.iconpic} alt = "" />
        <ul className='labelAndButton'>
            <label className='iconLabel'>
                <input type="file" className='iconUpload' onChange={handleFile}/>
                アイコンを変更
            </label>
            <button className='iconUploadButton' onClick = {handleUpload}>決定</button>
        </ul>
        <h2>ニックネーム</h2>
        <ul className='labelAndButton'>
            <input type = "text" className='nicknameArea' name = 'nickname' placeholder= {data.nickname} onChange={handleInput}></input>
            <button className='namechangeButton' onClick={handleSubmit}>名前を更新</button>
        </ul>
        <br className='accountBlank'></br>
        <br />
        
    </div>
  )
}

//<img src = {'http://localhost:8081/images/' + data.image} alt = "" />
    

export default FileUPload