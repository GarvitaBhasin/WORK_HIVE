import React from 'react'
import { Button } from './ui/button'
import { Bookmark, MapPin, Calendar, ArrowRight } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        if (!mongodbTime) return "Recently";
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        return days === 0 ? "Today" : `${days}d ago`;
    }
    
    return (
        <div className='p-6 rounded-2xl bg-white border border-gray-200/80 hover:border-violet-300 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full'>
            <div>
                <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center gap-1.5 text-xs font-medium text-gray-400'>
                        <Calendar className='w-3.5 h-3.5' />
                        <span>{daysAgoFunction(job?.createdAt)}</span>
                    </div>
                    <Button variant="ghost" className="rounded-full h-8 w-8 p-0 text-gray-400 hover:text-violet-600 hover:bg-violet-50">
                        <Bookmark className='w-4 h-4' />
                    </Button>
                </div>

                <div className='flex items-center gap-3.5 mb-4'>
                    <Avatar className='w-12 h-12 rounded-xl border border-gray-100 shadow-xs'>
                        <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
                        <div className='w-full h-full bg-violet-100 text-violet-700 font-bold flex items-center justify-center text-base uppercase'>
                            {job?.company?.name?.charAt(0) || "C"}
                        </div>
                    </Avatar>
                    <div>
                        <h3 className='font-bold text-gray-900 text-base leading-snug'>{job?.company?.name}</h3>
                        <div className='flex items-center gap-1 text-xs text-gray-500 mt-0.5'>
                            <MapPin className='w-3 h-3 text-gray-400' />
                            <span>{job?.location || "India"}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className='font-bold text-lg text-gray-900 line-clamp-1 hover:text-violet-600 transition-colors cursor-pointer' onClick={()=> navigate(`/description/${job?._id}`)}>
                        {job?.title}
                    </h2>
                    <p className='text-xs sm:text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed'>
                        {job?.description}
                    </p>
                </div>

                <div className='flex items-center flex-wrap gap-2 mt-5'>
                    <span className='px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100'>
                        {job?.position} Positions
                    </span>
                    <span className='px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100'>
                        {job?.jobType}
                    </span>
                    <span className='px-2.5 py-1 rounded-md text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-100'>
                        ₹ {job?.salary} LPA
                    </span>
                </div>
            </div>

            <div className='flex items-center gap-3 mt-6 pt-4 border-t border-gray-100'>
                <Button 
                    onClick={()=> navigate(`/description/${job?._id}`)} 
                    variant="outline"
                    className="flex-1 rounded-xl border-gray-200 hover:border-violet-300 hover:text-violet-600 font-semibold text-xs sm:text-sm"
                >
                    View Details
                </Button>
                <Button 
                    onClick={()=> navigate(`/description/${job?._id}`)}
                    className="flex-1 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs sm:text-sm shadow-sm"
                >
                    Apply Now
                </Button>
            </div>
        </div>
    )
}

export default Job