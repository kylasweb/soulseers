
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MicIcon, MicOffIcon, VideoIcon, VideoOffIcon, PhoneOffIcon, MessageSquare } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';

const ConsultationSession = () => {
  const [sessionTime, setSessionTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [cost, setCost] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  // Rate per minute (in dollars)
  const rate = 2.99;
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSessionTime(prevTime => {
          const newTime = prevTime + 1;
          setCost(parseFloat(((newTime / 60) * rate).toFixed(2)));
          return newTime;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, rate]);
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const endSession = () => {
    setIsRunning(false);
    
    // In a real app, this would send the final billing information to a server
    setTimeout(() => {
      navigate('/consultations/completed', { 
        state: { 
          duration: sessionTime,
          cost: cost 
        } 
      });
    }, 1000);
  };
  
  const toggleAudio = () => setAudioEnabled(!audioEnabled);
  const toggleVideo = () => setVideoEnabled(!videoEnabled);
  
  const sendMessage = () => {
    if (!message.trim()) return;
    // In a real app, this would send the message to the expert
    console.log('Message sent:', message);
    setMessage('');
  };
  
  return (
    <div className="min-h-screen bg-black p-4">
      <div className="mx-auto max-w-7xl h-full flex flex-col">
        <div className="flex justify-between items-center p-4 bg-black/50 rounded-t-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-primary text-white px-3 py-1 rounded-full text-sm">
              Live Session
            </div>
            <div className="text-white">
              <span>Time: {formatTime(sessionTime)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-white font-medium">
              <span>Cost: ${cost.toFixed(2)}</span>
            </div>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={endSession}
            >
              End Session
            </Button>
          </div>
        </div>
        
        <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-4 py-4">
          <div className="col-span-1 md:col-span-3 flex flex-col">
            <div className="flex-grow bg-gray-900 rounded-lg relative overflow-hidden">
              {/* This would be replaced with actual video stream components in production */}
              <div className="absolute inset-0 flex items-center justify-center">
                {videoEnabled ? (
                  <div className="w-full h-full bg-gradient-to-r from-purple-900 to-blue-900 flex items-center justify-center">
                    <div className="text-white text-xl">Expert Video Stream</div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <div className="text-white text-xl">Video Disabled</div>
                  </div>
                )}
              </div>
              
              {/* Self view */}
              {videoEnabled && (
                <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-r from-blue-900 to-purple-900 flex items-center justify-center">
                    <div className="text-white text-sm">Your Camera</div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-4 flex justify-center space-x-4">
              <Button 
                variant={audioEnabled ? "outline" : "destructive"} 
                size="icon" 
                onClick={toggleAudio}
              >
                {audioEnabled ? <MicIcon /> : <MicOffIcon />}
              </Button>
              <Button 
                variant={videoEnabled ? "outline" : "destructive"} 
                size="icon" 
                onClick={toggleVideo}
              >
                {videoEnabled ? <VideoIcon /> : <VideoOffIcon />}
              </Button>
              <Button 
                variant="destructive" 
                size="icon" 
                onClick={endSession}
              >
                <PhoneOffIcon />
              </Button>
            </div>
          </div>
          
          <div className="col-span-1 flex flex-col">
            <Card className="flex-grow flex flex-col">
              <CardContent className="p-4 flex-grow flex flex-col">
                <div className="mb-4">
                  <h3 className="font-medium">Chat with Expert</h3>
                </div>
                
                <div className="flex-grow bg-muted rounded-lg p-4 mb-4 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Expert</p>
                      <p className="text-sm">Hello, how can I help you today?</p>
                    </div>
                    {/* Additional messages would appear here */}
                  </div>
                </div>
                
                <div className="flex">
                  <Textarea 
                    placeholder="Type your message..." 
                    className="min-h-[80px] resize-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                  <Button 
                    className="ml-2 self-end"
                    onClick={sendMessage}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationSession;
