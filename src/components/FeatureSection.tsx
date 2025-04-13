
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Database, BookOpen, Award } from "lucide-react";

const features = [
  {
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    title: "Interactive Tutorials",
    description: "Step-by-step lessons teach SQL concepts with interactive examples and explanations."
  },
  {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: "Live SQL Editor",
    description: "Write and run real SQL queries directly in your browser with instant feedback."
  },
  {
    icon: <Database className="h-10 w-10 text-primary" />,
    title: "Visual Schema Browser",
    description: "Explore database structure visually to better understand table relationships."
  },
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    title: "Progress Tracking",
    description: "Track your learning journey with completion badges and skill assessments."
  }
];

const FeatureSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Everything you need to learn SQL
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Our platform provides all the tools necessary to master SQL from beginner to advanced levels.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-primary/50 transition-all duration-200">
              <CardHeader className="pb-2">
                <div className="mb-2">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
