import React, { useState } from "react"
import '../css/register.css';
import { Outlet, Link } from "react-router-dom";
// import axios from "axios"
// import { useHistory } from "react-router-dom"

const Createform = () => {

    // const history = useHistory()
    
    const [ user, setUser] = useState({
        name: "",
        deadline:"",
        desc:"",
       
    })
 
    const [form, setForm] = useState(0);

    const handleChange = e => {

        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const  handlesubmit  = e => {
        console.log('clicked');
        setForm((current)=>true);
    }
    const handleShareForm  = e => {
         
    }
   
    // const register = () => {
    //     const { name, email, password, reEnterPassword } = user
    //     if( name && email && password && (password === reEnterPassword)){
    //         axios.post("http://localhost:9002/register", user)
    //         .then( res => {
    //             alert(res.data.message)
    //             history.push("/login")
    //         })
    //     } else {
    //         alert("invlid input")
    //     }
        
    // }

    return (
      <div className="rgs_con">

          {!form ? <div className="register">
            <h1>Form</h1>
            <input type="text" name="name" value={user.name} placeholder="Form Name" onChange={ handleChange }></input>

            <input type="text" name="name" value={user.name} placeholder="Paste sheet link here" onChange={ handleChange }></input>
            
            <label htmlFor="deadline">Deadline</label>
            <input type="date" name="deadline" value={user.deadline} placeholder="Deadline" onChange={ handleChange }></input>
             
            <input type="textarea" name="email" value={user.email} placeholder="Description" onChange={ handleChange }></input>
            
            <div className="button"  onClick={handlesubmit}>Create</div>
          </div> :<div className="register">
            <h1>Your Form</h1>
             <div className="detailesForm"> <b> Form Name:</b> hackathon form</div>
             <div className="detailesForm"> <b> Sheet Link:</b> hackathon form</div>
             <div  className="detailesForm"><b>  Deadline:</b> 27-03-2023</div>
             <div  className="detailesForm"><b>  Details:</b> This is hackathon form for identify that how many student are willing to participate on it.</div>
            
             <Link to="/formsearch">Contact</Link>
            {/* <div className="button"  onClick={handleShareForm}>Create</div> */}
          </div> }
        
        </div>
    )
}

export default Createform;