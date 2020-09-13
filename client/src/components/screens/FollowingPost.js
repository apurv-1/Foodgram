import React,{useState, useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'

const Home = () =>{

    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
        fetch('/followingpost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")

            }
        }).then(res=>res.json())
        .then(result=>{

            setData(result.posts)
        })
    },[])

    const likePost = (id)=>{
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
            .then(result=>{
           // console.log(result)
           const newData = data.map(item=>{
               if(item._id==result._id){
                   return result
               }else{
                   return item
               }
           })
           setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }
 
    const unlikePost = (id)=>{
        fetch('/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
            .then(result=>{
            //console.log(result)
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }

    const makeComment = (text,postId)=>{
        fetch('/comment',{
            method:"put" ,
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    }

    const deletePost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }


    return(
        <div className="home">
            {
                data.map(item=>{
                    return(
                     <div className="card home-card" key={item._id}>
                     <h5>
                        <div className="upper-profile">
                             <Link to={item.postedBy._id != state._id ? "/profile/"+item.postedBy._id : "/profile" }>
                             <img className="small-pic" src={state.pic}/>
                                <span className="te">{item.postedBy.name}</span>
                             </Link> 
                             {item.postedBy._id == state._id
                             &&
                             <i className="material-icons" style={{float:"right", color:"red"}}
                             onClick={()=>deletePost(item._id)}
                             >delete_forever</i>
                         }</div>
                     </h5>
                     <div className="card-image">
                         <img src={item.photo} />
                     </div>
                      <div className="card-content">
                       
                          {item.likes.includes(state._id)
                          ? 
                             <i className="material-icons" style={{color:"red"}}
                             onClick={()=>{unlikePost(item._id)}}
                             >favorite</i>                       
                          :
                             <i className="material-icons" 
                             onClick={()=>{likePost(item._id)}}
                             >favorite_border</i>
                          }<span className="likes">{item.likes.length} likes</span>
 
                          
                          <p><span class="cap-name">{item.postedBy.name}</span>{item.body}</p>
                          {
                              item.comments.map(record=>{
                                  return(
                                  <h6 key={record._id}><b>{record.postedBy.name}</b> {record.text}
                                  </h6>
                                  )
                              })
                          }
                          <form onSubmit={(e)=>{
                              e.preventDefault()
                              makeComment(e.target[0].value,item._id)
                          }}>
                              <input type="text" placeholder="add a comment···" />
                          </form>
                      </div>
                      </div>  
                    )
                })
            }     
        </div>
     )
 }
   
 export default Home