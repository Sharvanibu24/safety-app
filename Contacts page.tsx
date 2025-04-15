import { useState } from "react";
import { User, UserPlus, Phone, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface Contact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

const ContactsPage = () => {
  const [contacts, setContacts] = useState<Contact[]>(() => {
    const savedContacts = localStorage.getItem('emergencyContacts');
    return savedContacts ? JSON.parse(savedContacts) : [
      { id: '1', name: 'Mom', phone: '+1 555-123-4567', relation: 'Family' },
      { id: '2', name: 'Dad', phone: '+1 555-765-4321', relation: 'Family' },
      { id: '3', name: 'Best Friend', phone: '+1 555-987-6543', relation: 'Friend' },
    ];
  });

  const [newContact, setNewContact] = useState<Omit<Contact, 'id'>>({
    name: '',
    phone: '',
    relation: '',
  });

  const [open, setOpen] = useState(false);

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      const updatedContacts = [
        ...contacts,
        {
          id: Date.now().toString(),
          ...newContact,
        },
      ];
      setContacts(updatedContacts);
      localStorage.setItem('emergencyContacts', JSON.stringify(updatedContacts));
      setNewContact({ name: '', phone: '', relation: '' });
      setOpen(false);
    }
  };

  const handleRemoveContact = (id: string) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
    localStorage.setItem('emergencyContacts', JSON.stringify(updatedContacts));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewContact(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="pt-20 pb-24 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Emergency Contacts</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="flex items-center">
              <UserPlus size={16} className="mr-1" />
              Add
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Emergency Contact</DialogTitle>
              <DialogDescription>
                Add someone you trust who can be contacted in case of emergency.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={newContact.name}
                  onChange={handleInputChange}
                  placeholder="Contact name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={newContact.phone}
                  onChange={handleInputChange}
                  placeholder="+1 234-567-8900"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="relation">Relationship</Label>
                <Input
                  id="relation"
                  name="relation"
                  value={newContact.relation}
                  onChange={handleInputChange}
                  placeholder="Family, Friend, etc."
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleAddContact}>Save Contact</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {contacts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <User className="mx-auto h-12 w-12 text-gray-400 mb-3" />
            <h3 className="font-medium text-lg">No contacts added</h3>
            <p className="mt-1">Add emergency contacts that will be notified in case of emergency.</p>
          </div>
        ) : (
          contacts.map((contact) => (
            <Card key={contact.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle>{contact.name}</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0" 
                    onClick={() => handleRemoveContact(contact.id)}
                  >
                    <Trash2 size={16} className="text-gray-500" />
                  </Button>
                </div>
                <CardDescription>{contact.relation}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-gray-700">
                  <Phone size={16} className="mr-2" />
                  {contact.phone}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  <Phone size={16} className="mr-2" />
                  Call
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactsPage;
