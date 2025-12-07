import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ProductFilter from '@/components/ProductFilter';
import { Loader2, Package } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
    const [activeFilter, setActiveFilter] = useState('all');

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => base44.entities.Product.list(),
    });

    const filteredProducts = products.filter(product => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'wr') return product.title === 'Falcofix WR';
        if (activeFilter === 'um') return product.title === 'Falcofix Ultra Marine';
        return true;
    });

    // Sort by weight
    const sortedProducts = [...filteredProducts].sort((a, b) => a.weight - b.weight);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <Header />
            
            <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                {/* Hero Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 md:mb-14"
                >
                    <span className="inline-block bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                        Premium Quality Adhesives
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                        Falcofix Product Range
                    </h2>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                        Industrial-grade adhesive solutions for all your bonding needs. 
                        Available in various pack sizes for every requirement.
                    </p>
                </motion.div>

                {/* Filter */}
                <div className="mb-8 md:mb-10">
                    <ProductFilter 
                        activeFilter={activeFilter} 
                        setActiveFilter={setActiveFilter} 
                    />
                </div>

                {/* Products Grid */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-4" />
                        <p className="text-slate-500">Loading products...</p>
                    </div>
                ) : sortedProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Package className="w-16 h-16 text-slate-300 mb-4" />
                        <p className="text-slate-500 text-lg">No products found</p>
                    </div>
                ) : (
                    <motion.div 
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6"
                    >
                        {sortedProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Stats Section */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
                >
                    {[
                        { value: '25+', label: 'Years Experience' },
                        { value: '500+', label: 'Happy Clients' },
                        { value: '18', label: 'Product Variants' },
                        { value: '100%', label: 'Quality Assured' }
                    ].map((stat, index) => (
                        <div 
                            key={index}
                            className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-100"
                        >
                            <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm text-slate-500 font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
