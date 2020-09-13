import React,{useState,useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'
    

const Signup = () =>{


    const history = useHistory()
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")  
    const [password,setPassword] = useState("") 
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])

    const postProfile = ()=>{
           const data = new FormData()
           data.append("file",image)
           data.append("upload_preset","helloo")
           data.append("cloud_name","vlk")
           fetch("https://api.cloudinary.com/v1_1/vlk/image/upload",{
               method:"post",
               body:data
           })
           .then(res=>res.json())
           .then(data=>{
               setUrl(data.url)
           })
           .catch(err=>{
               console.log(err)
           })
    }

    const uploadFields = () =>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid Email ", classes:"#e53935 red darken-1" })
            return
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                pic:url,
                name,
                email,
                password
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
    

    const PostData = ()=>{
        if(image){
            postProfile()
        }
        else{
            uploadFields()
        }
    }        

    return(
        <div className="mycard">
            <div className="card auth-card input-field">
             <h2 className="brand-logo">Foodgram</h2>
             
             <input
             type="text"
             placeholder="Name"
             value={name}
             onChange={(e)=>setName(e.target.value)}
             />
             <input
             type="text"
             placeholder="Email "
             value={email}
             onChange={(e)=>setEmail(e.target.value)}
             />
             <input
             type="password"
             placeholder="Password "
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
             />
             <div className="file-field input-field">
            <div className="btun-sign">
                <span>Choose Profile Photo</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            </div>
              <button className="btn waves-effect waves-light #42a5f5 blue darken-1" style={{width:"360px", marginTop:"15px"}} 
              onClick={()=>PostData()}>Signup</button>
            <h6 style={{marginTop:"30px"}}>
            Already have an account?
                <Link to="/login"> (click here)</Link>
            </h6>
        </div>

      </div>
    )
}
  
export default Signup