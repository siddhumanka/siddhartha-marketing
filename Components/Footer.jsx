import React from 'react';
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white mt-16">
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-xl">S</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Siddhartha Marketing</h3>
                                <p className="text-sm text-slate-400">Since 1995</p>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Your trusted partner for premium quality Falcofix adhesive products. 
                            Serving businesses across Maharashtra with excellence.
                        </p>
                    </div>
                    
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Contact Information</h4>
                        <div className="space-y-3">
                            <a href="tel:+919422163831" className="flex items-center gap-3 text-slate-300 hover:text-orange-400 transition-colors">
                                <Phone className="w-5 h-5" />
                                <span>+91 94221 63831</span>
                            </a>
                            <a href="mailto:mankashyam@gmail.com" className="flex items-center gap-3 text-slate-300 hover:text-orange-400 transition-colors">
                                <Mail className="w-5 h-5" />
                                <span>mankashyam@gmail.com</span>
                            </a>
                            <div className="flex items-start gap-3 text-slate-300">
                                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <span>53, GMD Market, Ranpise Nagar,<br />Akola 444001, Maharashtra</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Get in Touch</h4>
                        <p className="text-slate-400 text-sm">
                            Have questions about our products? We're here to help!
                        </p>
                        <a
                            href="https://wa.me/919422163831?text=Hi, I'm interested in your Falcofix products. Please share more details."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Chat on WhatsApp
                        </a>
                    </div>
                </div>
                
                <div className="border-t border-slate-800 mt-10 pt-8 text-center text-slate-400 text-sm">
                    <p>© {new Date().getFullYear()} Siddhartha Marketing. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}