
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Database, Home, BookOpen, Code, BarChart } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="flex items-center mr-4 space-x-2">
          <Database className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">SQLQuest</span>
        </Link>
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary flex items-center">
            <Home className="h-4 w-4 mr-1" />
            <span>Home</span>
          </Link>
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary flex items-center">
            <BookOpen className="h-4 w-4 mr-1" />
            <span>Tutorials</span>
          </Link>
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary flex items-center">
            <Code className="h-4 w-4 mr-1" />
            <span>Practice</span>
          </Link>
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary flex items-center">
            <BarChart className="h-4 w-4 mr-1" />
            <span>Progress</span>
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="outline" size="sm">Sign In</Button>
          <Button size="sm">Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
