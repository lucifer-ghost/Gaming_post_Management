import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Registrations = () => {
    let [data,setData]=useState({"_id":"","name":"","password":"","phno":"","age":""})
    let [msg,setMsg]=useState("")
    let navigate=useNavigate()
    let fun=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    let add=()=>{
        axios.post(`${window.location.origin}/register`,data).then((res)=>{
            if(res.data.msg==="Registration done")
            {
                navigate("/login")
            }
            else{
                setMsg(res.data.msg)
            }
        })
    }
    return (
        <div className='formcon'>
            <div className='form'>
                <div className='msg'>{msg}</div>
                <input type='text' name="_id" placeholder='Enter your e-mail' onChange={fun} value={data._id}/>
                <input type='text' name="name" placeholder='Enter your name' onChange={fun} value={data.name}/>
                <input type='text' name="phno" placeholder='Enter your phone number' onChange={fun} value={data.phno}/>
                <input type='text' name="age" placeholder='Enter your age' onChange={fun} value={data.age}/>
                <input type='password' name="password" placeholder='Enetr your password' onChange={fun} value={data.password}/>
                <button onClick={add}>Register</button>
            </div>
        </div>
    )
}

export default Registrations