"use client"
import React, { useState } from "react";
import Link from "next/link";
import signupStyles from './Signup.module.css'
import { useRouter } from "next/navigation";

const signup = () => {
    let initialData = {firstName:"", lastName:"", username:"", email:"", password:""};
    let [formData, setFormData] = useState(initialData)
    let router = useRouter();

    function addFormData(e){
        let {name, value} = e.target
        setFormData({...formData, [name]:value});
    }

    async function getData(){
        let data = await fetch(`https://dev-be-startups.ialabs.co.in/api/auth/local/register`,{
            method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(formData)
        })
        return data.json();
    }

   async function submitForm(e){
        e.preventDefault();
        let {email, username, password} = formData;
        
        if(email!==''&&username!==''&& password!=''){
            let data = await getData();
            if(data.jwt){
                alert("Registered successfully");
                router?.push('/dashboard/login')
            }else{
                alert(data.error.message);
            }
           console.log(data)
        }else{
            alert("Incomplete details!")
        }
       
    }
  return (
    <div className={signupStyles.signupForm}>
      <form action="">
      <input
          type="text"
          name="firstName"
          value={formData.identifier}
          onChange={addFormData}
          placeholder="Enter fisrt name"
        />
        <input
          type="text"
          name="lastName"
          value={formData.identifier}
          onChange={addFormData}
          placeholder="Enter last name"
        />
        <input
          type="text"
          name="username"
          value={formData.identifier}
          onChange={addFormData}
          placeholder="Enter username"
        />
         <input
          type="text"
          name="email"
          value={formData.identifier}
          onChange={addFormData}
          placeholder="Enter email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={addFormData}
          placeholder="Password"
        />
        <input type="submit" onClick={submitForm} value={"Signup"} />
      </form>
      <br />
      <p>- OR -</p>
      <br />
      <Link href={"/dashboard/login"}>Already havean account? Login here</Link>
    </div>
  );
};

export default signup;
