"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PixelButton from "@/components/PixelButton";
import usersData from "@/data/users.json";
import PixelAvatar from "@/components/PixelAvatar";

export default function Following() {
  const [user, setUser] = useState(null);

  // Initial Posts State
  const [posts, setPosts] = useState([
    {
      id: "post-1",
      author_id: "USR-002", // Alex
      content: "EcoSphere carbon-calculator engine is fully optimized. 1000 nodes computed in under 3ms. Still looking for a Hustler class teammate to help compile the invention pitch slides! Check out my quest board. #INVENTION2026 #FullStack",
      likes: 12,
      isLiked: false,
      timestamp: "2 hours ago",
      comments: [
        { author: "Joice", text: "That computation speed is insane! Super clean work." }
      ]
    },
    {
      id: "post-2",
      author_id: "USR-001", // Joice
      content: "Just finalized the Figma style guide for ScholarSave. Complete with custom retro pixelated typography variables and 8-bit navigation icons. Check out the archive in my Showcase portfolio! #Figma #Design",
      likes: 24,
      isLiked: false,
      timestamp: "5 hours ago",
      comments: []
    },
    {
      id: "post-3",
      author_id: "USR-003", // Sarah
      content: "Drafted the Business Model Canvas slides for the EduQuest flashcard project. Database schemas are looking good. Let's secure that A+ grade! 🚀 #ProductManagement",
      likes: 9,
      isLiked: false,
      timestamp: "1 day ago",
      comments: [
        { author: "Kevin", text: "Nice! I can help review the schemas if needed." }
      ]
    },
    {
      id: "post-4",
      author_id: "USR-004", // Kevin
      content: "Integrated real-time Bluetooth telemetry in MediLink. Testing mobile native responsiveness across Android & iOS devices. Ready for GEMASTIK 2026! 📱 #MobileDev",
      likes: 18,
      isLiked: false,
      timestamp: "1 day ago",
      comments: []
    }
  ]);

  // State Posting Baru
  const [newPostContent, setNewPostContent] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState("");

  // Load User & Local Storage Sync
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error(e);
        }
      }

      const localPosts = localStorage.getItem("timelinePosts");
      if (localPosts) {
        try {
          setPosts(JSON.parse(localPosts));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const savePosts = (updatedPosts) => {
    setPosts(updatedPosts);
    if (typeof window !== "undefined") {
      localStorage.setItem("timelinePosts", JSON.stringify(updatedPosts));
    }
  };

  const handleLike = (postId) => {
    const updated = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked,
        };
      }
      return post;
    });
    savePosts(updated);
  };

  const handleSendReply = (postId) => {
    if (!replyText.trim()) return;
    const updated = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, { author: user ? user.name : "You", text: replyText.trim() }],
        };
      }
      return post;
    });
    savePosts(updated);
    setReplyText("");
    setActiveReplyId(null);
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost = {
      id: `post-${Date.now()}`,
      author_id: user ? user.user_id : "USR-001",
      content: newPostContent.trim(),
      likes: 0,
      isLiked: false,
      timestamp: "Just now",
      comments: []
    };

    const updated = [newPost, ...posts];
    savePosts(updated);
    setNewPostContent("");
  };

  return (
    <div className="bg-[#0c1322] min-h-screen text-white flex flex-col font-sans overflow-x-hidden selection:bg-yellow-400 selection:text-black">
      <Header />

      <section
        className="relative w-full min-h-[450px] md:min-h-[550px] bg-cover bg-center bg-no-repeat overflow-hidden border-b-4 border-retro-black flex items-center justify-center pt-28 md:pt-32"
        style={{ backgroundImage: "url('/bg5.gif')" }}
      >
        {/* Layer Overlay Dark Vignette untuk transisi sangat halus */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1322]/80 via-black/50 to-[#0c1322] pointer-events-none z-0" />

        {/* Konten Hero Banner di Tengah — Dibuat Lebih Panjang & Gagah */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 md:py-20 text-center flex flex-col items-center justify-center gap-4">
          <span className="font-pixel text-[9px] md:text-[11px] text-yellow-300 tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            ✦ REAL-TIME COMMUNITY FEEDS ✦
          </span>

          <h1 className="font-pixel text-3xl md:text-5xl text-yellow-300 drop-shadow-[0_6px_0px_rgba(0,0,0,1)] leading-tight tracking-wide">
            [ GUILD ACTIVITY TIMELINE ]
          </h1>

          <p className="font-sans text-sm md:text-base text-gray-100 leading-relaxed max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            Keep track of latest updates, status feeds, tech achievements, and party recruitment broadcasts from active guild members.
          </p>
        </div>
      </section>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-6 pt-8 pb-16 flex flex-col gap-8">

        {/* 1. Form Posting Status Baru (Broadcast Status Feed) */}
        <form
          onSubmit={handleCreatePost}
          className="bg-[#131f37] border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 flex flex-col gap-3 text-left"
        >
          <div className="flex justify-between items-center border-b border-gray-700/60 pb-2">
            <span className="font-pixel text-[9px] text-yellow-400">// DISPATCH GUILD STATUS UPDATE</span>
            <span className="font-pixel text-[7px] bg-pixel-green text-retro-black px-1.5 py-0.5 font-bold">LIVE FEED</span>
          </div>

          <textarea
            rows={3}
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder={user ? `Share a status update or progress, ${user.name}...` : "Log in to post a status update..."}
            disabled={!user}
            className="font-sans text-xs p-3 bg-[#1c2a4a] text-white border-2 border-retro-black focus:outline-none resize-none placeholder-gray-400"
          />

          <div className="flex justify-between items-center pt-1">
            <span className="font-pixel text-[7px] text-gray-400">
              {user ? `Posting as ${user.name} (${user.role})` : "Log in required to post"}
            </span>
            <PixelButton
              variant="green"
              type="submit"
              disabled={!user || !newPostContent.trim()}
              className="py-2 px-5 text-[9px] border-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              DISPATCH POST ✦
            </PixelButton>
          </div>
        </form>

        {/* 2. Grid 2 Kolom Kartu Postingan Rapi & Modern */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => {
            const author = usersData.find((u) => u.user_id === post.author_id) || {
              name: post.author_id === user?.user_id ? user.name : "Unknown Adventurer",
              role: post.author_id === user?.user_id ? user.role : "Full-stack Developer",
              major: "Informatics",
            };

            return (
              <div
                key={post.id}
                className="bg-[#121b2d] border-4 border-retro-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:border-yellow-400 p-6 flex flex-col justify-between gap-4 transition-all duration-200 text-left"
              >
                <div className="flex flex-col gap-3">
                  {/* Header Author Info */}
                  <div className="flex justify-between items-start border-b border-gray-700/60 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-retro-black border-2 border-yellow-400 rounded-full flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                        <PixelAvatar role={author.role} size="w-full h-full" />
                      </div>
                      <div>
                        <p className="font-pixel text-[10px] text-white leading-tight font-bold">
                          {author.name}
                        </p>
                        <p className="font-sans text-[10px] text-gray-400 leading-tight mt-0.5">
                          {author.role} • {author.major || "IT"}
                        </p>
                      </div>
                    </div>
                    <span className="font-pixel text-[8px] text-yellow-400/80">{post.timestamp}</span>
                  </div>

                  {/* Body Content */}
                  <p className="font-sans text-xs text-gray-200 leading-relaxed whitespace-pre-line">
                    {post.content}
                  </p>
                </div>

                {/* Bottom Actions & Replies */}
                <div className="flex flex-col gap-3 pt-2">
                  {/* Action Toolbar */}
                  <div className="border-t border-b border-gray-700/60 py-2 flex items-center gap-4">
                    {/* Like Button */}
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`font-pixel text-[8px] px-2.5 py-1 border-2 select-none cursor-pointer transition-all ${post.isLiked
                          ? "bg-pixel-green text-retro-black border-retro-black font-bold"
                          : "bg-[#1c2a4a] text-white border-retro-black hover:border-yellow-400"
                        }`}
                    >
                      {post.isLiked ? "♥ LIKED!" : "♡ LIKE"} ({post.likes})
                    </button>

                    {/* Comment Toggle Button */}
                    <button
                      onClick={() => {
                        setActiveReplyId(activeReplyId === post.id ? null : post.id);
                        setReplyText("");
                      }}
                      className="font-pixel text-[8px] px-2.5 py-1 border-2 border-retro-black bg-[#1c2a4a] text-white hover:border-yellow-400 select-none cursor-pointer transition-all"
                    >
                      💬 REPLY ({post.comments.length})
                    </button>
                  </div>

                  {/* Comment Logs */}
                  {post.comments.length > 0 && (
                    <div className="bg-[#1a253b] p-3 border-2 border-retro-black flex flex-col gap-2">
                      {post.comments.map((comment, index) => (
                        <div key={index} className="font-sans text-[11px] leading-tight">
                          <span className="font-pixel text-[8px] text-yellow-400 mr-2">
                            [{comment.author}]
                          </span>
                          <span className="text-gray-200">{comment.text}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply Input Drawer */}
                  {activeReplyId === post.id && (
                    <div className="flex gap-2 items-center border-t border-gray-700/60 pt-3">
                      <input
                        type="text"
                        placeholder="Type reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="flex-1 font-sans text-xs p-2 bg-[#1c2a4a] text-white border-2 border-retro-black focus:outline-none placeholder-gray-400"
                      />
                      <PixelButton
                        variant="navy"
                        onClick={() => handleSendReply(post.id)}
                        className="py-1 px-3 text-[8px] border-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      >
                        SEND
                      </PixelButton>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      </main>

      <Footer />
    </div>
  );
}