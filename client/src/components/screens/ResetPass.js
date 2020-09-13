import React,{useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'

const ResetPass = () =>{
  

  const history = useHistory()
  const [email,setEmail] = useState("")  

  const PostData = ()=>{
      if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
          M.toast({html: "Invalid Email ", classes:"#e53935 red darken-1" })
          return
      }
      fetch("/reset-password",{
          method:"post",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
              email,
              
          })
      }).then(res=>res.json())
      .then(data=>{
        
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
             type="text"
             placeholder="Email "
             value={email}
             onChange={(e)=>setEmail(e.target.value)}
             />
             
              <button className="btn waves-effect waves-light #42a5f5 blue darken-1" style={{width:"360px", marginTop:"20px"}}
              onClick={()=>PostData()}
              >Reset Password</button>
              
              
            </div>

      </div>

    )
}
  
export default ResetPass