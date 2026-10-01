import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Code2, Server, Database, Palette, Layers, Terminal, Sparkles } from 'lucide-react';

const categories = [
    { name: "Frontend Developer", icon: Code2 },
    { name: "Backend Developer", icon: Server },
    { name: "Data Science", icon: Database },
    { name: "Graphic Designer", icon: Palette },
    { name: "FullStack Developer", icon: Layers },
    { name: "DevOps Engineer", icon: Terminal },
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <section className='py-8 px-4'>
            <div className='max-w-4xl mx-auto'>
                <div className='text-center mb-6'>
                    <h2 className='text-xl md:text-2xl font-bold text-gray-900'>Explore by <span className='text-violet-600'>Popular Categories</span></h2>
                    <p className='text-xs md:text-sm text-gray-500 mt-1'>Browse verified roles by specialized tech domain</p>
                </div>
                
                <Carousel className="w-full max-w-2xl mx-auto">
                    <CarouselContent className='-ml-2 md:-ml-4'>
                        {
                            categories.map((cat, index) => {
                                const Icon = cat.icon;
                                return (
                                    <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3">
                                        <Button 
                                            onClick={() => searchJobHandler(cat.name)} 
                                            variant="outline" 
                                            className="w-full h-12 flex items-center justify-center gap-2 rounded-xl border-gray-200 hover:border-violet-400 hover:bg-violet-50/50 hover:text-violet-700 transition-all font-medium text-xs sm:text-sm shadow-xs hover:shadow-sm"
                                        >
                                            <Icon className='w-4 h-4 text-violet-600' />
                                            <span className='truncate'>{cat.name}</span>
                                        </Button>
                                    </CarouselItem>
                                );
                            })
                        }
                    </CarouselContent>
                    <CarouselPrevious className="hover:bg-violet-50 hover:text-violet-600 border-gray-200" />
                    <CarouselNext className="hover:bg-violet-50 hover:text-violet-600 border-gray-200" />
                </Carousel>
            </div>
        </section>
    )
}

export default CategoryCarousel