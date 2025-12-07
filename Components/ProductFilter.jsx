import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ProductFilter({ activeFilter, setActiveFilter }) {
    const filters = [
        { id: 'all', label: 'All Products' },
        { id: 'wr', label: 'Falcofix WR' },
        { id: 'um', label: 'Ultra Marine' }
    ];

    return (
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {filters.map((filter) => (
                <Button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    variant={activeFilter === filter.id ? "default" : "outline"}
                    className={`
                        rounded-full px-5 md:px-6 py-2 font-medium transition-all duration-300
                        ${activeFilter === filter.id 
                            ? 'bg-slate-900 text-white shadow-lg shadow-slate-300' 
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                        }
                    `}
                >
                    {filter.label}
                </Button>
            ))}
        </div>
    );
}
