import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'


const NavBar = ()=>{

    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const renderList = ()=>{
      if(state){
        return[
          <li key="2"><Link to="/profile">Profile</Link></li>,
          <li key="3"><Link to="createpost">Create Post</Link></li>,
          <li key="4"><Link to="/followingpost">Following Post</Link></li>,
          <li key="5">
              <button className="btn waves-effect waves-light #e53935 red darken-1" style={{margin:"5px"}}
              onClick={()=>{
                localStorage.clear()
                dispatch({type:"CLEAR"})
                history.push('/login')
              }}
              >LogOut</button>
          </li>
        ]
        
      }else{
       return[
        <li key="6"><Link to="/login">LogIn</Link></li>,
        <li key="7"><Link to="/signup">SignUp</Link></li>
       ]
      }
    }

    return(

      <nav>
             <div className="nav-wrapper grey">
             <img src="https://res.cloudinary.com/vlk/image/upload/v1595691220/icon_ip0cmr.png" className="welcome-logo" />
               <Link to={state?"/":"/signup"} className="brand-logo center">
                 Foodgram</Link>
               <ul id="nav-mobile" className="right">
                  {renderList()}
               </ul>
             </div>     
      </nav>
    )
}




export default NavBar 