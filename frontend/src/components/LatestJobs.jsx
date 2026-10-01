import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase } from 'lucide-react';
import { Button } from './ui/button';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);
   
    return (
        <section className='max-w-7xl mx-auto px-4 md:px-8 my-16'>
            <div className='flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8'>
                <div>
                    <span className='text-xs font-bold uppercase tracking-wider text-violet-600 bg-violet-50 px-3 py-1 rounded-full'>
                        Handpicked Opportunities
                    </span>
                    <h2 className='text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mt-2 tracking-tight'>
                        Latest & Top <span className='bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent'>Job Openings</span>
                    </h2>
                    <p className='text-sm text-gray-500 mt-1'>
                        Explore verified openings recently added by leading tech employers.
                    </p>
                </div>
                
                <Link to="/jobs">
                    <Button variant="outline" className='group flex items-center gap-2 border-gray-200 text-gray-700 hover:text-violet-600 hover:border-violet-300 font-semibold'>
                        <span>Explore All Jobs</span>
                        <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                    </Button>
                </Link>
            </div>

            {
                allJobs?.length <= 0 ? (
                    <div className='bg-gray-50/70 border border-dashed border-gray-200 rounded-3xl p-12 text-center max-w-xl mx-auto my-6'>
                        <div className='w-14 h-14 bg-violet-100 text-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                            <Briefcase className='w-7 h-7' />
                        </div>
                        <h3 className='text-lg font-bold text-gray-800'>No jobs posted yet</h3>
                        <p className='text-sm text-gray-500 mt-1 max-w-sm mx-auto'>
                            New jobs are posted daily! Recruiters can log in to post new openings anytime.
                        </p>
                        <div className='mt-6 flex items-center justify-center gap-3'>
                            <Link to="/browse">
                                <Button className='bg-violet-600 hover:bg-violet-700 text-white font-medium'>
                                    Browse All
                                </Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {allJobs?.slice(0, 6).map((job) => (
                            <LatestJobCards key={job._id} job={job} />
                        ))}
                    </div>
                )
            }
        </section>
    )
}

export default LatestJobs