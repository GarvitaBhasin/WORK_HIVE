import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { Filter, RotateCcw } from 'lucide-react'
import { Button } from './ui/button'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Remote"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Science"]
    },
    {
        filterType: "Salary Range",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh", "5lakh+"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    const resetFilters = () => {
        setSelectedValue('');
        dispatch(setSearchedQuery(''));
    }

    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);

    return (
        <div className='w-full bg-white p-5 rounded-2xl border border-gray-200 shadow-xs'>
            <div className='flex items-center justify-between pb-3 border-b border-gray-100'>
                <div className='flex items-center gap-2 font-bold text-gray-900'>
                    <Filter className='w-4 h-4 text-violet-600' />
                    <span>Filter Jobs</span>
                </div>
                {selectedValue && (
                    <Button 
                        onClick={resetFilters} 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs h-7 px-2 text-violet-600 hover:text-violet-700 hover:bg-violet-50 flex items-center gap-1"
                    >
                        <RotateCcw className='w-3 h-3' />
                        Reset
                    </Button>
                )}
            </div>

            <RadioGroup value={selectedValue} onValueChange={changeHandler} className='mt-4 space-y-5'>
                {
                    filterData.map((data, index) => (
                        <div key={index} className='space-y-2'>
                            <h3 className='font-bold text-xs uppercase tracking-wider text-gray-400'>
                                {data.filterType}
                            </h3>
                            <div className='space-y-2 pt-1'>
                                {
                                    data.array.map((item, idx) => {
                                        const itemId = `filter-${index}-${idx}`
                                        return (
                                            <div key={idx} className='flex items-center space-x-2.5 group cursor-pointer'>
                                                <RadioGroupItem value={item} id={itemId} className="text-violet-600 border-gray-300 focus:ring-violet-500" />
                                                <Label htmlFor={itemId} className='text-sm text-gray-600 group-hover:text-gray-900 cursor-pointer font-normal'>
                                                    {item}
                                                </Label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard