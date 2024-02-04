import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from './Header';
import './css/Post.css';
import {useNavigate} from 'react-router-dom';

export const Post = () => {
  
    const [file, setFile] = useState();  
    const userid = localStorage.getItem('userid');
    const pairid = localStorage.getItem('pairid');
    const today = new Date();
    const nowMonth = (today.getMonth() + 1);
    const nowYear = today.getFullYear();
    const nowDate = today.getDate();
    const nowHour = today.getHours();
    const nowMinute = today.getMinutes();
    const nowDateTime = nowYear + '-' + nowMonth + '-' + nowDate + '  ' + nowHour + ':' + nowMinute;

    const [data, setData] = useState([]);

    const [values, setValues] = useState({
        text: '',
        userid: localStorage.getItem('userid'),
    })
    const navigate = useNavigate();
    
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    }

    const handleUpload = () =>{
        const formdata = new FormData();
        formdata.append('image', file);
        formdata.append('userid', userid);
        formdata.append('pairid', pairid);
        formdata.append('text', values.text);
        formdata.append('datetime', nowDateTime);
        axios.post('http://localhost:8081/postupload', formdata)
        .then(res => {
            if(res.data.Status == "Success"){
                console.log("Succeded");
                navigate('/photo');
            }else{
                console.log("Error");
                alert('写真が選択されていません！');
            }
        })
        .catch(err => console.log(err));
    }
  return (
    <div>
        <Header />
        <br />
        <h2>写真を投稿しよう！</h2>
        <br />
        <input type = "text" className='textboxToPost' name = 'text' onChange={handleInput} placeholder='文章を入力'></input>
        <ul className='labelAndButton'>
        <label className='iconLabel'>
            <input type="file" className='iconUpload' onChange={handleFile}/>
            写真を選択
        </label>
        <button className='iconUploadButton' onClick = {handleUpload}>投稿</button>
        </ul>
        <br />
    </div>
  )
}

export default Post