import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Users,
  MessageSquare,
  BarChart,
  Clock,
  Hand,
} from "lucide-react";
import { Link } from "react-router-dom";
import DiscussionWorld from "@/components/DiscussionWorld";

export default function GroupDiscussion() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isRaiseHand, setIsRaiseHand] = useState(false);

  const participants = [
    {
      id: 1,
      name: "John Doe",
      role: "Candidate",
      avatar: "/placeholder.svg",
      isActive: true,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Tech Lead",
      avatar: "/placeholder.svg",
      isActive: true,
    },
    {
      id: 3,
      name: "Emma Wilson",
      role: "CTO",
      avatar: "/placeholder.svg",
      isActive: true,
    },
    {
      id: 4,
      name: "Sarah Johnson",
      role: "HR Manager",
      avatar: "/placeholder.svg",
      isActive: true,
    },
    {
      id: 5,
      name: "David Kim",
      role: "Candidate",
      avatar: "/placeholder.svg",
      isActive: true,
    },
  ];

  return (
    <Layout>
      <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Group Discussion
            </h1>
            <p className="text-gray-600">Technical Problem Solving Session</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">45:23</span>
            </div>
            <Link to="/analysis">
              <Button>
                <BarChart className="mr-2 h-5 w-5" /> Analyze Discussion
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Discussion Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className="lg:col-span-3">
            {/* 3D Discussion World */}
            <div className="bg-gray-900 rounded-lg overflow-hidden aspect-video relative">
              <iframe
                src="http://127.0.0.1:5500/3d-discussion/index.html"
                className="w-full h-full border-0"
                title="Discussion World"
              ></iframe>
            </div>

            {/* Control Bar */}
            <div className="bg-white mt-4 p-4 rounded-lg border border-gray-200 flex flex-wrap justify-center md:justify-between items-center">
              <div className="flex space-x-2 mb-4 md:mb-0">
                <Button
                  variant={isMuted ? "destructive" : "secondary"}
                  size="icon"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? (
                    <MicOff className="h-5 w-5" />
                  ) : (
                    <Mic className="h-5 w-5" />
                  )}
                </Button>
                <Button
                  variant={isVideoOff ? "destructive" : "secondary"}
                  size="icon"
                  onClick={() => setIsVideoOff(!isVideoOff)}
                >
                  {isVideoOff ? (
                    <VideoOff className="h-5 w-5" />
                  ) : (
                    <Video className="h-5 w-5" />
                  )}
                </Button>
                <Button
                  variant={isRaiseHand ? "default" : "secondary"}
                  size="icon"
                  onClick={() => setIsRaiseHand(!isRaiseHand)}
                >
                  <Hand
                    className={`h-5 w-5 ${isRaiseHand ? "text-white" : ""}`}
                  />
                </Button>
                <Button variant="secondary" size="icon">
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </div>
              <Button variant="destructive" size="sm">
                Leave Room
              </Button>
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-indigo-600" />
                  Participants (5)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {participants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div className="relative">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <Users className="h-4 w-4 text-gray-600" />
                          </div>
                          {participant.isActive && (
                            <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-400 ring-1 ring-white"></span>
                          )}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {participant.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {participant.role}
                          </p>
                        </div>
                      </div>
                      {participant.id === 1 && isRaiseHand && (
                        <div className="h-5 w-5 bg-indigo-100 rounded-full flex items-center justify-center">
                          <Hand className="h-3 w-3 text-indigo-600" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-indigo-600" />
                  Discussion Topic
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-2">
                    System Design Challenge
                  </h3>
                  <p className="text-sm text-gray-600">
                    Design a scalable microservice architecture for an
                    e-commerce platform that can handle high traffic during
                    sales events.
                  </p>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">
                      Key Points to Address:
                    </h4>
                    <ul className="mt-2 text-sm text-gray-600 space-y-1 list-disc list-inside">
                      <li>Database selection and data modeling</li>
                      <li>API design and service boundaries</li>
                      <li>Scaling strategies and load balancing</li>
                      <li>Fault tolerance and redundancy</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4">
                  <Link to="/analysis">
                    <Button variant="outline" className="w-full">
                      <BarChart className="mr-2 h-5 w-5" /> View Analysis
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
