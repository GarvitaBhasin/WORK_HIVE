import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const {loading,user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();    //formdata object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            dispatch(setLoading(false));
        }
    }

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div className='min-h-screen bg-gradient-to-b from-violet-50/40 via-white to-white'>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto px-4 py-12'>
                <form onSubmit={submitHandler} className='w-full max-w-lg bg-white border border-gray-200/80 rounded-3xl p-8 shadow-xl shadow-gray-200/50'>
                    <div className='text-center mb-6'>
                        <h1 className='text-2xl font-black text-gray-900'>Create Account</h1>
                        <p className='text-sm text-gray-500 mt-1'>Join thousands of candidates & top employers</p>
                    </div>

                    <div className='space-y-4'>
                        <div>
                            <Label className='text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5 block'>Full Name</Label>
                            <Input
                                type="text"
                                value={input.fullname}
                                name="fullname"
                                onChange={changeEventHandler}
                                placeholder="John Doe"
                                className='rounded-xl border-gray-200 focus:border-violet-500 focus:ring-violet-500/10'
                                required
                            />
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <Label className='text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5 block'>Email Address</Label>
                                <Input
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    placeholder="john@example.com"
                                    className='rounded-xl border-gray-200 focus:border-violet-500 focus:ring-violet-500/10'
                                    required
                                />
                            </div>

                            <div>
                                <Label className='text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5 block'>Phone Number</Label>
                                <Input
                                    type="tel"
                                    value={input.phoneNumber}
                                    name="phoneNumber"
                                    onChange={changeEventHandler}
                                    placeholder="9876543210"
                                    className='rounded-xl border-gray-200 focus:border-violet-500 focus:ring-violet-500/10'
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <Label className='text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5 block'>Password</Label>
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="Create a strong password"
                                className='rounded-xl border-gray-200 focus:border-violet-500 focus:ring-violet-500/10'
                                required
                            />
                        </div>

                        <div>
                            <Label className='text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2 block'>I want to register as</Label>
                            <div className='grid grid-cols-2 gap-3'>
                                <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-semibold cursor-pointer transition-all ${input.role === 'student' ? 'border-violet-600 bg-violet-50 text-violet-700 shadow-xs' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        className="sr-only"
                                        required
                                    />
                                    <span>Student / Seeker</span>
                                </label>

                                <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-semibold cursor-pointer transition-all ${input.role === 'recruiter' ? 'border-violet-600 bg-violet-50 text-violet-700 shadow-xs' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="sr-only"
                                    />
                                    <span>Recruiter</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <Label className='text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5 block'>Profile Picture (Optional)</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer rounded-xl border-gray-200 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                            />
                        </div>
                    </div>

                    <div className='mt-6'>
                        {
                            loading ? (
                                <Button disabled className="w-full bg-violet-600 text-white rounded-xl py-2.5 font-semibold flex items-center justify-center">
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Creating account...
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-xl py-2.5 font-semibold shadow-md shadow-violet-200 transition-all">
                                    Create Account
                                </Button>
                            )
                        }
                    </div>

                    <p className='text-center text-xs text-gray-500 mt-6'>
                        Already have an account?{' '}
                        <Link to="/login" className='font-semibold text-violet-600 hover:text-violet-700 underline underline-offset-2'>
                            Log In
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup