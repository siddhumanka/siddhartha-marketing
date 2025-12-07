import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
    const discount = Math.round(((product.price - product.sale_price) / product.price) * 100);
    
    const formatWeight = (weight) => {
        if (weight < 1) return `${weight * 1000}g`;
        return `${weight} KG`;
    };

    const whatsappMessage = encodeURIComponent(
        `Hi, I'm interested in ${product.title} (${formatWeight(product.weight)}) - SKU: ${product.product_id}. Please share more details.`
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <Card className="group overflow-hidden bg-white border-0 shadow-sm hover:shadow-xl transition-all duration-500 rounded-2xl">
                <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
                    <div className="aspect-square p-6 flex items-center justify-center">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    {discount > 0 && (
                        <Badge className="absolute top-4 left-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-3 py-1 rounded-full">
                            {discount}% OFF
                        </Badge>
                    )}
                    <Badge className="absolute top-4 right-4 bg-slate-800/90 hover:bg-slate-800 text-white font-medium px-3 py-1 rounded-full">
                        {formatWeight(product.weight)}
                    </Badge>
                </div>
                
                <div className="p-5 space-y-4">
                    <div>
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                            {product.product_id}
                        </p>
                        <h3 className="text-lg font-semibold text-slate-800 leading-tight">
                            {product.title}
                        </h3>
                    </div>
                    
                    <div className="flex items-baseline gap-3">
                        <span className="text-2xl font-bold text-slate-900">
                            ₹{product.sale_price.toLocaleString('en-IN')}
                        </span>
                        {product.price !== product.sale_price && (
                            <span className="text-sm text-slate-400 line-through">
                                ₹{product.price.toLocaleString('en-IN')}
                            </span>
                        )}
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                        <Button
                            asChild
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl h-11 font-medium"
                        >
                            <a
                                href={`https://wa.me/919422163831?text=${whatsappMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MessageCircle className="w-4 h-4 mr-2" />
                                WhatsApp
                            </a>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            className="flex-1 border-slate-200 hover:bg-slate-50 rounded-xl h-11 font-medium"
                        >
                            <a href="tel:+919422163831">
                                <Phone className="w-4 h-4 mr-2" />
                                Call
                            </a>
                        </Button>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}