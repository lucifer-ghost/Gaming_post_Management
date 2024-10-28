import axios from 'axios'
import React, { useState,useEffect } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
  let [save,setSave]=useState(true)
  let [data,setData]=useState([])
  let [comment,setComment]=useState("")
  let navigate=useNavigate()

  let fun=(e)=>{
    setComment(e.target.value)
    console.log(comment)
  }

  useEffect(()=>{
    let x=Cookies.get("logincrd")
    if(x==undefined){
      navigate("/login")
    }
    else{
      x=JSON.parse(x)
      axios.get(`${window.location.origin}/getrposts`,{"headers":{"Authorization":x.token}}).then((res)=>{
        setData(res.data)
      })
    }
  },[save])

  let accepting=(pid)=>{
    let x=Cookies.get("logincrd")
    let {token}=JSON.parse(x)
    axios.get(`${window.location.origin}/accept/${pid}`,{"headers":{"Authorization":token}}).then(()=>{
      setSave(!save)
    })
  }

  let addComment=(pid)=>{
    let x=Cookies.get("logincrd")
    let {token}=JSON.parse(x)
    axios.put(`${window.location.origin}/updrv`,{"_id":pid,"msg":comment},{"headers":{"Authorization":token}}).then(()=>{
      setSave(!save) 
    })
  }
  return (
    <div className='postcon'>
    {
      data.map((item)=>{
        return(
          <div className='post'>
            <h1>{item.title}</h1>
            <p>{item.content}</p>
            <div className='pfoot'>
              <p>{item.category}</p>
              <p>{new Date(item.dop).toDateString()}</p>
              <p>{item.name}</p>
            </div>
            <div>
              {
                item.comment.toString()
              }
            </div>
            <button onClick={()=>accepting(item._id)}>Accept</button>
            <input type='text' placeholder='Enter Comment' onChange={fun} value={comment}/>
            <button onClick={()=>addComment(item._id)}>Add Comment</button>
          </div>
        )
      })
    }
    </div>
  )
}

export default Admin