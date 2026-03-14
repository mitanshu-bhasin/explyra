import { Input } from "@/components/ui/Input"
import { User, AtSign, AlignLeft, Link as LinkIcon } from "lucide-react"

interface Props {
  data: any;
  updateData: (data: any) => void;
}

export default function StepBasicInfo({ data, updateData }: Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Full Name</label>
        <div className="relative">
          <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            value={data.name} 
            onChange={(e) => updateData({ name: e.target.value })} 
            placeholder="John Doe" 
            className="pl-9" 
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none text-foreground">Username</label>
        <div className="relative">
          <AtSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            value={data.username} 
            onChange={(e) => updateData({ username: e.target.value })} 
            placeholder="johndoe123" 
            className="pl-9" 
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none text-foreground">Bio</label>
        <div className="relative">
          <AlignLeft className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <textarea
            value={data.bio}
            onChange={(e) => updateData({ bio: e.target.value })}
            placeholder="A short description about yourself and your expertise..."
            className="flex min-h-[100px] w-full rounded-md border border-border bg-transparent px-9 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 resize-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none text-foreground">Profile Image URL</label>
        <div className="relative">
          <LinkIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            value={data.imageUrl} 
            onChange={(e) => updateData({ imageUrl: e.target.value })} 
            placeholder="https://example.com/photo.jpg" 
            className="pl-9" 
          />
        </div>
      </div>
    </div>
  )
}
