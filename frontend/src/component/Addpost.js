import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Addpost = () => {
  let [data,setData]=useState({"title":"","content":"","category":""})
  let [msg,setMsg]=useState("")
  let navigate=useNavigate()

  useEffect(()=>{
    let obj
    let x=Cookies.get("logincrd")
    if(x==undefined){
      navigate("/login")
    }
    else{
      obj=JSON.parse(x)
      setData({...data,"uid":obj._id,"name":obj.name})
    }
  },[])
  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }

  let add=()=>{
    console.log("ok")
    let x=Cookies.get("logincrd")
    if(x==undefined){
      navigate("/login")
    }
    else{
      let {token}=JSON.parse(x)
      axios.post(`${window.location.origin}/addpost`,{...data,"dop":new Date().toLocaleDateString()},{"headers":{"Authorization":token}}).then((res)=>{
        setMsg(res.data.msg)
        console.log(data)
        setData({...data,"title":"","content":"","category":""})
      })
    }
  }
  return (
    <div className='formcon'>
      <div className='form'>
        <div className='msg'>{msg}</div>
        <input type='text' placeholder='Enter Title' name="title" value={data.title} onChange={fun}/>
        <select onChange={fun} value={data.category} name="category">
          <option selected disabled value="">Select Category</option>
          <option value="assassinscreed">Assassins Creed</option>
          <option value="bgmi">BGMI</option>
          <option value="cod">Call of Duty</option>
          <option value="valorant">Valorant</option>
          <option value="other">Other</option>
        </select>
        <textarea placeholder='Enter Description' value={data.content} onChange={fun} name='content'></textarea>
        <button onClick={add}>Add Post</button>
      </div>
    </div>
  )
}

export default Addpost