import { Input } from "@/components/ui/Input"
import { Briefcase, AlignLeft } from "lucide-react"

interface Props {
  data: { experience: { years: string; description: string } };
  updateData: (data: any) => void;
}

export default function StepExperience({ data, updateData }: Props) {
  
  const updateExp = (field: string, value: string) => {
    updateData({ 
       experience: { ...data.experience, [field]: value } 
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none text-foreground">Years of Experience</label>
        <div className="relative">
          <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="number"
            min="0"
            max="50"
            value={data.experience.years} 
            onChange={(e) => updateExp('years', e.target.value)} 
            placeholder="e.g. 5" 
            className="pl-9" 
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none text-foreground">Previous Work Description</label>
        <p className="text-xs text-muted-foreground mb-2">Summarize your professional background, past roles, or major projects.</p>
        <div className="relative">
          <AlignLeft className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <textarea
            value={data.experience.description}
            onChange={(e) => updateExp('description', e.target.value)}
            placeholder="I have worked as a Senior Designer at..."
            className="flex min-h-[150px] w-full rounded-md border border-border bg-transparent px-9 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 resize-none"
          />
        </div>
      </div>
    </div>
  )
}
