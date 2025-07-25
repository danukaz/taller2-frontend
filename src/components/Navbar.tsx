'use client';
import { useState } from 'react';
import Link from 'next/link';
import { MenuIcon, ShoppingCartIcon, UserIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useCartStore } from '@/stores/CartStore';
import { useAuth } from '@/hooks/useAuth';

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const {items: cart} = useCartStore();
    const {user} = useAuth(); 

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    
    return (
        <nav className="bg-blue-600 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Brand - Lado izquierdo */}
                    <div className="flex-shrink-0">
                        <Link 
                            href="/"
                            className="text-white text-xl font-bold hover:text-blue-100 transition-colors duration-200"
                        >
                            IDWM
                        </Link>
                    </div>

                    {/* Botones de autenticación - Desktop */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/register">
                            <Button
                                variant="ghost"
                                className="text-white hover:text-blue-100 transition-colors duration-200"
                            >
                                Registrarse
                            </Button>
                        </Link>

                        {user ? (
                            <li>
                                <Link href="/profile" className="flex items-center hover:bg-blue-400 rounded-full p-2 transition-all">
                                    <UserIcon className="w-6 h-6" />
                                    <span className="ml-2">{user.firtsName}</span>
                                </Link>
                            </li>
                        ) : <Link href="/login">
                                <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full">
                                    <UserIcon /> Iniciar sesión
                                </Button>
                            </Link>
                        }

                        <li>
                            <Link href = {'/cart'} className="relative flex items-center hover:bg-blue-400 rounded-full p-2 transition-all">
                                <ShoppingCartIcon className="w-6 h-6"/>
                                {
                                    totalItems > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2">
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        </li>

                    </div>

                    {/* Menú hamburguesa - Mobile */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleMenu}
                            className="text-white hover:bg-blue-700"
                        >
                            {menuOpen ? (
                                <XIcon className="h-6 w-6" />
                            ) : (
                                <MenuIcon className="h-6 w-6" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Menú móvil */}
                {menuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-700">
                            <Link 
                                href="/register"
                                className="block"
                                onClick={() => setMenuOpen(false)}
                            >
                                <Button
                                    variant="ghost"
                                    className="w-full text-white hover:text-blue-100 transition-colors duration-200"
                                >
                                    Registrarse
                                </Button>
                            </Link>
                            <Link 
                                href="/login"
                                className="block"
                                onClick={() => setMenuOpen(false)}
                            >
                                <Button
                                    className="w-full bg-sky-400 text-white hover:bg-sky-300 transition-colors duration-200"
                                >
                                    Iniciar Sesión
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}