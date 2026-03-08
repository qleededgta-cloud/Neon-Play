import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  Search, 
  X, 
  Maximize2, 
  Minimize2, 
  ExternalLink, 
  TrendingUp, 
  Clock, 
  Heart,
  ChevronLeft
} from 'lucide-react';
import gamesData from './games.json';

export default function App() {
  const [games, setGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setGames(gamesData);
  }, []);

  const filteredGames = games.filter(game => 
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setSelectedGame(null)}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Gamepad2 className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent tracking-tight">
              NEON PLAY
            </h1>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search games..."
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {!selectedGame ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-12"
            >
              {/* Hero Section */}
              <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 p-8 md:p-12 border border-white/5">
                <div className="relative z-10 max-w-2xl">
                  <span className="inline-block px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-bold uppercase tracking-wider mb-4">
                    Featured Game
                  </span>
                  <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 leading-tight">
                    Experience the Ultimate <span className="text-fuchsia-400">Unblocked</span> Library
                  </h2>
                  <p className="text-zinc-400 text-lg mb-8">
                    High-speed, unblocked games for whenever you need a quick break. No downloads, no installs, just pure fun.
                  </p>
                  <button 
                    onClick={() => setSelectedGame(games[0])}
                    className="bg-white text-zinc-950 px-8 py-3 rounded-full font-bold hover:bg-violet-400 hover:text-white transition-all flex items-center gap-2 shadow-xl"
                  >
                    Play Now <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block opacity-50">
                  <img 
                    src="https://picsum.photos/seed/gaming/800/600" 
                    alt="Gaming" 
                    className="w-full h-full object-cover rounded-l-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </section>

              {/* Categories/Filters */}
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {['All Games', 'Trending', 'Classic', 'Puzzle', 'Action'].map((cat) => (
                  <button 
                    key={cat}
                    className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      cat === 'All Games' 
                        ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/20' 
                        : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Games Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.map((game, index) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -8 }}
                    onClick={() => setSelectedGame(game)}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 border border-white/5">
                      <img 
                        src={game.thumbnail} 
                        alt={game.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="text-white font-bold flex items-center gap-2">
                          Play Now <ChevronLeft className="w-4 h-4 rotate-180" />
                        </span>
                      </div>
                      <div className={`absolute top-3 right-3 w-8 h-8 ${game.color} rounded-lg flex items-center justify-center shadow-lg`}>
                        <Gamepad2 className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold group-hover:text-violet-400 transition-colors">{game.title}</h3>
                    <p className="text-zinc-500 text-sm line-clamp-1">{game.description}</p>
                  </motion.div>
                ))}
              </div>

              {filteredGames.length === 0 && (
                <div className="text-center py-20">
                  <Search className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                  <p className="text-zinc-500">No games found matching your search.</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="player"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className={`flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 bg-zinc-950' : 'h-[80vh]'}`}
            >
              {/* Player Header */}
              <div className="flex items-center justify-between p-4 glass rounded-t-2xl border-b-0">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setSelectedGame(null)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <div>
                    <h2 className="font-bold text-lg">{selectedGame.title}</h2>
                    <p className="text-xs text-zinc-500 hidden sm:block">Playing on Neon Play</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={toggleFullscreen}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  >
                    {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                  </button>
                  <button 
                    onClick={() => setSelectedGame(null)}
                    className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Iframe Container */}
              <div className="flex-1 bg-black relative">
                <iframe
                  src={selectedGame.url}
                  className="w-full h-full border-0"
                  allow="fullscreen; autoplay; encrypted-media"
                  title={selectedGame.title}
                />
              </div>

              {/* Player Footer */}
              {!isFullscreen && (
                <div className="p-4 glass rounded-b-2xl border-t-0 flex items-center justify-between">
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2 text-zinc-400 hover:text-white cursor-pointer transition-colors">
                      <Heart className="w-4 h-4" />
                      <span className="text-xs font-medium">Favorite</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 hover:text-white cursor-pointer transition-colors">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs font-medium">Trending</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-500 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>Last played: Just now</span>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
                <Gamepad2 className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-display font-bold tracking-tight">NEON PLAY</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">
              The ultimate destination for unblocked web games. Fast, secure, and always free.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li className="hover:text-violet-400 cursor-pointer transition-colors">All Games</li>
              <li className="hover:text-violet-400 cursor-pointer transition-colors">New Releases</li>
              <li className="hover:text-violet-400 cursor-pointer transition-colors">Popular</li>
              <li className="hover:text-violet-400 cursor-pointer transition-colors">Support</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">About</h4>
            <p className="text-zinc-500 text-sm mb-4">
              Neon Play is a community-driven project dedicated to providing high-quality web entertainment.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-violet-500/20 hover:text-violet-400 transition-all cursor-pointer">
                <Heart className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-violet-500/20 hover:text-violet-400 transition-all cursor-pointer">
                <ExternalLink className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
          <p>© 2024 Neon Play. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-zinc-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-zinc-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-zinc-400 cursor-pointer">Cookie Settings</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
