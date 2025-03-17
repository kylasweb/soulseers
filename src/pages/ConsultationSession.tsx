
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MicIcon, MicOffIcon, VideoIcon, VideoOffIcon, PhoneOffIcon, MessageSquare } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import PaymentTracker from '@/components/payments/PaymentTracker';
import { 
  authorizePayment, 
  completePayment, 
  PaymentStatus, 
  PaymentProvider 
} from '@/utils/paymentUtils';

// Define a more specific type for message senders
type MessageSender = 'user' | 'expert';

// Define the message type
interface ChatMessage {
  sender: MessageSender;
  text: string;
}

const ConsultationSession = () => {
  const [sessionTime, setSessionTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPreparing, setIsPreparing] = useState(true);
  const [cost, setCost] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'expert', text: 'Hello, how can I help you today?' }
  ]);
  const [communicationType, setCommunicationType] = useState<"audio" | "video" | "chat">("video");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('authorized');
  const [paymentAuthId, setPaymentAuthId] = useState<string | undefined>(undefined);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // WebRTC related refs
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const chatPanelRef = useRef<HTMLDivElement>(null);

  // Rate per minute (in dollars)
  const rate = location.state?.rate || 2.99;
  
  // Initialize payment and setup
  useEffect(() => {
    // Get communication type from location state if available
    if (location.state?.communicationType) {
      setCommunicationType(location.state.communicationType);
    }
    
    const initializeSession = async () => {
      setIsPreparing(true);
      
      try {
        // First authorize the initial payment
        const initialAuth = await authorizePayment('stripe', 5.00, 'user123');
        
        if (initialAuth.success && initialAuth.authorizationId) {
          setPaymentAuthId(initialAuth.authorizationId);
          setPaymentStatus('authorized');
          
          // Then set up WebRTC
          await setupWebRTC();
          
          // Start the session
          setIsRunning(true);
          setIsPreparing(false);
          
          toast({
            title: "Session Started",
            description: "Your consultation has begun. You'll only be charged for the time you use.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Payment Authorization Failed",
            description: initialAuth.error || "Unable to authorize payment. Please try again.",
          });
          
          setTimeout(() => {
            navigate('/services');
          }, 3000);
        }
      } catch (error) {
        console.error('Error starting session:', error);
        
        toast({
          variant: "destructive",
          title: "Session Error",
          description: "Unable to start the consultation session. Please try again.",
        });
        
        setTimeout(() => {
          navigate('/services');
        }, 3000);
      }
    };
    
    initializeSession();
    
    return () => {
      endSession(true);
    };
  }, [location.state]);
  
  // Timer for session duration and cost calculation
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
    
    return () => {
      clearInterval(interval);
    };
  }, [isRunning, rate]);

  // Set up WebRTC
  const setupWebRTC = async () => {
    try {
      // Create peer connection
      const configuration = { 
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' }
        ] 
      };
      
      const pc = new RTCPeerConnection(configuration);
      peerConnectionRef.current = pc;
      
      // Set up local stream if audio or video is required
      if (communicationType === 'audio' || communicationType === 'video') {
        const constraints = {
          audio: true,
          video: communicationType === 'video'
        };
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        localStreamRef.current = stream;
        
        if (localVideoRef.current && communicationType === 'video') {
          localVideoRef.current.srcObject = stream;
        }
        
        // Add tracks to peer connection
        stream.getTracks().forEach(track => {
          if (pc && localStreamRef.current) {
            pc.addTrack(track, localStreamRef.current);
          }
        });
      }
      
      // Handle remote stream
      pc.ontrack = (event) => {
        if (remoteVideoRef.current && event.streams[0]) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };
      
      // Set up data channel for chat
      const dataChannel = pc.createDataChannel('chat');
      dataChannel.onmessage = (event) => {
        const newMessage: ChatMessage = { sender: 'expert', text: event.data };
        setMessages(prev => [...prev, newMessage]);
      };
      
      // Handle ICE candidates
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          // In a real app, you would send this to the server
          console.log('New ICE candidate:', event.candidate);
        }
      };
      
      // In a real implementation, you would:
      // 1. Create an offer
      // 2. Set local description
      // 3. Send the offer to the server
      // 4. Receive answer from remote peer via server
      // 5. Set remote description
      
      // For this demo, we'll simulate a connection with a mock expert
      simulateConnection(pc);
      
    } catch (error) {
      console.error('Error setting up WebRTC:', error);
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Failed to set up media devices. Please check your camera and microphone permissions."
      });
    }
  };
  
  // Simulate connection with expert (in a real app, this would involve a server)
  const simulateConnection = (pc: RTCPeerConnection) => {
    // This is a simplified simulation - in a real app, signaling would happen via a server
    setTimeout(async () => {
      try {
        const offer = await pc.createOffer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: communicationType === 'video'
        });
        
        await pc.setLocalDescription(offer);
        
        // Simulate receiving an answer from the expert
        setTimeout(async () => {
          // This would normally come from the server
          const mockAnswer = {
            type: 'answer',
            sdp: offer.sdp
          } as RTCSessionDescriptionInit;
          
          await pc.setRemoteDescription(mockAnswer);
          
          toast({
            title: "Connected",
            description: "You are now connected with the expert."
          });
        }, 1000);
        
      } catch (error) {
        console.error('Error creating offer:', error);
      }
    }, 1000);
  };
  
  // Handle payment errors
  const handlePaymentError = () => {
    toast({
      variant: "destructive",
      title: "Payment Failed",
      description: "There was an issue processing your payment. The session will end in 1 minute if not resolved.",
    });
    
    // In a real app, you would attempt to reauthorize payment here
    // For now, we'll just end the session after a delay
    setTimeout(() => {
      if (paymentStatus === 'failed') {
        endSession();
      }
    }, 60000);
  };
  
  // Cleanup WebRTC resources
  const cleanupWebRTC = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }
    
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
  };
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const endSession = async (skipNavigation = false) => {
    setIsRunning(false);
    cleanupWebRTC();
    
    // Process final payment
    if (paymentAuthId && sessionTime > 0) {
      setPaymentStatus('charging');
      
      try {
        const finalPayment = await completePayment(paymentAuthId, cost);
        
        if (finalPayment.success) {
          setPaymentStatus('completed');
          
          toast({
            title: "Payment Completed",
            description: `Your payment of $${cost.toFixed(2)} has been processed successfully.`,
          });
        } else {
          setPaymentStatus('failed');
          
          toast({
            variant: "destructive",
            title: "Payment Failed",
            description: finalPayment.error || "There was an error processing your final payment.",
          });
        }
      } catch (error) {
        setPaymentStatus('failed');
        
        toast({
          variant: "destructive",
          title: "Payment Error",
          description: "Failed to process your final payment.",
        });
      }
    }
    
    // Navigate to completion page
    if (!skipNavigation) {
      setTimeout(() => {
        navigate('/consultations/completed', { 
          state: { 
            duration: sessionTime,
            cost: cost,
            paymentStatus: paymentStatus
          } 
        });
      }, 1000);
    }
  };
  
  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTracks = localStreamRef.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !audioEnabled;
      });
    }
    setAudioEnabled(!audioEnabled);
  };
  
  const toggleVideo = () => {
    if (localStreamRef.current && communicationType === 'video') {
      const videoTracks = localStreamRef.current.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !videoEnabled;
      });
    }
    setVideoEnabled(!videoEnabled);
  };
  
  const sendMessage = () => {
    if (!message.trim()) return;
    
    // Add message to local state with correct typing
    const newMessage: ChatMessage = { sender: 'user', text: message };
    setMessages(prev => [...prev, newMessage]);
    
    // In a real app, this would send the message to the expert via WebRTC data channel
    console.log('Message sent:', message);
    
    // Simulate expert response
    setTimeout(() => {
      const responses = [
        "I understand, tell me more about that.",
        "That's interesting. How does that make you feel?",
        "I sense there's more to this situation.",
        "Let me consult the cards about this matter.",
        "The energy I'm feeling suggests that you should proceed with caution.",
        "Have you considered looking at this from a different perspective?"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      // Use proper typing for the expert message
      const expertMessage: ChatMessage = { 
        sender: 'expert', 
        text: randomResponse 
      };
      
      setMessages(prev => [...prev, expertMessage]);
      
      // Scroll to the bottom of the chat
      if (chatPanelRef.current) {
        chatPanelRef.current.scrollTop = chatPanelRef.current.scrollHeight;
      }
    }, 1000 + Math.random() * 2000);
    
    setMessage('');
    
    // Scroll to the bottom of the chat
    if (chatPanelRef.current) {
      chatPanelRef.current.scrollTop = chatPanelRef.current.scrollHeight;
    }
  };

  // Scroll chat to bottom when messages change
  useEffect(() => {
    if (chatPanelRef.current) {
      chatPanelRef.current.scrollTop = chatPanelRef.current.scrollHeight;
    }
  }, [messages]);
  
  // Show loading state while preparing
  if (isPreparing) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <h3 className="text-white text-xl font-semibold mb-2">Preparing Your Session</h3>
          <p className="text-gray-400">Setting up your consultation and processing initial payment...</p>
        </div>
      </div>
    );
  }
  
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
            <Badge variant="outline" className="text-white border-white bg-transparent">
              {communicationType.charAt(0).toUpperCase() + communicationType.slice(1)} Consultation
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-white font-medium">
              <span>Cost: ${cost.toFixed(2)}</span>
            </div>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => endSession()}
            >
              End Session
            </Button>
          </div>
        </div>
        
        <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-4 py-4">
          <div className={`col-span-1 ${communicationType !== 'chat' ? 'md:col-span-3' : 'hidden md:block'} flex flex-col`}>
            <div className="flex-grow bg-gray-900 rounded-lg relative overflow-hidden">
              {communicationType === 'video' ? (
                <>
                  {/* Video stream */}
                  <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    muted={false}
                  />
                  
                  {/* Self view */}
                  {videoEnabled && (
                    <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                      <video
                        ref={localVideoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </>
              ) : communicationType === 'audio' ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-r from-indigo-900 to-purple-900 flex flex-col items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-black/30 flex items-center justify-center mb-4">
                      <MicIcon className="h-16 w-16 text-white" />
                    </div>
                    <div className="text-white text-xl">Audio Consultation</div>
                    <div className="text-white/60 mt-2">
                      {audioEnabled ? "You are unmuted" : "You are muted"}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-r from-blue-900 to-violet-900 flex items-center justify-center">
                    <div className="text-white text-xl">Chat Consultation</div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-4 flex justify-center space-x-4">
              {communicationType !== 'chat' && (
                <Button 
                  variant={audioEnabled ? "outline" : "destructive"} 
                  size="icon" 
                  onClick={toggleAudio}
                >
                  {audioEnabled ? <MicIcon /> : <MicOffIcon />}
                </Button>
              )}
              
              {communicationType === 'video' && (
                <Button 
                  variant={videoEnabled ? "outline" : "destructive"} 
                  size="icon" 
                  onClick={toggleVideo}
                >
                  {videoEnabled ? <VideoIcon /> : <VideoOffIcon />}
                </Button>
              )}
              
              <Button 
                variant="destructive" 
                size="icon" 
                onClick={() => endSession()}
              >
                <PhoneOffIcon />
              </Button>
            </div>
          </div>
          
          <div className={`col-span-1 ${communicationType === 'chat' ? 'md:col-span-4' : 'md:col-span-1'} flex flex-col space-y-4`}>
            {/* Payment Tracker */}
            <PaymentTracker
              isRunning={isRunning}
              elapsedTime={sessionTime}
              rate={rate}
              authorizationId={paymentAuthId}
              onPaymentError={handlePaymentError}
            />
            
            {/* Chat */}
            <Card className="flex-grow flex flex-col">
              <CardContent className="p-4 flex-grow flex flex-col">
                <div className="mb-4">
                  <h3 className="font-medium">Chat with Expert</h3>
                </div>
                
                <div 
                  className="flex-grow bg-muted rounded-lg p-4 mb-4 overflow-y-auto"
                  ref={chatPanelRef}
                >
                  <div className="space-y-4">
                    {messages.map((msg, index) => (
                      <div 
                        key={index} 
                        className={`p-3 rounded-lg ${
                          msg.sender === 'expert' 
                            ? 'bg-primary/10 mr-12' 
                            : 'bg-secondary/10 ml-12 text-right'
                        }`}
                      >
                        <p className="text-xs text-muted-foreground mb-1">
                          {msg.sender === 'expert' ? 'Expert' : 'You'}
                        </p>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    ))}
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
