import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { Building2, MapPin, IndianRupee, ArrowUpRight } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={()=> navigate(`/description/${job._id}`)} 
            className='group relative p-6 rounded-2xl bg-white border border-gray-200/80 hover:border-violet-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between'
        >
            <div>
                <div className='flex items-start justify-between gap-4'>
                    <div className='flex items-center gap-3'>
                        <Avatar className='w-12 h-12 rounded-xl border border-gray-100 shadow-xs'>
                            <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
                            <div className='w-full h-full bg-violet-50 text-violet-700 font-bold flex items-center justify-center text-base uppercase'>
                                {job?.company?.name?.charAt(0) || "C"}
                            </div>
                        </Avatar>
                        <div>
                            <h3 className='font-bold text-gray-900 group-hover:text-violet-600 transition-colors text-base'>
                                {job?.company?.name}
                            </h3>
                            <div className='flex items-center gap-1 text-xs text-gray-500 mt-0.5'>
                                <MapPin className='w-3.5 h-3.5 text-gray-400' />
                                <span>{job?.location || "India"}</span>
                            </div>
                        </div>
                    </div>
                    <div className='w-8 h-8 rounded-full bg-gray-50 group-hover:bg-violet-600 group-hover:text-white flex items-center justify-center text-gray-400 transition-colors'>
                        <ArrowUpRight className='w-4 h-4' />
                    </div>
                </div>

                <div className='mt-4'>
                    <h2 className='font-bold text-lg text-gray-900 leading-snug line-clamp-1'>
                        {job?.title}
                    </h2>
                    <p className='text-xs sm:text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed'>
                        {job?.description}
                    </p>
                </div>
            </div>

            <div className='flex items-center flex-wrap gap-2 mt-5 pt-4 border-t border-gray-100'>
                <span className='px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100'>
                    {job?.position} Positions
                </span>
                <span className='px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100'>
                    {job?.jobType}
                </span>
                <span className='px-2.5 py-1 rounded-md text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-100 flex items-center'>
                    ₹ {job?.salary} LPA
                </span>
            </div>
        </div>
    )
}

export default LatestJobCards