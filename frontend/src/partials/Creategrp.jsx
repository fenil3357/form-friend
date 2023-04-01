import React, { useEffect, useState } from "react";
import '../css/register.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


// import '../css/F_Dashboard.css';
// import axios from "axios"
// import { useHistory } from "react-router-dom"

const Creategrp = (props) => {

    document.title = "Group"
    const navigate = useNavigate();

    
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [groupCreated, setGroupCreated] = useState(false);

    useEffect((e) => {
        const OwnerFacultyId = localStorage.getItem("FacultyId");
        const OwnerFacultyEmail = localStorage.getItem("EmailId");
        setFormData({ ...formData, OwnerFacultyEmail: OwnerFacultyEmail, OwnerFacultyId: OwnerFacultyId })
    }, [])
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('')

        if (
            formData.name === undefined ||
            formData.name === "" ||
            formData.Description === "" ||
            formData.Description === undefined
        ) {
            setError("Please provide all fields");
            setLoading(false);
            return;
        }

        try {
            const url = 'http://127.0.0.1:5000/api/cluster/create-group';

            console.log(formData);

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.status === false) {
                setLoading(false);
                setError(data.Error);
            } else {
                setLoading(false);
                setError('');
                navigate(`/group/${data.ClusterId}`)
            }
        } catch (error) {
            setLoading(false);
            setError("Something went wrong. Please try again!");
        }
    };

    return (
        <div className="rgs_con">
            <div className="register">

                <h1>Create Group</h1>
                <input type="text" name="name" placeholder="Group Name" onChange={handleChange}></input>

                <input type="textarea" name="Description"  placeholder="Description" onChange={handleChange}></input>
        
                <div className="button" onClick={handleSubmit}>Create</div>
            </div>
        </div>
    )
}

export default Creategrp;