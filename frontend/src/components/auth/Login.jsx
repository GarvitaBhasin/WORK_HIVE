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
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading,user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
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
                <form onSubmit={submitHandler} className='w-full max-w-md bg-white border border-gray-200/80 rounded-3xl p-8 shadow-xl shadow-gray-200/50'>
                    <div className='text-center mb-6'>
                        <h1 className='text-2xl font-black text-gray-900'>Welcome Back</h1>
                        <p className='text-sm text-gray-500 mt-1'>Log in to access your jobs and applications</p>
                    </div>

                    <div className='space-y-4'>
                        <div>
                            <Label className='text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5 block'>Email Address</Label>
                            <Input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="name@example.com"
                                className='rounded-xl border-gray-200 focus:border-violet-500 focus:ring-violet-500/10'
                                required
                            />
                        </div>

                        <div>
                            <Label className='text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5 block'>Password</Label>
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="••••••••"
                                className='rounded-xl border-gray-200 focus:border-violet-500 focus:ring-violet-500/10'
                                required
                            />
                        </div>

                        <div>
                            <Label className='text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2 block'>I am a</Label>
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
                    </div>

                    <div className='mt-6'>
                        {
                            loading ? (
                                <Button disabled className="w-full bg-violet-600 text-white rounded-xl py-2.5 font-semibold flex items-center justify-center">
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Logging in...
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-xl py-2.5 font-semibold shadow-md shadow-violet-200 transition-all">
                                    Log In
                                </Button>
                            )
                        }
                    </div>

                    <p className='text-center text-xs text-gray-500 mt-6'>
                        Don't have an account?{' '}
                        <Link to="/signup" className='font-semibold text-violet-600 hover:text-violet-700 underline underline-offset-2'>
                            Create Account
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login