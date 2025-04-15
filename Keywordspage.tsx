import { useState } from "react";
import { MessageSquare, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface Keyword {
  id: string;
  phrase: string;
  response: string;
}

const KeywordsPage = () => {
  const [keywords, setKeywords] = useState<Keyword[]>(() => {
    const savedKeywords = localStorage.getItem('safetyKeywords');
    return savedKeywords ? JSON.parse(savedKeywords) : [
      { id: '1', phrase: 'Code Red', response: 'SOS alert triggered' },
      { id: '2', phrase: 'Call me ASAP', response: 'Notify primary contact' },
      { id: '3', phrase: 'What\'s the weather like?', response: 'Share current location' },
    ];
  });

  const [newKeyword, setNewKeyword] = useState<Omit<Keyword, 'id'>>({
    phrase: '',
    response: '',
  });

  const [open, setOpen] = useState(false);

  const handleAddKeyword = () => {
    if (newKeyword.phrase && newKeyword.response) {
      const updatedKeywords = [
        ...keywords,
        {
          id: Date.now().toString(),
          ...newKeyword,
        },
      ];
      setKeywords(updatedKeywords);
      localStorage.setItem('safetyKeywords', JSON.stringify(updatedKeywords));
      setNewKeyword({ phrase: '', response: '' });
      setOpen(false);
    }
  };

  const handleRemoveKeyword = (id: string) => {
    const updatedKeywords = keywords.filter(keyword => keyword.id !== id);
    setKeywords(updatedKeywords);
    localStorage.setItem('safetyKeywords', JSON.stringify(updatedKeywords));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewKeyword(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="pt-20 pb-24 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Safety Keywords</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="flex items-center">
              <Plus size={16} className="mr-1" />
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Safety Keyword</DialogTitle>
              <DialogDescription>
                Create a keyword phrase that will trigger a specific safety response.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="phrase">Keyword/Phrase</Label>
                <Input
                  id="phrase"
                  name="phrase"
                  value={newKeyword.phrase}
                  onChange={handleInputChange}
                  placeholder="e.g., 'Need groceries'"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="response">Response Action</Label>
                <Textarea
                  id="response"
                  name="response"
                  value={newKeyword.response}
                  onChange={handleInputChange}
                  placeholder="e.g., 'Send SOS with location'"
                  rows={3}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleAddKeyword}>Save Keyword</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Alert className="mb-6 bg-safehaven-light border-safehaven-DEFAULT">
        <MessageSquare className="h-4 w-4 text-safehaven-DEFAULT" />
        <AlertTitle>How Keywords Work</AlertTitle>
        <AlertDescription>
          When you send these keywords in a message, the app will automatically
          trigger the specified response action.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        {keywords.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-3" />
            <h3 className="font-medium text-lg">No keywords set</h3>
            <p className="mt-1">Add keyword phrases that will trigger safety responses.</p>
          </div>
        ) : (
          keywords.map((keyword) => (
            <div 
              key={keyword.id} 
              className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-safehaven-DEFAULT">
                      "{keyword.phrase}"
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      When you say or text this phrase
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0" 
                    onClick={() => handleRemoveKeyword(keyword.id)}
                  >
                    <Trash2 size={16} className="text-gray-500" />
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="p-4 bg-gray-50">
                <h4 className="text-xs font-medium text-gray-500 mb-1">RESPONSE ACTION:</h4>
                <p className="text-sm">{keyword.response}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default KeywordsPage;
