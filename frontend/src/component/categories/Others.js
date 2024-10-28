import React, { useEffect, useState } from 'react'
import axios from 'axios'


const Others = () => {
  let [data,setData]=useState([])
  useEffect(()=>{
    axios.get(`${window.location.origin}/getbycat/other`).then((res)=>{
      setData(res.data)
    }).catch((err)=>{

    })
  },[])
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
            </div>
          )
        })
      }
    </div>
  )
}

export default Others