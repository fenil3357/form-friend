import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

// import { BASE_API_URL } from '../config/api'

import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
// import Banner from '../partials/Banner';

function SignUp() {
  document.title = "Sign up"
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError ] = useState("");

  
  useEffect(() => {
    if(localStorage.getItem('accessToken') != null) {
   navigate('/signin');
 }

}, []);

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
      formData.MobileNumber === "" || 
      formData.MobileNumber === undefined || 
      formData.EmailId === "" || 
      formData.EmailId === undefined || 
      formData.Password === "" ||
      formData.Password === undefined 
    ) {
      setError("Please provide all fields");
      setLoading(false);
      return;
    }

    try {
      const url = 'http://192.168.43.177:5000/api/auth/signup/faculty';

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        // store user details
        navigate('/signin')
      }
    } catch (error) {
      setLoading(false);
      setError("Something went wrong. Please try again!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">

        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1 text-zinc-100 ">Faculty SignUp.</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                {/* <form>
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full px-3">
                      <button className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center">
                        <svg className="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                        </svg>
                        <span className="h-6 flex items-center border-r border-white border-opacity-25 mr-4" aria-hidden="true"></span>
                        <span className="flex-auto pl-16 pr-8 -ml-16">Sign up with Google</span>
                      </button>
                    </div>
                  </div>
                </form> */}
                <div className="flex items-center my-6">
                  <div className="border-t border-gray-700 border-dotted grow mr-3" aria-hidden="true"></div>
                  <div className="text-gray-400">register with your email</div>
                  <div className="border-t border-gray-700 border-dotted grow ml-3" aria-hidden="true"></div>
                </div>
                <form>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="full-name">Full Name <span className="text-red-600">*</span></label>
                      <input id="full-name" type="text" className="form-input w-full text-gray-300" placeholder="First and last name" name="name" onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Work Email <span className="text-red-600">*</span></label>
                      <input id="email" type="email" className="form-input w-full text-gray-300" placeholder="you@yourcompany.com" name="EmailId" onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="number">Mobile Number <span className="text-red-600">*</span></label>
                      <input id="email" type="number" className="form-input w-full text-gray-300" placeholder="9409671885" name="MobileNumber" onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password <span className="text-red-600">*</span></label>
                      <input id="password" type="password" className="form-input w-full text-gray-300" placeholder="Password (at least 8 characters)" name="Password" onChange={handleChange} required />
                    </div>
                  </div>
                  {/* <div className="text-sm text-gray-500 text-center">
                    I agree to be contacted by Open PRO about this offer as per the Open PRO <Link to="#" className="underline text-gray-400 hover:text-gray-200 hover:no-underline transition duration-150 ease-in-out">Privacy Policy</Link>.
                                </div> */}
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full" onClick={handleSubmit}>Sign up</button>
                    </div>
                  </div>
                </form>
                {error !== "" ? <p text-color='red'>{error}</p> : <p></p>}
                <div className="text-gray-400 text-center mt-6">
                  Already using ? <Link to="/signin" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign in for Faculty</Link>
                  
                </div>
                <div className="text-gray-400 text-center mt-6">
                  Are You Student ? <Link to="/signinstudent" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign in here</Link>
                </div>
               
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* <Banner /> */}

    </div>
  );
}

export default SignUp;