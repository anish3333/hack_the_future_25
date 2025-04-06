
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { FileUp, File, Check, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Upload() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <Layout>
      <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Upload Your Resume</h1>
          <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">
            Upload your resume to get an ATS-optimized view and match with relevant JDs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div
              className={`border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center h-80 transition-all cursor-pointer ${
                isDragging
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-300 hover:border-indigo-500 hover:bg-gray-50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <div className="text-center">
                <FileUp className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-4 text-lg font-medium text-gray-900">
                  {file ? file.name : "Drag and drop your resume here"}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  {file ? `${(file.size / 1024).toFixed(2)} KB` : "Or click to browse files"}
                </p>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileInput}
                />
                {file && (
                  <div className="mt-4 flex items-center justify-center">
                    <span className="flex items-center text-sm text-green-600">
                      <Check className="mr-1 h-4 w-4" /> File uploaded successfully
                    </span>
                    <button
                      type="button"
                      className="ml-2 text-sm text-red-500 hover:text-red-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">Supported file types</h3>
              <div className="mt-2 grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <File className="h-5 w-5 text-indigo-600" />
                  <span className="text-sm text-gray-700">PDF</span>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <File className="h-5 w-5 text-indigo-600" />
                  <span className="text-sm text-gray-700">DOC</span>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <File className="h-5 w-5 text-indigo-600" />
                  <span className="text-sm text-gray-700">DOCX</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Resume Preview</h3>
                    {file ? (
                      <>
                        <div className="p-4 bg-gray-50 rounded-lg mb-4">
                          <h4 className="text-xl font-bold">John Doe</h4>
                          <p className="text-gray-600">Senior Software Engineer</p>
                          <p className="text-sm text-gray-500">john.doe@example.com | (123) 456-7890</p>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h5 className="font-medium text-gray-900">Experience</h5>
                            <div className="mt-1">
                              <p className="text-sm">
                                <span className="font-medium">Tech Solutions Inc.</span> | Senior Software Engineer
                              </p>
                              <p className="text-xs text-gray-500">Jan 2020 - Present</p>
                              <p className="text-sm text-gray-600 mt-1">
                                Led development of cloud-based applications using React and Node.js.
                              </p>
                            </div>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">Education</h5>
                            <div className="mt-1">
                              <p className="text-sm">
                                <span className="font-medium">University of Technology</span> | Computer Science
                              </p>
                              <p className="text-xs text-gray-500">2012 - 2016</p>
                            </div>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">Skills</h5>
                            <div className="mt-1 flex flex-wrap gap-2">
                              <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded">React</span>
                              <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded">Node.js</span>
                              <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded">TypeScript</span>
                              <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded">AWS</span>
                              <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded">Docker</span>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="h-64 flex items-center justify-center border border-gray-200 rounded-lg">
                        <p className="text-gray-400">Upload a resume to see preview</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-4">
                    <Link to="/resume-editor">
                      <Button className="w-full" disabled={!file}>
                        Edit Resume and Match with JD
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
