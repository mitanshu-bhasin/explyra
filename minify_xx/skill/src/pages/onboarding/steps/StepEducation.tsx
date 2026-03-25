import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Plus, X, GraduationCap, Building, Calendar } from "lucide-react"

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  year: string;
}

interface Props {
  data: { education: Education[] };
  updateData: (data: any) => void;
}

export default function StepEducation({ data, updateData }: Props) {
  const [edu, setEdu] = useState<Partial<Education>>({
    institution: "", degree: "", field: "", year: ""
  })

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (edu.institution && edu.degree) {
      updateData({
        education: [...data.education, { ...edu, id: Date.now().toString() } as Education]
      })
      setEdu({ institution: "", degree: "", field: "", year: "" })
    }
  }

  const handleRemove = (id: string) => {
    updateData({
      education: data.education.filter(e => e.id !== id)
    })
  }

  return (
    <div className="space-y-6">
      
      <form onSubmit={handleAdd} className="bg-secondary/50 p-4 rounded-xl border border-border space-y-4">
        <h4 className="text-sm font-semibold text-foreground">Add Education</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
             <Building className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
             <Input 
               value={edu.institution || ""} 
               onChange={e => setEdu({...edu, institution: e.target.value})}
               placeholder="Institution Name" 
               className="pl-9 bg-surface" 
               required
             />
          </div>
          <div className="relative">
             <GraduationCap className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
             <Input 
               value={edu.degree || ""} 
               onChange={e => setEdu({...edu, degree: e.target.value})}
               placeholder="Degree (e.g. B.S.)" 
               className="pl-9 bg-surface" 
               required
             />
          </div>
          <div className="relative">
             <GraduationCap className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
             <Input 
               value={edu.field || ""} 
               onChange={e => setEdu({...edu, field: e.target.value})}
               placeholder="Field of Study" 
               className="pl-9 bg-surface" 
             />
          </div>
          <div className="relative flex items-center gap-2">
             <div className="relative flex-1">
               <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
               <Input 
                 value={edu.year || ""} 
                 onChange={e => setEdu({...edu, year: e.target.value})}
                 placeholder="Graduation Year" 
                 className="pl-9 bg-surface" 
               />
             </div>
             <Button type="submit" size="icon" className="shrink-0">
               <Plus className="h-4 w-4" />
             </Button>
          </div>
        </div>
      </form>

      <div className="space-y-3">
        {data.education.length === 0 ? (
          <p className="text-sm text-muted-foreground italic w-full text-center py-6 border border-dashed border-border rounded-lg">No education history added.</p>
        ) : (
          data.education.map(item => (
            <div key={item.id} className="flex justify-between items-start p-3 rounded-lg border border-border bg-surface shadow-sm">
               <div>
                  <h5 className="font-semibold text-sm text-foreground">{item.degree} in {item.field}</h5>
                  <p className="text-xs text-muted-foreground mt-1">{item.institution} • {item.year}</p>
               </div>
               <button 
                 onClick={() => handleRemove(item.id)}
                 className="p-1 text-muted-foreground hover:bg-secondary hover:text-foreground rounded-md transition-colors"
               >
                 <X className="h-4 w-4"/>
               </button>
            </div>
          ))
        )}
      </div>

    </div>
  )
}
