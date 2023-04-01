import React,{useState} from 'react'
// import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import '../css/F_Dashboard.css';
import pro from '../images/pro.jfif';
import form_icon from '../images/form.png';
import create_form from '../images/create form.png';
// import search_i from '../images/search.png';
import logout from '../images/log-out.png';
import create_grp from '../images/group.png';
import Forms from '../partials/Forms';
import Creategrp from '../partials/Creategrp';
import Createform from '../partials/Createform';
import Group from '../partials/Group';
import Allforms from '../partials/Allforms';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// import { FormControl,InputLabel,Select,MenuItem} from '@mui/material';
 
// import { DataGrid } from '@mui/x-data-grid';


const Fdashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
      if(localStorage.getItem('accessToken') == null) {
     navigate('/signin');
   }

  }, []);
  const [currentComponent, setCurrentComponent] = useState(1);

  const handleChoiceClick= (id) => {

    setCurrentComponent(id);
  };

   
  const renderComponent = (id) => {
    console.log("clicked");
    switch (id) {
      case 1:
        return <Forms choicelink = {handleChoiceClick}/>;
      case 2:
        return  <Createform/>;
      case 3:
        return <Creategrp choicelink = {handleChoiceClick} />;
        case 4:
          return <Allforms/>;
        case 5:
            return <Group/>;
      default:
        return null;
    }
  };
  const handleLogOut = () => {
    localStorage.clear();
    navigate('/')
  };
  return (
    <>
      <div className='container'>
        <div className='left'>
        <div className='profile'>
                <Avatar
                  alt="Remy Sharp"
                  src= {pro}
                  sx={{ width: '70px', height: '70px' }}
                />
                 <p>PR. KED</p>
            </div>
            <div className='pro_option'>
                <div className='choice' onClick={(event) =>{handleChoiceClick(1)}}>
                  <div className='line'>
                  </div>
                  <div className='choice_icon'>
                      <img className='form_i' src={form_icon} alt='icon' />
                  </div>
                  <div className='choice_txt'>
                     Groups
                  </div>
                </div>
                <div className='choice' onClick={(event) =>{handleChoiceClick(2)}}>
                  <div className='line'>

                  </div>
                  <div className='choice_icon'>
                      <img className='form_i' src={create_form} alt='icon' />
                  </div>
                  <div className='choice_txt'>
                  Create Form
                  </div>
                </div>
                <div className='choice' onClick={(event) =>{handleChoiceClick(3)}}>
                  <div className='line'>

                  </div>
                  <div className='choice_icon'>
                      <img className='form_i' src={create_grp} alt='icon' />
                  </div>
                  <div className='choice_txt'>
                    Create Group
                  </div>
                </div>
                <div className='choice' onClick={(event) =>{handleChoiceClick(4)}}>
                  <div className='line'>

                  </div>
                  <div className='choice_icon'>
                      <img className='form_i' src={create_grp} alt='icon' />
                  </div>
                  <div className='choice_txt'>
                     All Forms
                  </div>
                </div>
            </div>
            <div className='logout'>
              <div className='g_t'>
                    <div className='logout_div'>
                        <img className='logout_i' src={logout} alt='icon' />
                    </div>
                    <button className='logout_txt' onClick={handleLogOut} >
                      LogOut
                    </button>
              </div>
            </div>
        </div>
        
        <div className='right'>
            <div className='query'>
             <div className='search'>
               <input className='search_in' type ="text" placeholder='Search Here..'></input>
              </div>
              <div className='sort'> 
              
              </div>
            </div>
            
                {renderComponent(currentComponent)}
            
           </div>
        </div>
    </>
  );
}




export default Fdashboard
