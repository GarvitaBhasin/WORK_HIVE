import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Briefcase } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to logout");
        }
    }
    return (
        <header className='sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-xs transition-all'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-8'>
                <Link to="/" className='flex items-center gap-2 group'>
                    <div className='w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-violet-200 group-hover:scale-105 transition-transform'>
                        <Briefcase className='w-5 h-5' />
                    </div>
                    <span className='text-2xl font-extrabold tracking-tight text-gray-900'>
                        Job<span className='bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent'>Sphere</span>
                    </span>
                </Link>
                
                <div className='flex items-center gap-8'>
                    <nav>
                        <ul className='flex items-center gap-6 text-sm font-semibold text-gray-600'>
                            {
                                user && user.role === 'recruiter' ? (
                                    <>
                                        <li>
                                            <Link to="/admin/companies" className='hover:text-violet-600 transition-colors py-1'>
                                                Companies
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/admin/jobs" className='hover:text-violet-600 transition-colors py-1'>
                                                Jobs
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link to="/" className='hover:text-violet-600 transition-colors py-1'>
                                                Home
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/jobs" className='hover:text-violet-600 transition-colors py-1'>
                                                Find Jobs
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/browse" className='hover:text-violet-600 transition-colors py-1'>
                                                Browse
                                            </Link>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                    </nav>

                    {
                        !user ? (
                            <div className='flex items-center gap-3'>
                                <Link to="/login">
                                    <Button variant="ghost" className="font-semibold text-gray-700 hover:text-violet-600 hover:bg-violet-50/60">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-md shadow-violet-200 hover:shadow-lg transition-all rounded-lg">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer ring-2 ring-violet-500/20 hover:ring-violet-500/50 transition-all">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 p-4 shadow-xl border-gray-100 rounded-xl" align="end">
                                    <div className='space-y-3'>
                                        <div className='flex items-center gap-3 pb-3 border-b border-gray-100'>
                                            <Avatar className="w-12 h-12 ring-1 ring-gray-200">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                            </Avatar>
                                            <div className='overflow-hidden'>
                                                <h4 className='font-bold text-gray-900 truncate'>{user?.fullname}</h4>
                                                <p className='text-xs text-muted-foreground truncate'>{user?.email}</p>
                                                <span className='inline-block text-[11px] font-medium uppercase tracking-wider text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full mt-1'>
                                                    {user?.role}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className='flex flex-col gap-1 text-sm font-medium text-gray-600'>
                                            {
                                                user && user.role === 'student' && (
                                                    <Link to="/profile" className='flex items-center gap-2.5 p-2 rounded-lg hover:bg-violet-50 hover:text-violet-700 transition-colors'>
                                                        <User2 className='w-4 h-4' />
                                                        <span>View Profile</span>
                                                    </Link>
                                                )
                                            }

                                            <button 
                                                onClick={logoutHandler} 
                                                className='flex items-center gap-2.5 p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors w-full text-left'
                                            >
                                                <LogOut className='w-4 h-4' />
                                                <span>Log out</span>
                                            </button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </header>
    )
}

export default Navbar