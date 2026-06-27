export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex w-full bg-slate-50">
      {/* Left side: Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white shadow-2xl z-10 relative">
         <div className="w-full max-w-md">
            {children}
         </div>
      </div>

      {/* Right side: Branding Hero */}
      <div className="hidden lg:flex flex-1 relative bg-indigo-900 overflow-hidden items-center justify-center p-12">
        {/* Abstract Background Elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/30 blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-3xl"></div>
        
        <div className="relative z-10 text-white max-w-lg">
           <h1 className="text-4xl font-extrabold mb-6 leading-tight">
             The Operating System for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Local SEO</span>
           </h1>
           <p className="text-lg text-indigo-200 mb-8 leading-relaxed">
             Join thousands of agencies automating their Google Business Profiles, tracking local geo-grids, and capturing more local traffic.
           </p>
           
           <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">✓</div>
                 <span>Automated GBP Posting & Review Replies</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">✓</div>
                 <span>Local Heatmap Ranking Trackers</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">✓</div>
                 <span>Autonomous AI Workforce</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
