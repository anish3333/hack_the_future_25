import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/Layout";
import { Briefcase, GraduationCap, Award, Code, Edit, CheckCircle, AlertTriangle, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { KeywordMatch } from "@/components/KeywordMatch";
import { ATSScoreIndicator } from "@/components/ATSScoreIndicator";
import { SkillSuggestion } from "@/components/SkillSuggestion";
import { LoadingState } from "@/components/LoadingState";

export default function ResumeEditor() {
  const [isEditing, setIsEditing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentTab, setCurrentTab] = useState("skills");
  const [skills, setSkills] = useState([
    "React", "Node.js", "TypeScript", "JavaScript", "HTML/CSS", 
    "AWS", "Docker", "Git", "REST APIs", "MongoDB"
  ]);
  
  // Mock ATS analysis data
  const keywordMatches = [
    { keyword: "React", inResume: true, importance: "high" as const },
    { keyword: "Node.js", inResume: true, importance: "high" as const },
    { keyword: "TypeScript", inResume: true, importance: "high" as const },
    { keyword: "AWS", inResume: true, importance: "medium" as const },
    { keyword: "Docker", inResume: true, importance: "medium" as const },
    { keyword: "CI/CD", inResume: false, importance: "high" as const },
    { keyword: "Microservices", inResume: false, importance: "medium" as const },
    { keyword: "Kubernetes", inResume: false, importance: "medium" as const },
    { keyword: "GraphQL", inResume: false, importance: "low" as const },
  ];
  
  const skillSuggestions = [
    { skill: "CI/CD", reason: "Mentioned as key requirement in job description" },
    { skill: "Microservices", reason: "Closely related to your Docker experience" },
    { skill: "Kubernetes", reason: "Often paired with Docker in job requirements" },
    { skill: "GraphQL", reason: "Listed as preferred qualification" },
  ];
  
  const atsScore = 76;
  
  const addSkill = (newSkill: string) => {
    if (!skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
    }
  };

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  if (isAnalyzing) {
    return <LoadingState type="resume" />;
  }

  return (
    <Layout>
      <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Resume Editor</h1>
          <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">
            Review, edit, and optimize your resume data to match job requirements.
          </p>
        </div>

        {/* Main content grid with responsive layout */}
        <div className="flex flex-col gap-6">
          {/* Left column: Job Description and ATS Analysis */}
          <div className="grid grid-cols-2 gap-6">
            {/* Job Description Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Job Description</h2>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Senior Software Engineer
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900">Company Overview</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      TechCorp is a leading technology company specializing in cloud solutions and enterprise software.
                      We are looking for a Senior Software Engineer to join our growing team.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Key Requirements</h3>
                    <ul className="mt-2 space-y-2 list-disc list-inside text-sm text-gray-600">
                      <li>5+ years of experience in full-stack development</li>
                      <li>Strong proficiency in React, Node.js, and TypeScript</li>
                      <li>Experience with cloud platforms (AWS/Azure/GCP)</li>
                      <li>Knowledge of containerization and orchestration tools</li>
                      <li>Experience with CI/CD pipelines and DevOps practices</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Preferred Qualifications</h3>
                    <ul className="mt-2 space-y-2 list-disc list-inside text-sm text-gray-600">
                      <li>Master's degree in Computer Science or related field</li>
                      <li>Experience with microservice architecture</li>
                      <li>Familiarity with GraphQL</li>
                      <li>Understanding of agile methodologies</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* ATS Analysis Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">ATS Analysis</h2>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleRunAnalysis}
                    className="gap-1"
                  >
                    <Zap className="h-4 w-4" />
                    Reanalyze
                  </Button>
                </div>
                
                <ATSScoreIndicator score={atsScore} className="mb-6" />
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      Keyword Matches
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {keywordMatches.map((item, index) => (
                        <KeywordMatch 
                          key={index}
                          keyword={item.keyword}
                          inResume={item.inResume}
                          importance={item.importance}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 flex items-center gap-2 mb-3">
                      <Zap className="h-4 w-4 text-indigo-500" />
                      Recommended Improvements
                    </h3>
                    <div className="space-y-2">
                      {skillSuggestions.map((item, index) => (
                        <SkillSuggestion
                          key={index}
                          skill={item.skill}
                          reason={item.reason}
                          onAdd={addSkill}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column: Resume Data */}
          <div>
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Resume Data</h2>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" /> Save
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </>
                    )}
                  </Button>
                </div>

                <Tabs value={currentTab} onValueChange={setCurrentTab}>
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="skills">
                      <Code className="h-4 w-4 mr-2" /> Skills
                    </TabsTrigger>
                    <TabsTrigger value="experience">
                      <Briefcase className="h-4 w-4 mr-2" /> Experience
                    </TabsTrigger>
                    <TabsTrigger value="education">
                      <GraduationCap className="h-4 w-4 mr-2" /> Education
                    </TabsTrigger>
                    <TabsTrigger value="certifications">
                      <Award className="h-4 w-4 mr-2" /> Certifications
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="skills" className="mt-0">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-3">Technical Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <div key={skill} className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                            {skill}
                          </div>
                        ))}
                      </div>
                      {isEditing && (
                        <div className="mt-3">
                          <input
                            type="text"
                            placeholder="Add more skills..."
                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                          />
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="experience" className="mt-0">
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-gray-900">Tech Solutions Inc.</h3>
                          <span className="text-sm text-gray-500">Jan 2020 - Present</span>
                        </div>
                        <p className="text-sm text-indigo-600">Senior Software Engineer</p>
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">
                            • Led a team of 5 developers to build a cloud-based e-commerce platform
                            <br />
                            • Implemented CI/CD pipelines using GitHub Actions and AWS
                            <br />
                            • Developed microservices using Node.js and Docker
                          </p>
                        </div>
                        {isEditing && (
                          <textarea
                            className="w-full mt-3 p-2 border border-gray-300 rounded-md text-sm"
                            rows={3}
                            defaultValue="• Led a team of 5 developers to build a cloud-based e-commerce platform
• Implemented CI/CD pipelines using GitHub Actions and AWS
• Developed microservices using Node.js and Docker"
                          />
                        )}
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-gray-900">WebDev Corp</h3>
                          <span className="text-sm text-gray-500">Mar 2017 - Dec 2019</span>
                        </div>
                        <p className="text-sm text-indigo-600">Frontend Developer</p>
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">
                            • Developed responsive web applications using React and Redux
                            <br />
                            • Implemented unit tests with Jest and React Testing Library
                            <br />
                            • Collaborated with UX designers to implement UI components
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="education" className="mt-0">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-900">University of Technology</h3>
                        <span className="text-sm text-gray-500">2012 - 2016</span>
                      </div>
                      <p className="text-sm text-indigo-600">Bachelor of Science in Computer Science</p>
                      <p className="text-sm text-gray-600 mt-2">GPA: 3.8/4.0</p>
                      {isEditing && (
                        <div className="mt-3 space-y-2">
                          <input
                            type="text"
                            defaultValue="University of Technology"
                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              defaultValue="2012 - 2016"
                              className="p-2 border border-gray-300 rounded-md text-sm"
                            />
                            <input
                              type="text"
                              defaultValue="Bachelor of Science in Computer Science"
                              className="p-2 border border-gray-300 rounded-md text-sm"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="certifications" className="mt-0">
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-gray-900">AWS Certified Solutions Architect</h3>
                          <span className="text-sm text-gray-500">2022</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Amazon Web Services</p>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-gray-900">Professional Scrum Master I</h3>
                          <span className="text-sm text-gray-500">2020</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Scrum.org</p>
                      </div>
                      
                      {isEditing && (
                        <div className="p-4 border border-dashed border-gray-300 rounded-lg text-center">
                          <button
                            type="button"
                            className="text-sm text-indigo-600 hover:text-indigo-800"
                          >
                            + Add Certification
                          </button>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-6">
                  <Link to="/match-results">
                    <Button className="w-full">Run Matching Algorithm</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}