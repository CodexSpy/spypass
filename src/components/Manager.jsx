import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import emailjs from 'emailjs-com';

import 'react-toastify/dist/ReactToastify.css';
const Manager = () => {

    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setPasswordArray(passwords)
    }

    useEffect(() => {
        getPasswords()
    }, [])

    const copytext = (text) => {
        toast('😍 Copied!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }
    const showpassword = () => {
        passwordRef.current.type = "password"
        if (ref.current.src.includes("icons/eyeslash.svg")) {
            ref.current.src = "icons/eyesolid.svg"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/eyeslash.svg";
            passwordRef.current.type = "text"
        }
    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
            //localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })
            toast('😁Saved Successfully!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            toast('☹️Empty fileds!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
    const deletePassword = async (id) => {
        console.log("Deleting")
        let con = confirm("Do you Want To Delete?")
        if (con) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            let res = await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
            //localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast('☹️Deleted!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
    const editPassword = (id) => {
        setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
        setPasswordArray(passwordArray.filter(item => item.id !== id))


    }
    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const [textareaContent, setTextareaContent] = useState('');

    const handleTextareaChange = (event) => {
        setTextareaContent(event.target.value);
    };

    const sendEmail = () => {
        const templateParams = {
            content: textareaContent
        };

        emailjs.send('<service_u7stbbm>', '<template_2zuay2q>', templateParams, '<aKGjzhA_DM_lBpURa>')
            .then((response) => {
                console.log('Email sent successfully:', response);
            })
            .catch((error) => {
                alert("Sent-Succesfully")
                console.error('Email sending failed:', error);
            });
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className='p-3 md:mycontainer min-h-[87.3vh]'>
                <h1 className='text-4xl  font-bold text-center pt-20'>
                    <span className='text-red-400'>&lt;\ </span>
                    Spy
                    <span className='text-red-400'>Paas /&gt; </span>
                </h1>
                <p className='text-red-600 text-center text-lg'>You forgot but we remember</p>
                <div className='text-black flex flex-col p-4 gap-8 items-center'>
                    <input value={form.site} onChange={handlechange} placeholder='Enter Your Website' className='rounded-full border border-red-400 w-full p-2 py-1 placeholder:text-red-400' type="text" name="site" id='site' />
                    <div className='flex flex-col md:flex-row w-full gap-8 justify-between'>
                        <input value={form.username} onChange={handlechange} placeholder='Enter Your Username' className='rounded-full border border-red-400 w-full p-2 py-1 placeholder:text-red-400' type="text" name="username" id='username' />
                        <div className='relative'>
                            <input value={form.password} onChange={handlechange} placeholder='Enter Password' className='rounded-full border border-red-400 w-full p-2 py-1 placeholder:text-red-400' type="password" name="password" id='password' ref={passwordRef} />
                            <span className='absolute right-0 top-0 p-2 cursor-pointer ' onClick={showpassword}><img ref={ref} width={20} src="icons/eyesolid.svg" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-red-400 hover:bg-green-300 rounded-full w-fit px-6 py-2 border-2 border-red-500'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save Password</button>
                </div>
                <div className='passwords'>
                    <h2 className='text-3xl font-bold py-4 text-center'>Your Importants!</h2>
                    {passwordArray.length === 0 && <div className='text-center py-15'>No passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                            <thead className='bg-red-300 text-white'>
                                <tr>
                                    <th className='py-3'>Site</th>
                                    <th className='py-3'>Username</th>
                                    <th className='py-3'>Password</th>
                                    <th className='py-3'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='bg-red-50'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='py-2 border border-red-300 text-center'>
                                            <div className='flex items-center justify-center'>
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <div className='lordiconcopysize-7 cursor-pointer flex items-center justify-center' onClick={() => { copytext(item.site) }}>                                                  <lord-icon
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover"
                                                    style={{ "width": "20px", "height": "22px" }}>
                                                </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-red-300 text-center'>
                                            <div className='flex items-center justify-center'>{item.username}
                                                <div className='lordiconcopysize-7 cursor-pointer flex items-center justify-center' onClick={() => { copytext(item.username) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/depeqmsz.json"
                                                        trigger="hover"
                                                        style={{ "width": "20px", "height": "22px" }}>
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-red-300 text-center'>
                                            <div className='flex items-center justify-center'>{"*".repeat(item.password.length)}
                                                <div className='lordiconcopysize-7 cursor-pointer flex items-center justify-center' onClick={() => { copytext(item.password) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/depeqmsz.json"
                                                        trigger="hover"
                                                        style={{ "width": "20px", "height": "22px" }}>
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-red-300 text-center'>
                                            <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "23px", "height": "23px" }}>
                                                </lord-icon></span>
                                            <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/xaubpxfc.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>}
                    <textarea className='bg-slate-300 w-full min-h-[10vh] py-4 px-4 placeholder:text-black' name="Feedback" id="feedback" placeholder='Give Your Valuable Feedback' value={textareaContent}
                        onChange={handleTextareaChange}></textarea>

                    <button onClick={sendEmail} className="float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type='submit'>
                        Submit
                    </button>

                </div>
            </div>
        </>
    )
}

export default Manager
