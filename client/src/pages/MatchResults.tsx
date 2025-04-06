
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/Layout";
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  Download,
  ThumbsUp,
  AlertCircle,
  BarChart4
} from "lucide-react";
import { Link } from "react-router-dom";

export default function MatchResults() {
  const matchedSkills = [
    { name: "React", match: true },
    { name: "Node.js", match: true },
    { name: "TypeScript", match: true },
    { name: "AWS", match: true },
    { name: "Docker", match: true },
    { name: "CI/CD", match: false },
    { name: "DevOps", match: false },
    { name: "Microservices", match: true },
    { name: "GraphQL", match: false },
    { name: "Agile", match: true },
  ];

  const matchedExperience = [
    { requirement: "5+ years of experience", match: true, comment: "Candidate has 6 years of relevant experience" },
    { requirement: "Cloud platforms", match: true, comment: "Strong AWS experience" },
    { requirement: "Full-stack development", match: true, comment: "Both frontend and backend experience" },
    { requirement: "CI/CD pipelines", match: true, comment: "Experience with GitHub Actions" },
    { requirement: "Team leadership", match: false, comment: "Limited leadership experience" },
  ];

  return (
    <Layout>
      <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Match Results</h1>
          <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">
            Comparing candidate profile with the Senior Software Engineer position
          </p>
        </div>

        {/* Match Score Overview */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900">Anish Awasthi</h2>
              <p className="text-gray-600">Applying for: Senior Software Engineer</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-center">
                <div className="text-5xl font-bold gradient-heading">85%</div>
                <p className="text-gray-600">Match Score</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link to="/schedule">
                <Button>
                  <Calendar className="mr-2 h-5 w-5" /> Schedule Interview
                </Button>
              </Link>
              <Button variant="outline">
                <Download className="mr-2 h-5 w-5" /> Download Report
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Match Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Skills Match */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart4 className="mr-2 h-5 w-5 text-indigo-600" />
                  Skills Match (80%)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {matchedSkills.map((skill) => (
                    <div 
                      key={skill.name} 
                      className={`p-3 rounded-lg text-center ${
                        skill.match 
                          ? "bg-green-50 border border-green-100" 
                          : "bg-gray-50 border border-gray-100"
                      }`}
                    >
                      <div className="flex justify-center mb-2">
                        {skill.match ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <p className={`text-sm font-medium ${skill.match ? "text-green-800" : "text-gray-500"}`}>
                        {skill.name}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Experience Match */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-indigo-600" />
                  Experience Match (90%)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {matchedExperience.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mr-4 mt-1">
                        {item.match ? (
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                        ) : (
                          <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center">
                            <AlertCircle className="h-4 w-4 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.requirement}</p>
                        <p className="text-sm text-gray-600">{item.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ThumbsUp className="mr-2 h-5 w-5 text-indigo-600" />
                  AI Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Based on our AI analysis, Anish Awasthi is a strong candidate for the Senior Software Engineer position. 
                    The candidate has relevant experience in most of the required technologies and skills. 
                    Particularly strong in React, TypeScript, and cloud technologies.
                  </p>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Strengths</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      <li>Strong technical skills in required areas</li>
                      <li>Relevant experience with cloud platforms and containerization</li>
                      <li>Experience working on similar projects</li>
                      <li>Good educational background in Computer Science</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Areas for Improvement</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      <li>Limited leadership experience compared to job requirements</li>
                      <li>Missing some experience with GraphQL</li>
                      <li>Could benefit from more exposure to DevOps practices</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Match Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Overall Match</span>
                      <span className="text-sm font-medium text-gray-700">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Skills Match</span>
                      <span className="text-sm font-medium text-gray-700">80%</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Experience Match</span>
                      <span className="text-sm font-medium text-gray-700">90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Education Match</span>
                      <span className="text-sm font-medium text-gray-700">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommendation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-green-50 rounded-lg border border-green-100 flex items-start mb-4">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-green-800">Recommended for Interview</p>
                    <p className="text-sm text-green-700 mt-1">
                      This candidate meets most of the job requirements and would be a good fit for the role.
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <Link to="/schedule">
                    <Button className="w-full">
                      <Calendar className="mr-2 h-5 w-5" /> Schedule Interview
                    </Button>
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
