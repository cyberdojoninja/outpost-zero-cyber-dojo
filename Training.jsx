
import React, { useState, useEffect } from "react";
import { TabletopExercise, TrainingContent } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayCircle, Users, Clock, Target, Award, Wand2, Video } from "lucide-react";
import ExerciseCard from "../components/training/ExerciseCard";
import ExerciseBuilder from "../components/training/ExerciseBuilder";
import ActiveExercise from "../components/training/ActiveExercise";
import AIVideoGenerator from "../components/training/AIVideoGenerator";

export default function TrainingPage() {
  const [exercises, setExercises] = useState([]);
  const [trainingContent, setTrainingContent] = useState([]);
  const [activeExercise, setActiveExercise] = useState(null);
  const [showBuilder, setShowBuilder] = useState(false);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("video-generator");

  useEffect(() => {
    loadTrainingData();
  }, []);

  const loadTrainingData = async () => {
    setIsLoading(true);
    try {
      const [exerciseData, contentData] = await Promise.all([
        TabletopExercise.list("-created_date"),
        TrainingContent.list("-created_date")
      ]);
      setExercises(exerciseData.length > 0 ? exerciseData : mockExercises);
      setTrainingContent(contentData.length > 0 ? contentData : mockTrainingContent);
    } catch (error) {
      console.error("Error loading training data:", error);
      setExercises(mockExercises);
      setTrainingContent(mockTrainingContent);
    }
    setIsLoading(false);
  };

  const handleAIVideoCreated = async (videoContent) => {
    // In a real app, this would save to the database
    setTrainingContent(prev => [videoContent, ...prev]);
    setShowAIGenerator(false);
  };

  const mockExercises = [
    {
      id: "ex_001",
      exercise_id: "TTE-2024-001",
      title: "Advanced Persistent Threat Response",
      description: "A sophisticated APT group has infiltrated your network. Practice detection, containment, and eradication.",
      theme: "apt_campaign",
      difficulty_level: "advanced",
      participants: [],
      instructor: "security.lead@company.com",
      status: "draft",
      duration_minutes: 120
    },
    {
      id: "ex_002",
      exercise_id: "TTE-2024-002", 
      title: "Ransomware Incident Simulation",
      description: "Your organization has been hit by ransomware. Navigate the crisis management process.",
      theme: "ransomware",
      difficulty_level: "intermediate",
      participants: [],
      instructor: "incident.manager@company.com",
      status: "scheduled",
      duration_minutes: 90
    }
  ];

  const mockTrainingContent = [
    {
      content_id: "tc_001",
      title: "Incident Response Fundamentals",
      description: "Learn the core principles of incident response using our advanced security platform.",
      content_type: "video",
      use_case: "incident_response",
      difficulty_level: "beginner",
      duration_minutes: 15,
      ai_generated: true,
      animation_style: "2d_animated",
      video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      learning_objectives: [
        "Understand the incident response lifecycle",
        "Learn to use platform dashboards for incident triage",
        "Master basic containment procedures"
      ],
      effectiveness_rating: 4.8,
      completion_rate: 92,
      preview_note: "🎬 Demo video - In production, this would show actual incident response workflows"
    },
    {
      content_id: "tc_002", 
      title: "Advanced Threat Hunting with Custom QL",
      description: "Master our custom Query Language for proactive threat detection.",
      content_type: "interactive_demo",
      use_case: "threat_hunting",
      difficulty_level: "advanced",
      duration_minutes: 25,
      ai_generated: true,
      animation_style: "interactive_walkthrough",
      video_url: "https://www.youtube.com/embed/oHg5SJYRHA0", // Changed URL
      learning_objectives: [
        "Write complex queries",
        "Correlate multiple data sources", 
        "Build automated hunting rules"
      ],
      effectiveness_rating: 4.6,
      completion_rate: 78,
      preview_note: "🎬 Demo video - Production version includes live query editor and real-time query execution"
    },
    {
      content_id: "tc_003",
      title: "SOAR Playbook Development",
      description: "Create and optimize automated response playbooks",
      content_type: "video",
      use_case: "soar_playbooks",
      difficulty_level: "intermediate", 
      duration_minutes: 20,
      ai_generated: true,
      animation_style: "3d_rendered",
      video_url: "https://www.youtube.com/embed/9bZkp7q19f0", // Changed URL
      learning_objectives: [
        "Design effective playbook workflows",
        "Integrate with external systems",
        "Test and validate automation logic"
      ],
      effectiveness_rating: 4.7,
      completion_rate: 85,
      preview_note: "🎬 Demo video - Live version shows drag-and-drop playbook builder with real integrations"
    }
  ];

  if (activeExercise) {
    return <ActiveExercise exercise={activeExercise} onExit={() => setActiveExercise(null)} />;
  }

  if (showBuilder) {
    return <ExerciseBuilder onSave={(exercise) => { console.log("Saving exercise:", exercise); setShowBuilder(false); }} onCancel={() => setShowBuilder(false)} />;
  }

  if (showAIGenerator) {
    return (
      <div className="min-h-screen p-4 md:p-8" style={{background: 'var(--primary-bg)'}}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={() => setShowAIGenerator(false)} className="border-gray-700 text-gray-300">
              ← Back to Training
            </Button>
            <h1 className="text-2xl font-bold text-white">AI Training Video Generator</h1>
          </div>
          <AIVideoGenerator onVideoCreated={handleAIVideoCreated} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ background: 'var(--primary-bg)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-purple-500/10 rounded-lg">
            <Video className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Professional Video Center</h1>
            <p className="text-gray-300">AI-powered demo video generation for presentations and training</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="video-generator">AI Video Generator</TabsTrigger>
            <TabsTrigger value="exercises">Tabletop Exercises</TabsTrigger>
            <TabsTrigger value="videos">Video Library</TabsTrigger>
            <TabsTrigger value="analytics">Training Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="video-generator" className="mt-6">
            <AIVideoGenerator />
          </TabsContent>

          <TabsContent value="exercises" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                <p className="text-white">Loading exercises...</p>
              ) : (
                exercises.map(exercise => (
                  <ExerciseCard 
                    key={exercise.id} 
                    exercise={exercise} 
                    onStart={() => setActiveExercise(exercise)}
                  />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                <p className="text-white">Loading training content...</p>
              ) : (
                trainingContent.map(content => (
                  <Card key={content.content_id} className="border-gray-700 bg-gray-800/50 flex flex-col">
                    <CardHeader>
                      <div className="aspect-video rounded-lg overflow-hidden mb-4 relative">
                        <iframe
                          className="w-full h-full"
                          src={content.video_url}
                          title={content.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                        {content.preview_note && (
                          <div className="absolute top-2 left-2 right-2">
                            <div className="bg-blue-500/80 text-white text-xs px-2 py-1 rounded">
                              Demo Content
                            </div>
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-white flex items-center gap-2">
                        <PlayCircle className="w-5 h-5 text-blue-400" />
                        {content.title}
                      </CardTitle>
                      <div className="flex gap-2 pt-2 flex-wrap">
                        <Badge variant="secondary">{content.use_case.replace(/_/g, ' ')}</Badge>
                        <Badge variant="outline" className="text-cyan-300 border-cyan-300/50">
                          {content.difficulty_level}
                        </Badge>
                        <Badge variant="outline" className="text-gray-400 border-gray-400/50">
                          <Clock className="w-3 h-3 mr-1" />
                          {content.duration_minutes}m
                        </Badge>
                        {content.ai_generated && (
                          <Badge className="bg-purple-500/20 text-purple-400">
                            <Wand2 className="w-3 h-3 mr-1" />
                            AI Generated
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-gray-300 text-sm mb-4 flex-1">{content.description}</p>
                      
                      {content.preview_note && (
                        <div className="mb-3 p-2 bg-blue-500/10 border border-blue-500/20 rounded text-xs text-blue-300">
                          {content.preview_note}
                        </div>
                      )}
                      
                      {content.learning_objectives && (
                        <div className="mb-4">
                          <h4 className="text-white font-medium mb-2 text-sm">Learning Objectives:</h4>
                          <ul className="space-y-1">
                            {content.learning_objectives.slice(0, 2).map((objective, index) => (
                              <li key={index} className="text-gray-300 text-xs flex items-start gap-2">
                                <span className="text-green-400 mt-1">•</span>
                                {objective}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex justify-between items-center text-xs text-gray-300 mb-4">
                        <div className="flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          {content.effectiveness_rating}/5 rating
                        </div>
                        <div>{content.completion_rate}% completion</div>
                      </div>

                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Start Training
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
             Analytics Content
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
