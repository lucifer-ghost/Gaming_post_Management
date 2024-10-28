import React, { useContext, useState } from 'react'
import Ct from './Ct'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Editposts = () => {
  let obj=useContext(Ct)
  let navigate=useNavigate()
  let {_id,title,content,category}=obj.cobj.item
  let [data,setData]=useState({"_id":_id,"title":title,"content":content,"category":category})

  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }

  let upd=()=>{
    let x=Cookies.get("logincrd")
    if(x==undefined)
    {
      navigate("/login")
    }
    else{
      x=JSON.parse(x)
      axios.put(`${window.location.origin}/upd`,data,{"headers":{"Authorization":x.token}}).then(()=>{
        navigate("/pdbm")
      })
    }
  }
  return (
    <div className='formcon'>
      <div className='form'>
        <input type='text' placeholder='Enter Title' name="title" value={data.title} onChange={fun}/>
        <select onChange={fun} value={data.category} name="category">
          <option selected disabled value="">select category</option>
          <option value="assassinscreed">Assassins Creed</option>
          <option value="bgmi">BGMI</option>
          <option value="cod">Call of Duty</option>
          <option value="valorant">Valorant</option>
          <option value="other">Other</option>
        </select>
        <textarea value={data.content} onChange={fun} placeholder='Enter Content' name='content'></textarea>
        <button onClick={upd}>Update Post</button>
      </div>
    </div>
  )
}

export default Editposts