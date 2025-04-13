
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import FocusMode from '@/components/FocusMode';
import TreePlantingPlayground from '@/components/TreePlantingPlayground';
import { BarChart, Calendar, CheckCircle2, Clock, Award, BarChart2, TrendingUp } from 'lucide-react';

const ProgressPage = () => {
  const [treesPlanted, setTreesPlanted] = useState(3);
  
  const handleFocusComplete = () => {
    setTreesPlanted(prev => prev + 1);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container px-4 py-8 md:px-6">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter">Your Progress</h1>
              <p className="text-gray-500">Track your SQL learning journey</p>
            </div>
            <FocusMode onComplete={handleFocusComplete} />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Completed Lessons
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-bold">7</div>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    12%
                  </Badge>
                </div>
                <Progress value={12} className="h-2 mt-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Completed Exercises
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-bold">15</div>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    25%
                  </Badge>
                </div>
                <Progress value={25} className="h-2 mt-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Focus Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-bold">60 <span className="text-base text-gray-500">mins</span></div>
                  <Clock className="h-4 w-4 text-amber-500" />
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  3 focus sessions completed
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Trees Planted
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-bold">{treesPlanted}</div>
                  <Tree className="h-4 w-4 text-green-500" />
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Next achievement in {5 - (treesPlanted % 5)} trees
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="statistics">Statistics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart className="h-5 w-5 mr-2 text-primary" />
                        Learning Progress
                      </CardTitle>
                      <CardDescription>
                        Your progress across different SQL topics
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {progressData.map((item) => (
                          <div key={item.topic} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-medium">{item.topic}</div>
                              <div className="text-sm text-gray-500">{item.progress}%</div>
                            </div>
                            <Progress value={item.progress} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <TreePlantingPlayground treesPlanted={treesPlanted} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-primary" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity, i) => (
                        <div key={i} className="flex gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center 
                            ${activity.type === 'lesson' ? 'bg-blue-100' : 
                              activity.type === 'exercise' ? 'bg-green-100' : 
                              activity.type === 'focus' ? 'bg-amber-100' : 'bg-purple-100'}`}>
                            {activity.type === 'lesson' ? <BookOpen className="h-4 w-4 text-blue-600" /> : 
                              activity.type === 'exercise' ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : 
                              activity.type === 'focus' ? <Clock className="h-4 w-4 text-amber-600" /> : 
                              <Award className="h-4 w-4 text-purple-600" />
                            }
                          </div>
                          <div>
                            <div className="text-sm font-medium">{activity.title}</div>
                            <div className="text-xs text-gray-500">{activity.timestamp}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                      Suggested Next Steps
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {suggestedNextSteps.map((step, i) => (
                        <div key={i} className="p-3 bg-gray-50 rounded-md border hover:border-primary hover:bg-gray-100 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{step.title}</div>
                            <Badge variant="outline">{step.category}</Badge>
                          </div>
                          <div className="text-sm text-gray-500 mt-1">{step.description}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="achievements">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {achievements.map((achievement, i) => (
                  <Card key={i} className={`${achievement.unlocked ? "" : "opacity-60"}`}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className={achievement.unlocked ? 
                          "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                          {achievement.unlocked ? "Unlocked" : "Locked"}
                        </Badge>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center
                          ${achievement.unlocked ? "bg-green-100" : "bg-gray-100"}`}>
                          <award.icon className={`h-5 w-5 ${achievement.unlocked ? "text-green-600" : "text-gray-400"}`} />
                        </div>
                      </div>
                      <CardTitle className="text-lg">{achievement.title}</CardTitle>
                      <CardDescription>{achievement.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm">
                        <div className="font-medium">{achievement.unlocked ? "Unlocked on:" : "Requirements:"}</div>
                        <div className="text-gray-500">{achievement.unlocked ? achievement.date : achievement.requirement}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="statistics">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart2 className="h-5 w-5 mr-2 text-primary" />
                      SQL Topic Mastery
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <div className="text-center text-gray-500 italic">
                      Chart visualization would go here in a real application
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-primary" />
                      Time Spent Learning
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <div className="text-center text-gray-500 italic">
                      Chart visualization would go here in a real application
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

// Sample data
const progressData = [
  { topic: "SELECT Statements", progress: 80 },
  { topic: "WHERE Clause", progress: 65 },
  { topic: "JOINs", progress: 45 },
  { topic: "GROUP BY", progress: 30 },
  { topic: "Subqueries", progress: 15 },
  { topic: "Window Functions", progress: 5 },
];

const recentActivities = [
  { type: 'lesson', title: 'Completed: Introduction to SQL', timestamp: '2 hours ago' },
  { type: 'exercise', title: 'Completed: Select All Records Exercise', timestamp: '3 hours ago' },
  { type: 'focus', title: 'Completed a 20-minute focus session', timestamp: 'Yesterday' },
  { type: 'achievement', title: 'Earned: SQL Beginner Badge', timestamp: 'Yesterday' },
  { type: 'lesson', title: 'Started: WHERE Clause Lesson', timestamp: '2 days ago' },
];

const suggestedNextSteps = [
  { 
    title: 'JOINs in SQL', 
    category: 'Lesson', 
    description: 'Learn how to combine data from multiple tables' 
  },
  { 
    title: 'Filter by Multiple Conditions', 
    category: 'Exercise', 
    description: 'Practice using AND/OR operators in WHERE clauses' 
  },
  { 
    title: 'Complete a Focus Session', 
    category: 'Activity', 
    description: 'Plant a tree by focusing for 20 minutes' 
  },
];

const achievements = [
  {
    title: 'First Steps',
    description: 'Complete your first SQL lesson',
    icon: Award,
    unlocked: true,
    date: 'April 10, 2025',
    requirement: 'Complete 1 lesson'
  },
  {
    title: 'Query Master',
    description: 'Successfully execute 10 SQL queries',
    icon: CheckCircle2,
    unlocked: true,
    date: 'April 11, 2025',
    requirement: 'Execute 10 queries'
  },
  {
    title: 'Environmental Hero',
    description: 'Plant 5 trees through focus sessions',
    icon: Tree,
    unlocked: false,
    requirement: 'Complete 5 focus sessions'
  },
  {
    title: 'SQL Apprentice',
    description: 'Complete 5 lessons in a row',
    icon: Award,
    unlocked: false,
    requirement: 'Complete 5 consecutive lessons'
  },
  {
    title: 'Problem Solver',
    description: 'Complete 15 exercises without hints',
    icon: CheckCircle2,
    unlocked: false,
    requirement: 'Complete 15 exercises without using hints'
  },
  {
    title: 'Dedicated Learner',
    description: 'Study SQL for a total of 5 hours',
    icon: Clock,
    unlocked: false,
    requirement: 'Accumulate 5 hours of study time'
  }
];

import { BookOpen, Tree } from 'lucide-react';

export default ProgressPage;
