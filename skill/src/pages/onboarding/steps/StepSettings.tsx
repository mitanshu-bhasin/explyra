import { Input } from "@/components/ui/Input"
import { Mail, Globe, Eye, EyeOff } from "lucide-react"

interface Props {
  data: { 
    email: string;
    website: string;
    displaySettings: {
      showSkills: boolean;
      showExperience: boolean;
      showEducation: boolean;
      showEmail: boolean;
    }
  };
  updateData: (data: any) => void;
}

export default function StepSettings({ data, updateData }: Props) {

  const toggleSetting = (key: keyof typeof data.displaySettings) => {
    updateData({
      displaySettings: {
        ...data.displaySettings,
        [key]: !data.displaySettings[key]
      }
    })
  }

  return (
    <div className="space-y-8">
      {/* Contact Info */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-foreground border-b border-border pb-2">Contact Information</h4>
        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              value={data.email} 
              onChange={e => updateData({ email: e.target.value })} 
              type="email"
              placeholder="Public Contact Email" 
              className="pl-9" 
            />
          </div>
          <div className="relative">
            <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              value={data.website} 
              onChange={e => updateData({ website: e.target.value })} 
              type="url"
              placeholder="Portfolio / Website URL (Optional)" 
              className="pl-9" 
            />
          </div>
        </div>
      </div>

      {/* Display Settings */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-foreground border-b border-border pb-2">Public Profile Visibility</h4>
        <p className="text-xs text-muted-foreground">Choose what sections to show on your public profile page.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {[
            { key: 'showSkills', label: 'Skills Section' },
            { key: 'showExperience', label: 'Experience History' },
            { key: 'showEducation', label: 'Education History' },
            { key: 'showEmail', label: 'Contact Email' },
          ].map((item) => {
            const isVisible = data.displaySettings[item.key as keyof typeof data.displaySettings]
            return (
              <label 
                key={item.key}
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                  isVisible ? 'border-primary bg-primary/5' : 'border-border bg-surface'
                }`}
              >
                 <span className={`text-sm font-medium ${isVisible ? 'text-primary' : 'text-muted-foreground'}`}>
                   {item.label}
                 </span>
                 <div onClick={() => toggleSetting(item.key as keyof typeof data.displaySettings)}>
                   {isVisible ? <Eye className="h-4 w-4 text-primary" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                 </div>
              </label>
            )
          })}
        </div>
      </div>
    </div>
  )
}
