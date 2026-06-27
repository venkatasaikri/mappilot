"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, TrendingUp, Users, Sparkles, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

const keywords = [
  { term: "best plumber near me", rank: 3, change: 2, volume: 1200 },
  { term: "emergency plumbing", rank: 1, change: 0, volume: 850 },
  { type: "drain cleaning", rank: 8, change: -3, volume: 500 },
];

const competitors = [
  { name: "Joe's Pipes", rank: 1, score: 92 },
  { name: "City Rooter", rank: 2, score: 88 },
  { name: "Acme Plumbing (You)", rank: 3, score: 85 },
];

export default function LocalSeoDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Local SEO Intelligence</h1>
          <p className="text-muted-foreground">Track rankings, analyze competitors, and get AI insights.</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="border rounded-md px-3 py-1.5 text-sm bg-background">
            <option>Acme Plumbing - Downtown</option>
            <option>Acme Plumbing - Uptown</option>
          </select>
          <Button variant="outline">Run Manual Scan</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Local SEO Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">85<span className="text-xl opacity-70">/100</span></div>
            <p className="text-xs opacity-80 mt-1">+3 points from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Keywords in Top 3</CardTitle>
            <Target className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 text-green-600 mt-1">
              <ArrowUpRight size={12} /> 2 new keywords
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Grid Rank</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2</div>
            <p className="text-xs text-muted-foreground mt-1">Across 7x7 grid scan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Competitor Gap</CardTitle>
            <Users className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-7 pts</div>
            <p className="text-xs text-muted-foreground mt-1">Behind market leader</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex space-x-1 border-b mt-8">
        {['overview', 'keywords', 'competitors'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors capitalize ${
              activeTab === tab 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'overview' && (
            <Card className="h-full min-h-[300px]">
              <CardHeader>
                <CardTitle>Visibility Trend</CardTitle>
                <CardDescription>Your local search visibility over the last 30 days.</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center border-t border-dashed m-4 p-8 rounded-md bg-muted/10">
                <p className="text-sm text-muted-foreground">Chart Representation Placeholder</p>
              </CardContent>
            </Card>
          )}

          {activeTab === 'keywords' && (
            <Card>
              <CardHeader>
                <CardTitle>Tracked Keywords</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                    <tr>
                      <th className="px-4 py-2">Keyword</th>
                      <th className="px-4 py-2 text-center">Rank</th>
                      <th className="px-4 py-2 text-center">Change</th>
                      <th className="px-4 py-2 text-right">Vol</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {keywords.map((kw, i) => (
                      <tr key={i}>
                        <td className="px-4 py-3 font-medium">{kw.term || kw.type}</td>
                        <td className="px-4 py-3 text-center font-bold">{kw.rank}</td>
                        <td className="px-4 py-3 text-center">
                          {kw.change > 0 ? (
                            <span className="text-green-600 flex justify-center items-center gap-1"><ArrowUpRight size={14}/> {kw.change}</span>
                          ) : kw.change < 0 ? (
                            <span className="text-red-600 flex justify-center items-center gap-1"><ArrowDownRight size={14}/> {Math.abs(kw.change)}</span>
                          ) : (
                            <span className="text-muted-foreground flex justify-center items-center gap-1"><Minus size={14}/></span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right text-muted-foreground">{kw.volume}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}

          {activeTab === 'competitors' && (
            <Card>
              <CardHeader>
                <CardTitle>Top Local Competitors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {competitors.map((comp, i) => (
                    <div key={i} className={`flex items-center justify-between p-3 rounded-lg border ${comp.name.includes('(You)') ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20' : 'bg-background'}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-sm">
                          {comp.rank}
                        </div>
                        <span className="font-medium">{comp.name}</span>
                      </div>
                      <div className="font-bold">{comp.score} pts</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card className="border-purple-200 dark:border-purple-900 shadow-sm">
            <CardHeader className="bg-purple-50 dark:bg-purple-900/10 border-b border-purple-100 dark:border-purple-900/50">
              <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-400">
                <Sparkles size={18} />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                <div className="p-4 hover:bg-muted/50 transition-colors">
                  <h4 className="font-medium text-sm text-foreground">Respond to 3 recent reviews</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your response rate dropped to 85%. Responding quickly boosts local relevance.
                  </p>
                  <Button variant="link" className="h-auto p-0 mt-2 text-xs text-purple-600">Take Action &rarr;</Button>
                </div>
                <div className="p-4 hover:bg-muted/50 transition-colors">
                  <h4 className="font-medium text-sm text-foreground">Add "Emergency" to Services</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    "Emergency plumbing" is trending in your area. Adding this to your GBP services can increase impressions.
                  </p>
                  <Button variant="link" className="h-auto p-0 mt-2 text-xs text-purple-600">Take Action &rarr;</Button>
                </div>
                <div className="p-4 hover:bg-muted/50 transition-colors">
                  <h4 className="font-medium text-sm text-foreground">Post a new update</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    It's been 14 days since your last Google Post. Active profiles rank higher.
                  </p>
                  <Button variant="link" className="h-auto p-0 mt-2 text-xs text-purple-600">Take Action &rarr;</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
