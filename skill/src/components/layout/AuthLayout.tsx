import { Outlet } from "react-router-dom"

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-soft mb-4">
             <svg className="w-6 h-6 fill-transparent stroke-white" strokeWidth="2.2" strokeLinecap="round" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
             </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Explyra Skill</h1>
          <p className="text-sm text-muted-foreground mt-1 text-center">Your professional showcase and marketplace</p>
        </div>
        
        <Outlet />
        
      </div>
    </div>
  )
}
