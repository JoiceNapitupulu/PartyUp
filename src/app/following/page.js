"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PixelButton from "@/components/PixelButton";
import usersData from "@/data/users.json";

export default function Following() {
  // Feed posts state
  const [posts, setPosts] = useState([
    {
      id: "post-1",
      author_id: "USR-002", // Alex
      content: "EcoSphere carbon-calculator engine is fully optimized. 1000 nodes computed in under 3ms. Still looking for a Hustler class teammate to help compile the invention pitch slides! Check out my quest board. #INVENTION2026 #Hustler",
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
      content: "Drafted the Business Model Canvas slides for the EduQuest flashcard project. Hustler passive active! Database schemas are looking good. Let's secure that A+ grade! 🚀 #ProductManagement",
      likes: 9,
      isLiked: false,
      timestamp: "1 day ago",
      comments: [
        { author: "Kevin", text: "Nice! I can help review the schemas if needed." }
      ]
    }
  ]);

  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
          };
        }
        return post;
      })
    );
  };

  const handleSendReply = (postId) => {
    if (!replyText.trim()) return;
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, { author: "You", text: replyText.trim() }],
          };
        }
        return post;
      })
    );
    setReplyText("");
    setActiveReplyId(null);
  };

  return (
    <>
      <Header />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 md:px-6 pt-24 md:pt-28 pb-12 flex flex-col gap-8">
        {/* Header Title */}
        <div className="border-b-4 border-retro-black pb-6">
          <h1 className="font-pixel text-xl text-retro-black mb-2">
            [GUILD ACTIVITY TIMELINE]
          </h1>
          <p className="font-sans text-sm text-retro-dark-gray">
            Keep track of latest updates, status feeds, and achievements published by your connections.
          </p>
        </div>

        {/* Post List */}
        <section className="flex flex-col gap-6">
          {posts.map((post) => {
            const author = usersData.find((u) => u.user_id === post.author_id) || {
              name: "Unknown Adventurer",
              role: "Hacker",
              major: "CS",
            };

            return (
              <div
                key={post.id}
                className="bg-white pixel-border pixel-shadow p-6 flex flex-col gap-4"
              >
                {/* Post Author Info */}
                <div className="flex justify-between items-start border-b-2 border-retro-light-gray pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-retro-gray border-2 border-retro-black flex items-center justify-center font-pixel text-sm text-navy-blue font-bold">
                      {author.name[0]}
                    </div>
                    <div>
                      <p className="font-pixel text-[10px] text-retro-black leading-tight">
                        {author.name}
                      </p>
                      <p className="font-sans text-[11px] text-retro-dark-gray leading-tight">
                        {author.role} • {author.major}
                      </p>
                    </div>
                  </div>
                  <span className="font-pixel text-[8px] text-retro-dark-gray">{post.timestamp}</span>
                </div>

                {/* Post Body Content */}
                <p className="font-sans text-xs text-retro-black leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>

                {/* Action Toolbar */}
                <div className="border-t border-b border-retro-light-gray py-2 flex items-center gap-4">
                  {/* Like Button */}
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`font-pixel text-[9px] px-2.5 py-1 border-2 select-none cursor-pointer hover:bg-retro-light-gray transition-all ${
                      post.isLiked
                        ? "bg-pixel-green text-retro-black border-retro-black font-bold"
                        : "bg-transparent text-retro-black border-transparent"
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
                    className="font-pixel text-[9px] px-2.5 py-1 border-2 border-transparent bg-transparent text-retro-black hover:border-retro-black hover:bg-retro-light-gray select-none cursor-pointer transition-all"
                  >
                    💬 REPLY ({post.comments.length})
                  </button>
                </div>

                {/* Comment logs */}
                {post.comments.length > 0 && (
                  <div className="bg-retro-light-gray p-3 border-2 border-retro-black flex flex-col gap-2.5">
                    {post.comments.map((comment, index) => (
                      <div key={index} className="font-sans text-[11px] leading-tight">
                        <span className="font-pixel text-[8px] text-navy-blue mr-2">
                          [{comment.author}]
                        </span>
                        <span className="text-retro-black">{comment.text}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Input Drawer */}
                {activeReplyId === post.id && (
                  <div className="flex gap-2 items-center border-t border-retro-light-gray pt-3">
                    <input
                      type="text"
                      placeholder="Type your connection update reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="flex-1 font-sans text-xs p-2 bg-white pixel-border-sm focus:outline-none"
                    />
                    <PixelButton
                      variant="navy"
                      onClick={() => handleSendReply(post.id)}
                      className="py-1 px-3 text-[9px] border-2"
                    >
                      SEND
                    </PixelButton>
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </main>

      <Footer />
    </>
  );
}
