import React, { useState } from "react";
import { useLoaderData, useNavigation, Form, redirect, useActionData } from "react-router-dom";
import { loginUser } from "../api";

export function loader({request}){
    return new URL(request.url).searchParams.get("message")
} 

export async function action({ request }){
    const formData = await request.formData()
    const email = await formData.get("email")
    const password = await formData.get("password")

    const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host"
    try{
        const data = await loginUser({email, password})
        localStorage.setItem("loggedin", true)
        return redirect(pathname)
    }
    catch(err){
        return err.message
    }
}

export default function Login(){

    const message = useLoaderData()
    const navigate = useNavigation()
    const error = useActionData()

    return(
        <div className="login-container">
            <h1>Sign in to your account</h1>
            {message && <h3 className="red">{message}</h3>}
            {error && <h3 className="red">{error}</h3>}
            <Form method="post" className="login-form" replace>
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <button disabled= {navigate.state === "submitting"}>
                    {navigate.state === "submitting" 
                    ? "Logging In..." 
                    : "Log in"}
                    </button>
            </Form>
        </div>
    )
}