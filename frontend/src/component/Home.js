import React, { useContext, useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'
import Ct from './Ct'

const Home = () => {
  let [crd,setcrd]=useState({"token":"","role":""})
  let obj=useContext(Ct)
  useEffect(()=>{
    let x=Cookies.get("logincrd")
    if(x!==undefined){
      setcrd(JSON.parse(x))
    }
    else{
      setcrd({"token":"","role":""})
    }
  },[obj.cobj.f])
  return (
    <div className='home'>
        <div className='submenu'>
          <Link to="/">All Posts</Link>
          <Link to="/assassinscreed">Assassins Creed</Link>
          <Link to="/bgmi">BGMI</Link>
          <Link to="/cod">Call of Duty</Link>
          <Link to="/valorant">Valorant</Link>
          <Link to="/other">Other Posts</Link>
          {crd.token!==""&& <Link to="/pdbm">My Posts</Link>}
        </div>
        <div className='cont'>
            <Outlet/>
        </div>
    </div>
  )
}

export default Home