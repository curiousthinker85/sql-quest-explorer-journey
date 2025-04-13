
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Database, Home, BookOpen, Code, BarChart, User, Menu, X } from "lucide-react";
import FocusMode from '@/components/FocusMode';

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/tutorials", icon: BookOpen, label: "Tutorials" },
    { path: "/practice", icon: Code, label: "Practice" },
    { path: "/progress", icon: BarChart, label: "Progress" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="flex items-center mr-4 space-x-2">
          <Database className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">SQLQuest</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`text-sm font-medium transition-colors hover:text-primary flex items-center
                ${isActiveRoute(item.path) ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <item.icon className="h-4 w-4 mr-1" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="ml-auto flex items-center space-x-4">
          <div className="hidden md:block">
            <FocusMode />
          </div>
          <Button variant="outline" size="sm">Sign In</Button>
          <Button size="sm">Get Started</Button>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden p-0 w-9 h-9"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? 
              <X className="h-5 w-5" /> : 
              <Menu className="h-5 w-5" />
            }
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-2 pb-4 border-t bg-background">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`text-sm font-medium transition-colors hover:text-primary flex items-center p-2 rounded-md
                  ${isActiveRoute(item.path) ? 'bg-accent text-primary' : 'text-muted-foreground'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="h-4 w-4 mr-2" />
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="pt-2">
              <FocusMode />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
