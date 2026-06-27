"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowLeft, Trophy, Download } from "lucide-react";
import Link from "next/link";

// Helper to determine color based on rank
const getRankColor = (rank: number) => {
  if (rank === 0) return "bg-gray-400"; // Unranked or >20
  if (rank <= 3) return "bg-green-500";
  if (rank <= 10) return "bg-yellow-500";
  return "bg-red-500";
};

// Generate a 5x5 array of mock ranks
const generateMockGrid = () => {
  const ranks = [
    21, 14, 8, 12, 18,
    15, 6,  3,  5,  11,
    9,  2,  1,  3,  7,
    14, 5,  4,  6,  12,
    19, 11, 7,  9,  16
  ];
  return ranks;
};

export default function GridHeatmapVisualizer() {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const nodes = generateMockGrid();

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
           <Link href="/dashboard/grid" className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2">
             <ArrowLeft size={14} /> Back to Scans
           </Link>
           <h1 className="text-2xl font-bold tracking-tight">"plumber near me"</h1>
           <p className="text-muted-foreground">Acme Plumbing • 5x5 Grid • 5 Mile Radius</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="gap-2"><Download size={16} /> Export PDF</Button>
           <Button className="bg-blue-600 hover:bg-blue-700">Share Report</Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        
        {/* Visual Map Area */}
        <div className="flex-1 lg:w-2/3 bg-[#e5e3df] dark:bg-zinc-800 rounded-xl border shadow-inner relative overflow-hidden min-h-[500px]">
           {/* Mock Map Background styling */}
           <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
             backgroundImage: `radial-gradient(circle at 50% 50%, transparent 20%, rgba(0,0,0,0.1) 21%, rgba(0,0,0,0.1) 34%, transparent 35%, transparent), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.8) 100%)`,
             backgroundSize: '100px 100px'
           }} />
           
           <div className="absolute inset-0 flex items-center justify-center p-8">
             {/* 5x5 Grid CSS */}
             <div className="grid grid-cols-5 gap-4 sm:gap-8 w-full max-w-2xl aspect-square">
               {nodes.map((rank, idx) => (
                 <button 
                    key={idx}
                    onClick={() => setActiveNode(idx)}
                    className={`
                      w-full h-full rounded-full flex items-center justify-center font-bold text-white shadow-lg
                      transition-transform hover:scale-110 active:scale-95 border-2
                      ${getRankColor(rank)}
                      ${activeNode === idx ? 'border-white ring-4 ring-blue-400' : 'border-black/10'}
                      ${idx === 12 ? 'ring-2 ring-white/50 relative after:content-[""] after:absolute after:-bottom-4 after:w-2 after:h-2 after:bg-blue-600 after:rounded-full' : ''} // Center pin marker
                    `}
                 >
                   <span className="text-sm sm:text-xl drop-shadow-md">{rank > 20 ? '20+' : rank}</span>
                 </button>
               ))}
             </div>
           </div>
           
           <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur p-3 rounded-lg border shadow-sm text-xs">
              <div className="font-bold mb-2">Legend</div>
              <div className="flex items-center gap-2 mb-1"><div className="w-3 h-3 rounded-full bg-green-500"></div> Top 3</div>
              <div className="flex items-center gap-2 mb-1"><div className="w-3 h-3 rounded-full bg-yellow-500"></div> Page 1 (4-10)</div>
              <div className="flex items-center gap-2 mb-1"><div className="w-3 h-3 rounded-full bg-red-500"></div> Page 2+ (11+)</div>
           </div>
        </div>

        {/* Competitor Sidebar */}
        <div className="lg:w-1/3">
           <Card className="h-full">
             <CardHeader className="bg-muted/30 border-b">
               <CardTitle className="flex items-center gap-2">
                 <Trophy size={18} className="text-amber-500" /> 
                 {activeNode !== null ? `Node #${activeNode + 1} Rankings` : 'Overall Competitors'}
               </CardTitle>
               <CardDescription>
                 {activeNode !== null ? 'Click a different node on the map to see its specific rankings.' : 'Select a node on the map to see who is outranking you at that specific spot.'}
               </CardDescription>
             </CardHeader>
             <CardContent className="p-0">
                <div className="divide-y">
                   {/* Mock Competitor List */}
                   {[
                     { rank: 1, name: "Joe's Emergency Plumbing", score: 9.8, isUs: false },
                     { rank: 2, name: "Acme Plumbing", score: 9.5, isUs: true },
                     { rank: 3, name: "Downtown Rooter", score: 8.2, isUs: false },
                     { rank: 4, name: "Roto-Rooter Plumbers", score: 7.9, isUs: false },
                     { rank: 5, name: "A1 Pipe Services", score: 6.5, isUs: false },
                   ].map((comp) => (
                     <div key={comp.rank} className={`p-4 flex items-center justify-between ${comp.isUs ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                        <div className="flex items-center gap-3">
                           <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${comp.rank <= 3 ? 'bg-amber-100 text-amber-700' : 'bg-muted text-muted-foreground'}`}>
                             #{comp.rank}
                           </div>
                           <div>
                             <div className={`font-semibold text-sm ${comp.isUs ? 'text-blue-700 dark:text-blue-400' : ''}`}>
                               {comp.name} {comp.isUs && '(You)'}
                             </div>
                             <div className="text-xs text-muted-foreground flex items-center gap-1"><MapPin size={10} /> 1.2 miles away</div>
                           </div>
                        </div>
                        <div className="text-right">
                           <div className="text-xs font-bold">{comp.score}</div>
                           <div className="text-[10px] text-muted-foreground">Local Score</div>
                        </div>
                     </div>
                   ))}
                </div>
             </CardContent>
           </Card>
        </div>

      </div>
    </div>
  );
}
