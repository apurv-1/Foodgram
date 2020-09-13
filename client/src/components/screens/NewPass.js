import React,{useState,useContext} from 'react'
import {Link,useHistory,useParams} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'

const Login = () =>{
   
  const history = useHistory()
 
  const [password,setPassword] = useState("") 
  const {token} = useParams()
  
  const PostData = ()=>{
      
      fetch("/new-password",{
          method:"post",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({

              password,
              token
          })
      }).then(res=>res.json())
      .then(data=>{
        console.log(data)
          if(data.error){
              M.toast({html: data.error, classes:"#e53935 red darken-1" })
          }
          else{
              
              M.toast({html:data.message, classes:"#00c853 green accent-4"})
              history.push('/login')
          }
      }).catch(err=>{
          console.log(err)
      })
  }

    return(
        <div className="mycard">
            <div className="card auth-card input-field">
             <h2 className="brand-logo">Foodgram</h2>
             
             <input
             type="password"
             placeholder="New Password "
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
             />
              <button className="btn waves-effect waves-light #42a5f5 blue darken-1" style={{width:"360px", marginTop:"20px"}}
              onClick={()=>PostData()}
              >Update Password</button>
              
              
            </div>

      </div>

    )
}
  
export default Login