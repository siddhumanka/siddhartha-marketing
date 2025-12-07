import React, { useState, useEffect, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ProductFilter from '@/components/ProductFilter';
import { Loader2, Package } from 'lucide-react';
import { motion } from 'framer-motion';

// --- START: CSV Data and Parser Utility ---

// Raw CSV content embedded as a string for static deployment readiness.
const rawCsvData = `title,description,image,categories,product_id,price,sale_price,inventory,weight,product_type,id,created_date,updated_date,created_by_id,created_by,is_sample
"Falcofix WR","","https://siddhartha-marketing.weeblysite.com/uploads/1/5/4/5/154504421/s130498019332684284_p1_i1_w1264.jpeg","","WR1KG","349.28","319.78","0","1","physical","6935570881ec144097d0494a","2025-12-07T10:29:28.263000","2025-12-07T10:29:28.263000","69355685b7ba1c4a22697f77","siddhu.manka94@gmail.com","false"
"Falcofix WR","","https://siddhartha-marketing.weeblysite.com/uploads/1/5/4/5/154504421/s130498019332684284_p1_i1_w1264.jpeg","","WR2KG","684.4","625.4","0","2","physical","6935570881ec144097d0494b","2025-12-07T10:29:28.263000","2025-12-07T10:29:28.263000","69355685b7ba1c4a22697f77","siddhu.manka94@gmail.com","false"
"Falcofix WR","","https://siddhartha-marketing.weeblysite.com/uploads/1/5/4/5/154504421/s130498019332684284_p1_i3_w990.jpeg","","WR5KG","1699.2","1551.7","0","5","physical","6935570881ec144097d0494c","2025-12-07T10:29:28.263000","2025-12-07T10:29:28.263000","69355685b7ba1c4a22697f77","siddhu.manka94@gmail.com","false"
"Falcofix WR","","https://siddhartha-marketing.weeblysite.com/uploads/1/5/4/5/154504421/s130498019332684284_p1_i4_w1080.jpeg","","WR10KG","3339.4","3044.4","0","10","physical","6935570881ec144097d0494d","2025-12-07T10:29:28.263000","2025-12-07T10:29:28.263000","69355685b7ba1c4a22697f77","siddhu.manka94@gmail.com","false"
"Falcofix WR","","https://siddhartha-marketing.weeblysite.com/uploads/1/5/4/5/154504421/s130498019332684284_p1_i4_w1080.jpeg","","WR20KG","6608","6018","0","20","physical","6935570881ec144097d0494e","2025-12-07T10:29:28.263000","2025-12-07T10:29:28.263000","69355685b7ba1c4a22697f77","siddhu.manka94@gmail.com","false"
"Falcofix WR","","https://siddhartha-marketing.weeblysite.com/uploads/1/5/4/5/154504421/s130498019332684284_p1_i6_w1000.jpeg","","WR50KG","16461","14986","0","50","physical","6935570881ec144097d0494f","2025-12-07T10:29:28.263000","2025-12-07T10:29:28.263000","69355685b7ba1c4a22697f77","siddhu.manka94@gmail.com","false"
"Falcofix WR","","https://siddhartha-marketing.weeblysite.com/uploads/1/5/4/5/154504421/s130498019332684284_p1_i6_w1000.jpeg","","WR55KG","18042.2","16419.7","0","55","physical","6935570881ec144097d04950","2025-12-07T10:29:28.263000","2025-12-07T10:29:28.263000","69355685b7ba1c4a22697f77","siddhu.manka94@gmail.com","false"
"Falcofix WR","","https://siddhartha-marketing.weeblysite.com/uploads/1/5/4/5/154504421/s130498019332684284_p1_i6_w1000.jpeg","","WR60KG","19328.4","17558.4","0","60","physical","6935570881ec144097d04951","2025-12-07T10:29:28.263000","2025-12-07T10:29:28.263000","69355685b7ba1c4a22697f77","siddhu.manka94@gmail.com","false"
"Falcofix WR","","https://siddhartha-marketing.weeblysite.com/uploads/1/5/4/5/154504421/s130498019332684284_p1_i7_w750.jpeg","","WR800G","247.4","268.33","0","0.8","physical","6935570881ec144097d04952","2025-12-07T10:29:28.263000","2025-12-07T10:29:28.263000","69355685b7ba1c4a22697f77","siddhu.manka94@gmail.com","false"
"Falcofix Ultra Marine","","https://siddhartha-marketing.weeblysite.com/uploads/1/5/4/5/154504421/s130498019332684284_p2_i1_w1500.jpeg","","UM1KG","320.37","296.77","0","1","physical","6935570881ec144097d04953","2025-12-07T10:29:28.263000","2025-12-07T10:29:28.263000","69355685b7ba1c4a22697f77","siddhu.manka94@gmail.com","false"
"Falcofix Ultra Marine","","https://siddhartha-marketing.weeblysite.com/uploads/1/5/4/5/154504421/s130498019332684284_p2_i2_w1453.jpeg","","UM2KG","610.66","562.86","0","2","physical","6935570881ec144097d04954","2025-12-07T10:29:28.263000","2025-12-07T10:29:28.263000","69355685b7ba1c4a22697f77","siddhu.manka94@gmail.com","false"
"Falcofix Ultra Marine","","https://siddhartha-marketing.weeblysite.com/uploads/1/5/4/5/154504421/s130498019332684284_p2_i3_w1990.jpeg","","UM5KG","1466.15","1348.15","0","5","physical","6935570881ec144097d04955","2025-12-07T10:29:28.263000","2025-12-07T10:29:28.263000","69355685b7ba1c4a22697f77","siddhu.manka94@gmail.com","false"
"Falcofix Ultra Marine","","https://siddhartha-marketing.weeblysite.com/uploads/1/5/4/5/154504421/s130498019332684284_p2_i4_w423.jpeg","","UM10KG","2826.1","2590.1","0","10","physical","6935570881ec144097d04956","2025-12-07T10:29:28.263000","2025-12-07T10:29:28.263000","69355685b7ba1c4a22697f77","siddhu.manka94@gmail.com","false"
"Falcofix Ultra Marine","","https://siddhartha-marketing.weeblysite.com/uploads/1/5/4/5/154504421/s130498019332684284_p2_i5_w423.jpeg","","UM20KG","5439.8","4967.8","0","20","physical","6935570881ec144097d04957","2025-12-07T10:29:28.263000","2025-12-07T10:29:28.263000","69355685b7ba1c4a22697f77","siddhu.manka94@gmail.com","false"
"Falcofix Ultra Marine","","https://siddhartha-marketing.weeblysite.com/uploads/1/5/4/5/154504421/s130498019332684284_p2_i6_w960.jpeg","","UM50KG","13068.5","11888.5","0","50","physical","6935570881ec144097d04958","2025-12-07T10:29:28.263000","2025-12-07T10:29:28.263000","69355685b7ba1c4a22697f77","siddhu.manka94@gmail.com","false"
"Falcofix Ultra Marine","","https://siddhartha-marketing.weeblysite.com/uploads/1/5/4/5/154504421/s130498019332684284_p2_i7_w960.jpeg","","UM55KG","14505.15","13207.15","0","55","physical","6935570881ec144097d04959","2025-12-07T10:29:28.263000","2025-12-07T10:29:28.263000","69355685b7ba1c4a22697f77","siddhu.manka94@gmail.com","false"
"Falcofix Ultra Marine","","https://siddhartha-marketing.weeblysite.com/uploads/1/5/4/5/154504421/s130498019332684284_p2_i8_w960.jpeg","","UM60KG","15328.2","13912.2","0","60","physical","6935570881ec144097d0495a","2025-12-07T10:29:28.263000","2025-12-07T10:29:28.263000","69355685b7ba1c4a22697f77","siddhu.manka94@gmail.com","false"
"Falcofix Ultra Marine","","https://siddhartha-marketing.weeblysite.com/uploads/1/5/4/5/154504421/s130498019332684284_p2_i9_w500.jpeg","","UM800G","198.5","215.35","0","0.8","physical","6935570881ec144097d0495b","2025-12-07T10:29:28.263000","2025-12-07T10:29:28.263000","69355685b7ba1c4a22697f77","siddhu.manka94@gmail.com","false"`;

// Simple CSV parser for this specific format
const parseCSV = (csv) => {
    const lines = csv.split('\n').filter(line => line.trim() !== '');
    if (lines.length === 0) return [];

    // Simple header extraction, assuming first line is header
    const headers = lines[0].split(',').map(header => header.trim().replace(/^"|"$/g, ''));
    const products = [];

    // Process lines starting from the second line (data)
    for (let i = 1; i < lines.length; i++) {
        // Use a simple regex to split by comma outside of quotes (for this clean CSV format)
        const values = lines[i].match(/(".*?"|[^",]+)(,|$)/g)
            .map(val => val.trim().replace(/,$/, '')) // Remove trailing comma from matches
            .map(val => val.replace(/^"|"$/g, '')); // Remove surrounding quotes

        const product = {};
        headers.forEach((header, index) => {
            product[header] = values[index];
        });
        products.push(product);
    }
    return products;
};

// --- END: CSV Data and Parser Utility ---


export default function Home() {
    const [activeFilter, setActiveFilter] = useState('all');
    
    // Parse the CSV data immediately and memoize the result
    // This is the functional replacement for the useQuery/base44 call.
    const allProducts = useMemo(() => parseCSV(rawCsvData), []);
    
    // Simulate loading for better UX on initial render, even with static data
    const [isLoading, setIsLoading] = useState(true);

    // Filter and transform price/weight to numbers for proper sorting and display
    const processedProducts = allProducts.map(product => ({
        ...product,
        // Convert weight from string to number for correct numerical sorting
        weight: parseFloat(product.weight) || 0,
        // Convert price fields to numbers for correct calculation logic in ProductCard
        price: parseFloat(product.price) || 0,
        sale_price: parseFloat(product.sale_price) || 0,
    }));

    useEffect(() => {
        // Simulate a small network delay for the "loading" state
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500); // 500ms simulation delay

        return () => clearTimeout(timer);
    }, []);

    // Filter logic remains the same
    const filteredProducts = processedProducts.filter(product => {
        if (activeFilter === 'all') return true;
        // Check product.title for filtering
        if (activeFilter === 'wr') return product.title === 'Falcofix WR';
        if (activeFilter === 'um') return product.title === 'Falcofix Ultra Marine';
        return true;
    });

    // Sort by weight (which is now a number)
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
                        Falcofix Product Catalogue
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
                        <p className="text-slate-500">Loading products from static data...</p>
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
