import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MessageCircle, Send, X } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'agent' | 'user';
  text: string;
  time: Date;
}

const initialMessages: ChatMessage[] = [
  {
    id: 'c1',
    sender: 'agent',
    text: 'Hi! Need help placing a sports bet or checking live odds? I’m here to help.',
    time: new Date(),
  },
];

export function LiveChatWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState('');
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const handleSend = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;

    const nextMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      time: new Date(),
    };

    setMessages((current) => [...current, nextMessage]);
    setDraft('');

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: `agent-${Date.now()}`,
          sender: 'agent',
          text: 'Thanks for your message — one of our live support agents will respond shortly. In the meantime, feel free to browse the sports lobby.',
          time: new Date(),
        },
      ]);
    }, 700);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="Open live chat"
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_30px_rgba(41,153,255,0.35)] transition-transform duration-300 hover:-translate-y-1"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </DialogTrigger>

      <DialogContent className="fixed bottom-6 right-6 z-50 w-[min(100vw-2rem,420px)] rounded-[32px] border border-border/50 bg-background p-0 shadow-2xl">
        <div className="flex items-center justify-between border-b border-border/50 px-5 py-4">
          <div>
            <DialogTitle className="text-lg font-semibold text-foreground">Live Chat</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Ask about sports odds, wager limits, or account help.
            </DialogDescription>
          </div>
          <DialogClose asChild>
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted/20 hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
          </DialogClose>
        </div>

        <div className="flex h-[calc(55vh-140px)] flex-col gap-3 overflow-y-auto px-5 py-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`rounded-3xl px-4 py-3 shadow-sm ${
                message.sender === 'user'
                  ? 'self-end bg-primary text-primary-foreground'
                  : 'self-start bg-slate-900 text-slate-100'
              } max-w-[90%]`}
            >
              <p className="text-sm leading-6">{message.text}</p>
              <span className="mt-2 block text-[11px] text-muted-foreground">
                {message.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-border/50 px-5 py-4">
          <div className="flex gap-3">
            <Input
              ref={inputRef}
              placeholder="Type your message..."
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  handleSend();
                }
              }}
            />
            <Button variant="accent" size="icon" onClick={handleSend}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
