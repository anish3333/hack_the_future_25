
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import FeatureCard from "@/components/FeatureCard";
import { 
  FileText, 
  Search, 
  Calendar, 
  Users, 
  BarChart, 
  Bot, 
  CheckCircle,
  Upload,
  Briefcase
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white z-0"></div>
        <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-gradient-to-br from-indigo-100 to-purple-100 blur-3xl opacity-50 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute left-0 bottom-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-100 to-indigo-100 blur-3xl opacity-50 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold gradient-heading tracking-tight">
              AI-Powered Recruitment Automation
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Summarize JDs, match CVs, schedule interviews — all in one flow.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/upload">
                <Button size="lg" className="text-md px-8 py-6 rounded-lg">
                  <Upload className="mr-2 h-5 w-5" /> Upload Resume
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-md px-8 py-6 rounded-lg">
                Try Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Streamline Your Hiring Process
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Our AI-powered platform automates every step of the recruitment process
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<FileText className="h-6 w-6" />}
              title="JD Summarization"
              description="Instantly generate concise summaries of job descriptions to identify key requirements and qualifications."
            />
            <FeatureCard
              icon={<Search className="h-6 w-6" />}
              title="CV Parsing"
              description="Extract structured data from resumes to quickly analyze candidate qualifications and experience."
            />
            <FeatureCard
              icon={<Bot className="h-6 w-6" />}
              title="AI Matching"
              description="Use advanced algorithms to match candidates to job requirements with precision and accuracy."
            />
            <FeatureCard
              icon={<Calendar className="h-6 w-6" />}
              title="Auto-Scheduling"
              description="Automatically schedule interviews based on candidate and interviewer availability."
            />
            <FeatureCard
              icon={<Users className="h-6 w-6" />}
              title="Virtual Group Discussions"
              description="Conduct and analyze virtual group discussions to assess team dynamics and collaboration skills."
            />
            <FeatureCard
              icon={<BarChart className="h-6 w-6" />}
              title="Comprehensive Analysis"
              description="Get detailed analytics on candidate performance across multiple criteria to make informed decisions."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Our platform simplifies every step of the recruitment process
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <Upload className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">1. Upload</h3>
              <p className="mt-2 text-base text-gray-500">Upload resume and job description for analysis</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">2. Edit & Match</h3>
              <p className="mt-2 text-base text-gray-500">View and edit parsed data before matching</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">3. Schedule</h3>
              <p className="mt-2 text-base text-gray-500">Automatically schedule interviews with candidates</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">4. Analyze</h3>
              <p className="mt-2 text-base text-gray-500">Get comprehensive analysis and make informed decisions</p>
            </div>
          </div>
          <div className="mt-16 text-center">
            <Link to="/upload">
              <Button size="lg" className="text-md px-8 py-6 rounded-lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 bg-indigo-600">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to transform your hiring process?
            </h2>
            <p className="mt-4 text-xl text-indigo-100 max-w-2xl mx-auto">
              Join thousands of companies using HireFlow to streamline their recruitment
            </p>
            <div className="mt-8">
              <Link to="/upload">
                <Button size="lg" variant="secondary" className="text-md px-8 py-6 rounded-lg">
                  <Briefcase className="mr-2 h-5 w-5" /> Start Hiring Smarter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
