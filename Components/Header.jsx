import React from 'react';
import { Phone, Mail, MapPin } from "lucide-react";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
            <div className="bg-slate-900 text-white py-2">
                <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center md:justify-between items-center gap-2 text-xs md:text-sm">
                    <div className="flex items-center gap-4 md:gap-6">
                        <a href="tel:+919422163831" className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                            <Phone className="w-3.5 h-3.5" />
                            <span>+91 94221 63831</span>
                        </a>
                        <a href="mailto:mankashyam@gmail.com" className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                            <Mail className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">mankashyam@gmail.com</span>
                        </a>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="hidden md:inline">53, GMD Market, Ranpise Nagar, Akola 444001</span>
                        <span className="md:hidden">Akola, Maharashtra</span>
                    </div>
                </div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
                            <span className="text-white font-bold text-xl md:text-2xl">S</span>
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                                Siddhartha Marketing
                            </h1>
                            <p className="text-xs md:text-sm text-slate-500 font-medium">
                                Quality Adhesive Solutions
                            </p>
                        </div>
                    </div>
                    
                    <a
                        href="https://wa.me/919422163831?text=Hi, I'm interested in your Falcofix products. Please share more details."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-green-200 hover:shadow-green-300"
                    >
                        <Phone className="w-4 h-4" />
                        Contact Us
                    </a>
                </div>
            </div>
        </header>
    );
}