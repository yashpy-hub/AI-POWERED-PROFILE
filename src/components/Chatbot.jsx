import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { askResumeBot } from '../ai';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bot, Expand, Minimize } from 'lucide-react';
import chatbotThumbnail from '../assets/chatbot_thumbnail.jpg';
import ReactMarkdown from 'react-markdown';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const scrollAreaRef = useRef(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const botResponse = await askResumeBot(input);
      const botMessage = { text: botResponse, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error communicating with the bot:", error);
      const errorMessage = { text: `Sorry, I am having trouble connecting. Please check the browser console for more details. Error: ${error.message}`, sender: 'bot' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current;
      const viewport = scrollArea.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const chatbotSizeClasses = isMaximized
    ? "w-[calc(100vw-2rem)] max-w-4xl h-[calc(100vh-2rem)] max-h-4xl"
    : "w-[calc(100vw-2rem)] max-w-sm h-[60vh] sm:h-[70vh] max-h-[40rem] sm:w-80";

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen &&
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className={`${chatbotSizeClasses} flex flex-col shadow-lg`}
          >
            <Card className="w-full h-full flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between p-4">
                <div className="flex items-center space-x-2">
                  <Bot className="h-6 w-6" />
                  <CardTitle className="text-lg">YAVI Bot</CardTitle>
                </div>
                <div className="flex items-center">
                  <Button variant="ghost" size="icon" onClick={() => setIsMaximized(!isMaximized)}>
                    {isMaximized ? <Minimize className="h-4 w-4" /> : <Expand className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col p-0">
                <ScrollArea className="flex-grow p-4 border-t" ref={scrollAreaRef}>
                  <div className="space-y-4">
                    {messages.map((msg, index) => (
                      <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`px-3 py-2 rounded-lg max-w-[80%] text-sm sm:text-base prose prose-sm ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                          <ReactMarkdown>{msg.text}</ReactMarkdown>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="px-3 py-2 rounded-lg bg-gray-200 text-gray-800 flex items-center">
                          <span className="animate-pulse">Thinking...</span>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                <form onSubmit={handleSendMessage} className="flex items-center p-4 border-t">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about my resume..."
                    className="flex-grow mr-2 resize-none"
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    rows="1"
                  />
                  <Button type="submit" disabled={isLoading}>
                    Send
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        }
      </AnimatePresence>

      {!isOpen &&
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <Button onClick={() => setIsOpen(true)} className="w-16 h-16 rounded-full p-0 overflow-hidden shadow-lg">
            <img src={chatbotThumbnail} alt="Chatbot Thumbnail" className="w-full h-full object-cover" />
          </Button>
        </motion.div>
      }
    </div>
  );
};

export default Chatbot;