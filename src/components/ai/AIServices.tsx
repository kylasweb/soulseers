import { useState, useRef } from 'react';
import { aiService, useAIStore } from '@/services/ai';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, ImageIcon, MessageSquare, Volume2, Image } from 'lucide-react';

const AIServices = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);
  const { responses, isProcessing, setProcessing } = useAIStore();

  const handleTextGeneration = async () => {
    if (!prompt.trim()) return;
    try {
      setProcessing(true);
      await aiService.generateText(prompt);
      setPrompt('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleImageToText = async () => {
    if (!imageUrl.trim()) return;
    try {
      setProcessing(true);
      await aiService.imageToText(imageUrl);
      setImageUrl('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleTextToSpeech = async (text: string) => {
    try {
      setProcessing(true);
      const audioUrl = await aiService.textToSpeech(text);
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleImageGeneration = async () => {
    if (!prompt.trim()) return;
    try {
      setProcessing(true);
      const generatedImageUrl = await aiService.generateImage(prompt);
      setImageUrl(generatedImageUrl);
      setPrompt('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold mb-6">AI Services</h1>
      
      <Tabs defaultValue="chat">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chat">
            <MessageSquare className="w-4 h-4 mr-2" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="image-to-text">
            <ImageIcon className="w-4 h-4 mr-2" />
            Image to Text
          </TabsTrigger>
          <TabsTrigger value="text-to-speech">
            <Volume2 className="w-4 h-4 mr-2" />
            Text to Speech
          </TabsTrigger>
          <TabsTrigger value="image-generation">
            <Image className="w-4 h-4 mr-2" />
            Generate Image
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chat with AI</CardTitle>
              <CardDescription>
                Ask anything and get intelligent responses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === 'Enter' && handleTextGeneration()}
                  />
                  <Button 
                    onClick={handleTextGeneration}
                    disabled={isProcessing || !prompt.trim()}
                  >
                    {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send'}
                  </Button>
                </div>
                <div className="space-y-2">
                  {responses.map((response, index) => (
                    <div key={index} className="bg-secondary/10 p-3 rounded-lg">
                      <p>{response.text}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleTextToSpeech(response.text)}
                        >
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="image-to-text">
          <Card>
            <CardHeader>
              <CardTitle>Image to Text</CardTitle>
              <CardDescription>
                Extract text from images
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Enter image URL..."
                  />
                  <Button 
                    onClick={handleImageToText}
                    disabled={isProcessing || !imageUrl.trim()}
                  >
                    {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Process'}
                  </Button>
                </div>
                {imageUrl && (
                  <img 
                    src={imageUrl} 
                    alt="Preview" 
                    className="max-w-sm rounded-lg shadow-lg"
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="text-to-speech">
          <Card>
            <CardHeader>
              <CardTitle>Text to Speech</CardTitle>
              <CardDescription>
                Convert text to natural-sounding speech
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter text to convert to speech..."
                />
                <Button 
                  onClick={() => handleTextToSpeech(prompt)}
                  disabled={isProcessing || !prompt.trim()}
                >
                  {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Convert'}
                </Button>
                <audio ref={audioRef} controls className="w-full" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="image-generation">
          <Card>
            <CardHeader>
              <CardTitle>Generate Image</CardTitle>
              <CardDescription>
                Create images from text descriptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the image you want to generate..."
                  />
                  <Button 
                    onClick={handleImageGeneration}
                    disabled={isProcessing || !prompt.trim()}
                  >
                    {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Generate'}
                  </Button>
                </div>
                {imageUrl && (
                  <img 
                    src={imageUrl} 
                    alt="Generated" 
                    className="max-w-sm rounded-lg shadow-lg"
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <audio ref={audioRef} className="hidden" />
    </div>
  );
};

export default AIServices; 