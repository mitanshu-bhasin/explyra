import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { useApp } from "@/hooks/useApp"

import StepBasicInfo from "./steps/StepBasicInfo"
import StepSkills from "./steps/StepSkills"
import StepExperience from "./steps/StepExperience"
import StepEducation from "./steps/StepEducation"
import StepSettings from "./steps/StepSettings"

const steps = [
  { id: 1, title: "Basic Info", description: "Who are you?" },
  { id: 2, title: "Skills", description: "What can you do?" },
  { id: 3, title: "Experience", description: "Where have you worked?" },
  { id: 4, title: "Education", description: "Where did you study?" },
  { id: 5, title: "Settings", description: "Display preferences" },
]

export default function OnboardingContainer() {
  const navigate = useNavigate()
  const { setUser } = useApp()
  const [currentStep, setCurrentStep] = useState(1)
  
  const [profileData, setProfileData] = useState({
    name: "",
    username: "",
    bio: "",
    imageUrl: "",
    skills: [] as string[],
    experience: { years: "", description: "" },
    education: [] as { id: string; institution: string; degree: string; field: string; year: string }[],
    email: "",
    website: "",
    displaySettings: {
      showSkills: true,
      showExperience: true,
      showEducation: true,
      showEmail: false,
    },
    following: [],
    followers: [],
  })

  const updateData = (data: Partial<typeof profileData>) => {
    setProfileData(prev => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(curr => curr + 1)
    } else {
      setUser(profileData)
      navigate('/profile/me')
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(curr => curr - 1)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-12 px-4">
      {/* Progress Header */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex justify-between items-center mb-4">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center w-full">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${
                  currentStep >= step.id 
                    ? "bg-primary text-white" 
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {step.id}
              </div>
              <span className={`text-xs mt-2 font-medium hidden sm:block ${
                currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
              }`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
           <div 
             className="h-full bg-primary transition-all duration-500 ease-in-out" 
             style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
           />
        </div>
      </div>

      <Card className="w-full max-w-2xl border-border/50 shadow-card overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border/50 pb-6">
          <CardTitle className="text-xl">{steps[currentStep-1].title}</CardTitle>
          <CardDescription>{steps[currentStep-1].description}</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 relative min-h-[400px]">
           <AnimatePresence mode="wait">
             <motion.div
               key={currentStep}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={{ duration: 0.2 }}
             >
                {currentStep === 1 && <StepBasicInfo data={profileData} updateData={updateData} />}
                {currentStep === 2 && <StepSkills data={profileData} updateData={updateData} />}
                {currentStep === 3 && <StepExperience data={profileData} updateData={updateData} />}
                {currentStep === 4 && <StepEducation data={profileData} updateData={updateData} />}
                {currentStep === 5 && <StepSettings data={profileData} updateData={updateData} />}
             </motion.div>
           </AnimatePresence>
        </CardContent>
        <div className="p-6 border-t border-border flex justify-between bg-muted/10">
          <Button 
            variant="outline" 
            onClick={prevStep} 
            disabled={currentStep === 1}
          >
            Back
          </Button>
          <Button onClick={nextStep}>
            {currentStep === steps.length ? "Complete Profile" : "Continue"}
          </Button>
        </div>
      </Card>
      
    </div>
  )
}
