import React, { useState } from 'react';
import { Search, QrCode, Repeat, Check, Clock, UserCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Connection {
  username: string;
  status: 'connected' | 'pending';
}

interface SharedKeepr {
  id: number;
  title: string;
  category: string;
  sharedBy: string;
  timeAgo: string;
  /** Set once the user re-keeps it; attribution is permanent and not removable. */
  reKeptFrom?: string;
}

export const CommunityView = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Confirmed connections + any outgoing requests awaiting acceptance.
  const [connections, setConnections] = useState<Connection[]>([
    { username: '@sarah_kim', status: 'connected' },
    { username: '@mike_chen', status: 'connected' },
    { username: '@lena_b', status: 'pending' },
  ]);

  // Keeprs that connections have shared directly with this user.
  const [sharedWithYou, setSharedWithYou] = useState<SharedKeepr[]>([
    { id: 1, title: 'Best Coffee Shop Downtown', category: 'Food Spots', sharedBy: '@sarah_kim', timeAgo: '2h ago' },
    { id: 2, title: 'Cool Art Exhibition', category: 'Locations', sharedBy: '@mike_chen', timeAgo: '1d ago' },
  ]);

  const handleSendRequest = () => {
    const handle = searchQuery.trim();
    if (!handle) return;
    const normalized = handle.startsWith('@') ? handle : `@${handle}`;
    if (connections.some(c => c.username.toLowerCase() === normalized.toLowerCase())) {
      setSearchQuery('');
      return;
    }
    // A request must be accepted by the recipient — it is not an instant follow.
    setConnections(prev => [...prev, { username: normalized, status: 'pending' }]);
    setSearchQuery('');
  };

  const handleReKeep = (id: number) => {
    setSharedWithYou(prev =>
      prev.map(k =>
        k.id === id && !k.reKeptFrom ? { ...k, reKeptFrom: k.sharedBy } : k
      )
    );
  };

  return (
    <div className="space-y-8 pb-20">
      {/* ---------------- Connections ---------------- */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold font-josefin">Connections</h3>

        {/* Add by username - sends a request the other person must accept */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Add by username"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSendRequest(); }}
            className="pl-10 pr-20 rounded-xl border-2 font-josefin"
          />
          <Button
            size="sm"
            onClick={handleSendRequest}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 rounded-lg bg-primary hover:bg-primary/90 font-josefin text-xs"
          >
            Request
          </Button>
        </div>

        {/* Add by code / QR - exchanged in person */}
        <Button
          variant="outline"
          className="w-full justify-center gap-2 rounded-xl font-josefin"
        >
          <QrCode className="h-4 w-4" />
          Add by code or QR
        </Button>

        {/* Existing connections - no follower counts, no suggestions */}
        <div className="space-y-2">
          {connections.map((c) => (
            <Card key={c.username} className="rounded-2xl">
              <CardContent className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary font-josefin text-sm">
                      {c.username[1]?.toUpperCase()}
                    </span>
                  </div>
                  <p className="font-semibold font-josefin text-sm">{c.username}</p>
                </div>
                {c.status === 'connected' ? (
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-josefin">
                    <UserCheck className="h-3.5 w-3.5" /> Connected
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-josefin">
                    <Clock className="h-3.5 w-3.5" /> Pending
                  </span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ---------------- Shared with you ---------------- */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold font-josefin">Shared with you</h3>
        <div className="space-y-3">
          {sharedWithYou.map((item) => (
            <Card key={item.id} className="rounded-2xl">
              <CardContent className="p-4">
                <h4 className="font-semibold font-josefin line-clamp-1">{item.title}</h4>
                <p className="text-sm text-primary font-josefin">
                  Shared by {item.sharedBy} • {item.timeAgo}
                </p>
                <span className="inline-block mt-1 text-xs text-muted-foreground font-josefin">
                  {item.category}
                </span>

                {/* Permanent attribution once re-kept (G8.3) */}
                {item.reKeptFrom && (
                  <p className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground font-josefin">
                    <Repeat className="h-3 w-3" /> Re-Kept from {item.reKeptFrom}
                  </p>
                )}

                <div className="mt-3 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-josefin rounded-xl"
                    onClick={() => handleReKeep(item.id)}
                    disabled={!!item.reKeptFrom}
                  >
                    {item.reKeptFrom ? (
                      <><Check className="h-3 w-3 mr-1" /> Saved</>
                    ) : (
                      <><Repeat className="h-3 w-3 mr-1" /> Re-Keep</>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {sharedWithYou.length === 0 && (
            <p className="text-sm text-muted-foreground font-josefin text-center py-6">
              Nothing shared with you yet. Keeprs your connections share will appear here.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};
