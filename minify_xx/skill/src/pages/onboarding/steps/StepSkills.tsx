import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Plus, X } from "lucide-react"

interface Props {
  data: { skills: string[] };
  updateData: (data: any) => void;
}

export default function StepSkills({ data, updateData }: Props) {
  const [currentSkill, setCurrentSkill] = useState("")

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentSkill.trim() && !data.skills.includes(currentSkill.trim())) {
      updateData({ skills: [...data.skills, currentSkill.trim()] })
      setCurrentSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    updateData({ skills: data.skills.filter(s => s !== skillToRemove) })
  }

  return (
    <div className="space-y-6">
       <div className="space-y-2">
         <label className="text-sm font-medium leading-none text-foreground">Add your top skills</label>
         <p className="text-xs text-muted-foreground mb-4">E.g., Web Development, UI Design, Marketing, AI Tools</p>
         
         <form onSubmit={addSkill} className="flex gap-2">
           <Input 
             value={currentSkill}
             onChange={(e) => setCurrentSkill(e.target.value)}
             placeholder="Enter a skill..."
             className="flex-1"
           />
           <Button type="submit" variant="secondary" size="icon">
             <Plus className="h-4 w-4" />
           </Button>
         </form>
       </div>

       <div className="mt-6 flex flex-wrap gap-2">
         {data.skills.length === 0 ? (
           <p className="text-sm text-muted-foreground italic w-full text-center py-8 border border-dashed border-border rounded-lg">No skills added yet.</p>
         ) : (
           data.skills.map((skill) => (
             <div 
               key={skill} 
               className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
             >
               {skill}
               <button 
                 type="button" 
                 onClick={() => removeSkill(skill)}
                 className="p-0.5 hover:bg-primary/20 rounded-full transition-colors"
               >
                 <X className="h-3 w-3" />
               </button>
             </div>
           ))
         )}
       </div>
    </div>
  )
}
