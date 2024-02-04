import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from './Header';
import './css/Post.css';
import {Link} from 'react-router-dom';


function Photo() {
    const userid = localStorage.getItem('userid');
    const pairid = localStorage.getItem('pairid');
    const nickname = localStorage.getItem('nickname');
    const [data, setData] = useState([]);
    const [pairdata, setPairdata] = useState([]);
    const [icon1, setIcon1] = useState([]);
    const [icon2, setIcon2] = useState([]);
    
    const [userid1, setUserid1] = useState({
      userid: ''
    });
    const [userid2, setUserid2] = useState({
      userid: ''
    });

    const [values, setValues] = useState({
      userid: localStorage.getItem('userid'),
      pairid: localStorage.getItem('pairid')
    })

    useEffect(() => {
      axios.post('http://localhost:8081/getpair', values)
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

    useEffect(() => {

      axios.post('http://localhost:8081/getposts', values)
      .then(res => {
          setData(res.data);
          console.log(data);
      })
      .catch(err => console.log(err));

    }, [])

    let posts = [];
    
    if(data.length > 0){
      for(var i = 0; i < data.length; i++){
        if(data[i].userid === userid1.userid){ 
          posts[i] = {
            dataIcon: icon1.iconpic,
            dataNickname: icon1.nickname,
            dateTime: data[i].datetime,
            dataText: data[i].text,
            dataImage: data[i].image
          }
        }else{
          posts[i] = {
            dataIcon: icon2.iconpic,
            dataNickname: icon2.nickname,
            dateTime: data[i].datetime,
            dataText: data[i].text,
            dataImage: data[i].image
          }
        }
      }
    }

    if(pairid != 'null'){
      return (
        <div>
          <Header />
          <Link to="/post" className='goPostPage'> 投稿 </Link>
          <div className='posts' id = 'posts'>
          {posts.map((item) => {
            return (
              <div className='container'>
                <ul className='labelAndButton'>
                <img className = 'postIcon' src = {'http://localhost:8081/images/' + item.dataIcon} alt = '' />
                <ul className = 'postContent'>
                  <ul className='nameAndDatetime'>
                  <h6>{item.dataNickname}:{item.dateTime}</h6>
                  </ul>
                  <p className = 'postText'>{item.dataText}</p>
                  <img className = 'photo' src = {'http://localhost:8081/images/' + item.dataImage} alt = '' />
                  </ul>
                </ul>
              </div>
            )
          })}
          </div>
        </div>
      )
    }else{
      return(
        <div>
          <Header />
          <div className="tytleFushime">~ PHOTO ~</div>
          <h2>{nickname}さんようこそ！</h2>
          <h2>この機能を利用するには、</h2>
          <h2>まずはペアを登録しよう！</h2>
        </div>
      )
    }
}

export default Photo