
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/Layout";
import { 
  Download, 
  BarChart, 
  BarChart4, 
  Users, 
  MessageSquare, 
  Lightbulb,
  CheckSquare,
  User
} from "lucide-react";

const candidateScores = [
  {
    id: 1,
    name: "John Doe",
    avatar: "/placeholder.svg",
    role: "Candidate",
    communication: 85,
    technical: 90,
    collaboration: 80,
    leadership: 75,
    overall: 82,
    strengths: ["Clear communication", "Strong technical knowledge", "Problem-solving skills"],
    areas: ["Could speak up more in group settings", "Sometimes interrupts others"]
  },
  {
    id: 5,
    name: "David Kim",
    avatar: "/placeholder.svg",
    role: "Candidate",
    communication: 75,
    technical: 85,
    collaboration: 90,
    leadership: 70,
    overall: 78,
    strengths: ["Team collaboration", "Asks insightful questions", "Good listener"],
    areas: ["Technical explanations could be clearer", "More confidence needed"]
  }
];

export default function Analysis() {
  return (
    <Layout>
      <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analysis Results</h1>
            <p className="mt-2 text-lg text-gray-600">
              Comprehensive evaluation of candidate performance in group discussion
            </p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-5 w-5" /> Download Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-gray-500">Discussion Duration</p>
                  <p className="text-2xl font-bold text-gray-900">45m 23s</p>
                </div>
                <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <BarChart className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-gray-500">Participants</p>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                </div>
                <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-gray-500">Total Interactions</p>
                  <p className="text-2xl font-bold text-gray-900">87</p>
                </div>
                <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-gray-500">Ideas Generated</p>
                  <p className="text-2xl font-bold text-gray-900">23</p>
                </div>
                <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Candidate Evaluations */}
        <div className="space-y-8">
          {candidateScores.map((candidate) => (
            <Card key={candidate.id} className="overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center border border-gray-200">
                    <User className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-bold text-gray-900">{candidate.name}</h2>
                    <p className="text-gray-600">{candidate.role}</p>
                  </div>
                  <div className="ml-auto">
                    <div className="bg-white px-4 py-2 rounded-full border border-gray-200 flex items-center">
                      <span className="text-lg font-bold gradient-heading">{candidate.overall}%</span>
                      <span className="ml-2 text-sm text-gray-500">Overall Score</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Communication Skills</span>
                          <span className="text-sm font-medium text-gray-700">{candidate.communication}%</span>
                        </div>
                        <Progress value={candidate.communication} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Technical Knowledge</span>
                          <span className="text-sm font-medium text-gray-700">{candidate.technical}%</span>
                        </div>
                        <Progress value={candidate.technical} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Team Collaboration</span>
                          <span className="text-sm font-medium text-gray-700">{candidate.collaboration}%</span>
                        </div>
                        <Progress value={candidate.collaboration} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Leadership Potential</span>
                          <span className="text-sm font-medium text-gray-700">{candidate.leadership}%</span>
                        </div>
                        <Progress value={candidate.leadership} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Qualitative Analysis</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 flex items-center">
                          <CheckSquare className="h-4 w-4 text-green-600 mr-2" />
                          Strengths
                        </h4>
                        <ul className="mt-2 space-y-2">
                          {candidate.strengths.map((strength, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="h-5 w-5 text-green-500 mr-2">•</span>
                              <span className="text-gray-700">{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 flex items-center">
                          <BarChart4 className="h-4 w-4 text-amber-600 mr-2" />
                          Areas for Improvement
                        </h4>
                        <ul className="mt-2 space-y-2">
                          {candidate.areas.map((area, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="h-5 w-5 text-amber-500 mr-2">•</span>
                              <span className="text-gray-700">{area}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg mt-6">
                        <h4 className="font-medium text-gray-900">AI Summary</h4>
                        <p className="mt-2 text-sm text-gray-600">
                          {candidate.name} demonstrated strong technical knowledge during the discussion.
                          {candidate.id === 1 
                            ? " Their approach to the database design problem was innovative and they clearly explained complex concepts to the group."
                            : " They worked well with others and helped facilitate productive discussion among team members."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Conclusion Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Final Recommendation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Based on the group discussion analysis, both candidates demonstrated strong technical skills and teamwork abilities.
              However, John Doe showed superior technical knowledge and communication skills, making him the stronger candidate for the
              Senior Software Engineer position.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <h3 className="font-medium text-green-800">Recommend for Hire</h3>
                <p className="text-sm text-green-700 mt-2">John Doe - Senior Software Engineer</p>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-xs text-green-700">Overall Score: 82%</p>
                  <Button variant="outline" size="sm" className="text-green-700 bg-white border-green-200 hover:bg-green-50">
                    <Download className="mr-2 h-4 w-4" /> Get Report
                  </Button>
                </div>
              </div>
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                <h3 className="font-medium text-amber-800">Consider for Different Role</h3>
                <p className="text-sm text-amber-700 mt-2">David Kim - Product Manager</p>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-xs text-amber-700">Overall Score: 78%</p>
                  <Button variant="outline" size="sm" className="text-amber-700 bg-white border-amber-200 hover:bg-amber-50">
                    <Download className="mr-2 h-4 w-4" /> Get Report
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
