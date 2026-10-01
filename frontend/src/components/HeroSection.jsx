import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, Sparkles, Building2, Users2, Briefcase } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (searchTarget) => {
        const target = typeof searchTarget === "string" ? searchTarget : query;
        if (!target.trim()) return;
        dispatch(setSearchedQuery(target));
        navigate("/browse");
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchJobHandler();
        }
    }

    const trendingKeywords = ["Frontend", "Fullstack", "React", "Node.js", "Python", "Remote"];

    return (
        <section className='relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-violet-50/50 via-white to-white'>
            {/* Subtle background glow effect */}
            <div className='absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-200/40 rounded-full blur-3xl pointer-events-none -z-10' />

            <div className='max-w-5xl mx-auto px-4 text-center'>
                <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100/80 border border-violet-200/60 text-violet-700 text-xs md:text-sm font-semibold mb-6 shadow-xs animate-in fade-in slide-in-from-top-4 duration-500'>
                    <Sparkles className='w-4 h-4 text-violet-600' />
                    <span>The #1 Modern Job & Career Discovery Platform</span>
                </div>

                <h1 className='text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight md:leading-none'>
                    Find Your Dream Job & <br className='hidden sm:inline' />
                    <span className='bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent'>
                        Accelerate Your Career
                    </span>
                </h1>

                <p className='mt-6 text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-normal leading-relaxed'>
                    Discover high-impact roles, remote opportunities, and tech jobs at world-class startups and industry giants.
                </p>

                {/* Search Box */}
                <div className='mt-8 max-w-2xl mx-auto'>
                    <div className='flex items-center bg-white p-2 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-200 focus-within:border-violet-500 focus-within:ring-4 focus-within:ring-violet-500/10 transition-all'>
                        <div className='pl-3 text-gray-400'>
                            <Search className='w-5 h-5' />
                        </div>
                        <input
                            type="text"
                            placeholder='Job title, keywords, or company...'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className='outline-none border-none w-full px-3 py-2 text-gray-900 placeholder:text-gray-400 text-sm md:text-base bg-transparent'
                        />
                        <Button 
                            onClick={() => searchJobHandler()} 
                            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium px-6 py-2.5 rounded-xl transition-all shadow-md shadow-violet-200"
                        >
                            Search Jobs
                        </Button>
                    </div>

                    {/* Trending keywords */}
                    <div className='flex items-center justify-center flex-wrap gap-2 mt-4 text-xs text-gray-500'>
                        <span className='font-semibold text-gray-600'>Trending:</span>
                        {trendingKeywords.map((kw) => (
                            <button
                                key={kw}
                                onClick={() => searchJobHandler(kw)}
                                className='px-2.5 py-1 rounded-md bg-gray-100 hover:bg-violet-100 hover:text-violet-700 text-gray-600 transition-colors font-medium'
                            >
                                {kw}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stats / Social Proof */}
                <div className='grid grid-cols-3 gap-4 max-w-xl mx-auto mt-14 pt-8 border-t border-gray-100'>
                    <div className='flex flex-col items-center'>
                        <div className='flex items-center gap-1 text-xl md:text-2xl font-bold text-gray-900'>
                            <Briefcase className='w-5 h-5 text-violet-600' />
                            <span>10k+</span>
                        </div>
                        <span className='text-xs md:text-sm text-gray-500 font-medium mt-0.5'>Active Jobs</span>
                    </div>

                    <div className='flex flex-col items-center'>
                        <div className='flex items-center gap-1 text-xl md:text-2xl font-bold text-gray-900'>
                            <Building2 className='w-5 h-5 text-indigo-600' />
                            <span>1.5k+</span>
                        </div>
                        <span className='text-xs md:text-sm text-gray-500 font-medium mt-0.5'>Top Companies</span>
                    </div>

                    <div className='flex flex-col items-center'>
                        <div className='flex items-center gap-1 text-xl md:text-2xl font-bold text-gray-900'>
                            <Users2 className='w-5 h-5 text-emerald-600' />
                            <span>45k+</span>
                        </div>
                        <span className='text-xs md:text-sm text-gray-500 font-medium mt-0.5'>Candidates Placed</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection