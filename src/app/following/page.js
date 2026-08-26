"use client";

import React, { useState, useEffect, useMemo } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PixelButton from "../../components/PixelButton";
import PixelAvatar from "../../components/PixelAvatar";
import usersData from "../../data/users.json";
import ConfirmModal  from "../../components/ConfirmModal";
import { getStoredUsers, calculateUserLevel } from "../../utils/auth";
import { useLanguage, translations } from "../../utils/lang";

// Data awal umpan timeline jika local storage masih kosong
const INITIAL_POSTS = [
  {
    id: "post-1",
    author_id: "USR-002", // Alex
    content: "EcoSphere carbon-calculator engine is fully optimized! 1,000 computation nodes execute in under 3ms with zero latency drift. Still looking for a UI/UX Designer teammate to finalize the presentation slides. Check my open quests on the board! #INVENTION2026 #Frontend #FullStack",
    likes: 16,
    isLiked: false,
    timestamp: "2 hours ago",
    comments: [
      {
        author: "Joice",
        role: "UI/UX Designer",
        text: "That computation throughput is insane! I can assist with polishing the Figma slides if you still have an open slot."
      }
    ]
  },
  {
    id: "post-2",
    author_id: "USR-001", // Joice
    content: "Just published the complete design system and hi-fi mobile prototype for ScholarSave. Handcrafted 48 custom retro pixelated icons and responsive typography tokens. Inspect the case study in my Showcase portfolio! #Figma #UIUX #DesignSystem",
    likes: 28,
    isLiked: false,
    timestamp: "4 hours ago",
    comments: []
  },
  {
    id: "post-3",
    author_id: "USR-003", // Sarah
    content: "Drafted the Business Model Canvas & Sprint Roadmap for the EduQuest flashcard ecosystem. Next sprint milestone: finalizing backend SQL schemas and automated unit tests. Let's aim for the championship! 🚀 #ProductManagement #GEMASTIK",
    likes: 12,
    isLiked: false,
    timestamp: "1 day ago",
    comments: [
      {
        author: "Kevin",
        role: "Backend Developer",
        text: "Schemas look solid! Let me know if you need help stress-testing the PostgreSQL queries."
      }
    ]
  },
  {
    id: "post-4",
    author_id: "USR-004", // Kevin
    content: "Integrated real-time Bluetooth telemetry in MediLink. Testing cross-platform hardware responsiveness across Android & iOS devices. Ready for GEMASTIK 2026 deployment! 📱 #MobileDev #GEMASTIK #Flutter",
    likes: 21,
    isLiked: false,
    timestamp: "1 day ago",
    comments: []
  }
];

// Daftar Tagar Populer untuk Quick Insert & Filter
const AVAILABLE_TAGS = [
  "ALL",
  "#INVENTION2026",
  "#GEMASTIK",
  "#Frontend",
  "#UIUX",
  "#FullStack",
  "#MobileDev",
  "#ProductManagement"
];

export default function Following() {
  const { lang } = useLanguage();
  const [user, setUser] = useState(null);
  const [usersList, setUsersList] = useState(usersData);
  const [posts, setPosts] = useState(INITIAL_POSTS);

  // Form State
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  // Inisialisasi Sinkronisasi Data dari Local Storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const activeUsers = getStoredUsers();
      setUsersList(activeUsers && activeUsers.length > 0 ? activeUsers : usersData);

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

  // Simpan data postingan ke state dan LocalStorage
  const savePosts = (updatedPosts) => {
    setPosts(updatedPosts);
    if (typeof window !== "undefined") {
      localStorage.setItem("timelinePosts", JSON.stringify(updatedPosts));
    }
  };

  // State untuk mengontrol Modal Konfirmasi Retro
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  // 1. Fungsi Hapus Postingan (Menggunakan Modal Retro)
  const handleDeletePost = (postId) => {
    setConfirmModal({
      isOpen: true,
      title: "DELETE BROADCAST",
      message: "Are you sure you want to permanently delete this broadcast post from the guild timeline?",
      onConfirm: () => {
        const updated = posts.filter((post) => post.id !== postId);
        savePosts(updated);
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  // 2. Fungsi Hapus Komentar (Menggunakan Modal Retro)
  const handleDeleteComment = (postId, commentIndex) => {
    setConfirmModal({
      isOpen: true,
      title: "DELETE COMMENT",
      message: "Are you sure you want to remove this reply from the broadcast feed?",
      onConfirm: () => {
        const updated = posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: post.comments.filter((_, idx) => idx !== commentIndex),
            };
          }
          return post;
        });
        savePosts(updated);
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  // Toggle Suka / Like
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

  // Kirim Komentar / Reply
  const handleSendReply = (postId) => {
    if (!replyText.trim()) return;
    const authorName = user ? user.name : "Guest Adventurer";
    const authorRole = user ? user.role : "Core Contributor";

    const updated = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              author: authorName,
              role: authorRole,
              text: replyText.trim(),
            },
          ],
        };
      }
      return post;
    });

    savePosts(updated);
    setReplyText("");
    setActiveReplyId(null);
  };

  // Buat Postingan Baru
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
      comments: [],
    };

    const updated = [newPost, ...posts];
    savePosts(updated);
    setNewPostContent("");
  };

  // Sisipkan Tagar Cepat ke Textarea
  const insertTag = (tag) => {
    if (tag === "ALL") return;
    setNewPostContent((prev) => (prev ? `${prev} ${tag}` : tag));
  };

  // Salin Tautan Postingan
  const handleCopyPostLink = (id) => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(`${window.location.origin}/following#${id}`);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Filter Postingan berdasarkan Tag Aktif
  const filteredPosts = useMemo(() => {
    if (selectedTag === "ALL") return posts;
    return posts.filter((post) =>
      post.content.toLowerCase().includes(selectedTag.toLowerCase())
    );
  }, [posts, selectedTag]);

  // Render teks dengan tagar berwarna emas dan dapat diklik
  const renderContentWithHashtags = (text) => {
    const parts = text.split(/(#[a-zA-Z0-9_]+)/g);
    return parts.map((part, i) => {
      if (part.startsWith("#")) {
        return (
          <span
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedTag(part);
            }}
            className="text-yellow-400 font-bold hover:text-yellow-300 hover:underline cursor-pointer transition-colors"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="bg-[#0c1322] min-h-screen text-white flex flex-col font-sans overflow-x-hidden selection:bg-yellow-400 selection:text-black">
      <Header />

      {/* ========================================================= */}
      {/* 1. TOP HERO BANNER (Full-Bleed /bg5.gif / min-h-[560px])  */}
      {/* ========================================================= */}
      <section
        className="relative w-full min-h-[480px] md:min-h-[560px] bg-cover bg-center bg-no-repeat overflow-hidden border-b-4 border-retro-black flex items-center justify-center pt-28 md:pt-32"
        style={{ backgroundImage: "url('/bg5.gif')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1322]/85 via-black/60 to-[#0c1322] pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none opacity-35 z-0" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 md:py-20 text-center flex flex-col items-center justify-center gap-4">
          <div className="inline-flex items-center gap-2 bg-[#121b2d]/90 border-2 border-yellow-400 px-3.5 py-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-md">
            <span className="w-2 h-2 rounded-full bg-pixel-green animate-ping" />
            <span className="font-pixel text-[8.5px] md:text-[10px] text-yellow-300 tracking-widest uppercase">
              ✦ GUILD TAVERN &amp; LIVE BROADCASTS ✦
            </span>
          </div>

          <h1 className="font-pixel text-2xl md:text-5xl text-yellow-300 drop-shadow-[0_6px_0px_rgba(0,0,0,1)] leading-tight tracking-wide">
            [ GUILD ACTIVITY TIMELINE ]
          </h1>

          <p className="font-sans text-xs md:text-sm text-gray-200 leading-relaxed max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            Real-time community feeds, daily sprint updates, technical achievements, and party recruitment broadcasts from active student adventurers across Indonesia.
          </p>

          {/* Quick Metrics Ticker */}
          <div className="grid grid-cols-3 gap-3 pt-2 w-full max-w-md text-center">
            <div className="bg-[#121b2d]/80 border-2 border-retro-black p-2.5 rounded-xl backdrop-blur-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-pixel text-xs md:text-sm text-yellow-400">{posts.length}</p>
              <p className="font-pixel text-[7px] text-gray-300 uppercase">Live Feeds</p>
            </div>
            <div className="bg-[#121b2d]/80 border-2 border-retro-black p-2.5 rounded-xl backdrop-blur-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-pixel text-xs md:text-sm text-pixel-green">{usersList.length}</p>
              <p className="font-pixel text-[7px] text-gray-300 uppercase">Adventurers</p>
            </div>
            <div className="bg-[#121b2d]/80 border-2 border-retro-black p-2.5 rounded-xl backdrop-blur-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-pixel text-xs md:text-sm text-cyan-300">REALTIME</p>
              <p className="font-pixel text-[7px] text-gray-300 uppercase">Sync State</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. MAIN CONTENT (DISPATCH CONSOLE & FEED CARDS)           */}
      {/* ========================================================= */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-6 pt-8 pb-16 flex flex-col gap-8">

        {/* --------------------------------------------------------- */}
        {/* A. DISPATCH STATUS UPDATE FORM (TERMINAL HUD CONSOLE)     */}
        {/* --------------------------------------------------------- */}
        <form
          onSubmit={handleCreatePost}
          className="bg-[#121b2d] border-4 border-retro-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 md:p-6 flex flex-col gap-4 text-left"
        >
          {/* Header Terminal */}
          <div className="flex justify-between items-center border-b-2 border-gray-700/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-pixel-green rounded-full animate-pulse" />
              <span className="font-pixel text-[8.5px] md:text-[9.5px] text-yellow-300 tracking-wider">
                // DISPATCH GUILD STATUS BROADCAST
              </span>
            </div>
            <span className="font-pixel text-[7.5px] bg-[#1a253b] text-pixel-green border border-pixel-green/40 px-2 py-0.5 rounded">
              BROADCAST PROTOCOL
            </span>
          </div>

          {/* User Status Bar Preview */}
          <div className="flex items-center justify-between gap-3 bg-[#18233a] p-2.5 border-2 border-retro-black rounded-xl">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 bg-retro-black border border-yellow-400 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                <PixelAvatar role={user?.role || "Coder"} size="w-full h-full" />
              </div>
              <p className="font-sans text-xs text-gray-200 truncate">
                {user ? (
                  <>
                    Posting as <strong className="text-white">{user.name}</strong> (
                    <span className="text-yellow-300 font-pixel text-[8px]">{user.role} • LV.{calculateUserLevel(user)}</span>)
                  </>
                ) : (
                  <span className="text-gray-400">Viewing as Guest. Sign in or register to dispatch broadcasts.</span>
                )}
              </p>
            </div>
            {!user && (
              <a
                href="/register"
                className="font-pixel text-[8px] text-yellow-400 hover:underline shrink-0"
              >
                REGISTER ➔
              </a>
            )}
          </div>

          {/* Textarea Input */}
          <div className="flex flex-col gap-2">
            <textarea
              rows={3}
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder={
                user
                  ? `What's your latest sprint progress, ${user.name}? Share code breakthroughs, design drops, or open party recruitment...`
                  : "Log in to transmit a status broadcast to the guild timeline..."
              }
              disabled={!user}
              className="font-sans text-xs p-3.5 bg-[#18233a] text-white border-2 border-retro-black focus:outline-none focus:border-yellow-400 resize-none placeholder-gray-400 rounded-xl leading-relaxed"
            />

            {/* Quick Hashtag Insertion Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="font-pixel text-[7.5px] text-gray-400 mr-1">// QUICK TAGS:</span>
              {AVAILABLE_TAGS.filter((t) => t !== "ALL").map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => insertTag(tag)}
                  disabled={!user}
                  className="font-pixel text-[7.5px] bg-[#142036] hover:bg-yellow-400/20 hover:text-yellow-300 text-gray-300 border border-gray-700 px-2 py-0.5 rounded transition-colors cursor-pointer disabled:opacity-50"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-1 border-t border-gray-700/60">
            <p className="font-sans text-[11px] text-gray-400 text-left">
              Tip: Mention keywords like <span className="text-yellow-300 font-mono">#GEMASTIK</span> or <span className="text-yellow-300 font-mono">#INVENTION2026</span> for team discovery.
            </p>

            <PixelButton
              variant="green"
              type="submit"
              disabled={!user || !newPostContent.trim()}
              className="py-2 px-6 text-[9px] w-full sm:w-auto"
            >
              TRANSMIT POST ✦
            </PixelButton>
          </div>
        </form>

        {/* --------------------------------------------------------- */}
        {/* B. HASHTAG TOPIC FILTER PILLS                             */}
        {/* --------------------------------------------------------- */}
        <section className="flex flex-col gap-2 text-left">
          <div className="flex items-center justify-between">
            <span className="font-pixel text-[8px] text-gray-400 uppercase">// FILTER BY TOPIC &amp; COMPETITION:</span>
            <span className="font-pixel text-[8px] bg-[#121b2d] border border-retro-black px-2.5 py-1 text-yellow-300 rounded">
              {filteredPosts.length} BROADCASTS
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {AVAILABLE_TAGS.map((tag) => {
              const isActive = selectedTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`font-pixel text-[8px] md:text-[8.5px] px-3.5 py-1.5 rounded-lg border-2 transition-all shrink-0 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] ${isActive
                      ? "bg-yellow-400 text-retro-black border-retro-black font-bold -translate-y-0.5"
                      : "bg-[#142036] text-gray-300 border-retro-black hover:border-yellow-400 hover:text-white"
                    }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </section>

        {/* --------------------------------------------------------- */}
        {/* C. 2-COLUMN TIMELINE POST CARDS GRID (OPTIMAL ERGONOMICS) */}
        {/* --------------------------------------------------------- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {filteredPosts.length === 0 ? (
            <div className="col-span-full bg-[#121b2d] border-4 border-retro-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-12 text-center flex flex-col items-center gap-3">
              <span className="font-pixel text-2xl text-yellow-400">? ? ?</span>
              <p className="font-pixel text-xs text-white">NO BROADCASTS MATCHING "{selectedTag}"</p>
              <p className="font-sans text-xs text-gray-400 max-w-md">
                Try selecting another topic filter or be the first adventurer to transmit a status update!
              </p>
              <PixelButton variant="secondary" onClick={() => setSelectedTag("ALL")}>
                RESET FILTER TO ALL
              </PixelButton>
            </div>
          ) : (
            filteredPosts.map((post) => {
              const author = usersList.find((u) => u.user_id === post.author_id) || {
                name: post.author_id === user?.user_id ? user.name : "Guild Contributor",
                role: post.author_id === user?.user_id ? user.role : "Full-stack Developer",
                major: "Informatics",
              };
              const authorLevel = calculateUserLevel(author);

              return (
                <div
                  key={post.id}
                  id={post.id}
                  className="bg-[#121b2d] border-4 border-retro-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:border-yellow-400 p-5 md:p-6 flex flex-col justify-between gap-4 transition-all duration-200 text-left relative"
                >
                  <div className="flex flex-col gap-3.5">

                    {/* 1. Author Header Info + Tombol Hapus Postingan */}
                    <div className="flex justify-between items-start border-b-2 border-gray-700/60 pb-3.5 gap-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 bg-retro-black border-2 border-yellow-400 rounded-full flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                          <PixelAvatar role={author.role} size="w-full h-full" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-pixel text-[9.5px] md:text-[10px] text-white leading-tight font-bold truncate">
                            {author.name}
                          </p>
                          <p className="font-sans text-[10px] text-gray-400 leading-tight mt-0.5 truncate">
                            {author.role} • <span className="text-yellow-300 font-pixel text-[7.5px]">LV.{authorLevel}</span>
                          </p>
                        </div>
                      </div>

                      {/* Timestamp & Tombol Hapus Postingan */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-pixel text-[7.5px] bg-[#18233a] text-gray-300 border border-retro-black px-2 py-0.5 rounded">
                          {post.timestamp}
                        </span>

                        {/* Tombol Hapus Postingan */}
                        {(post.author_id === user?.user_id || !user) && (
                          <button
                            type="button"
                            onClick={() => handleDeletePost(post.id)}
                            className="font-pixel text-[7.5px] bg-red-900/30 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 hover:border-red-500 px-1.5 py-0.5 rounded cursor-pointer transition-colors shadow-sm"
                            title="Delete this broadcast"
                          >
                            ✕ DELETED
                          </button>
                        )}
                      </div>
                    </div>

                    {/* 2. Body Content dengan Clickable Hashtags */}
                    <p className="font-sans text-xs md:text-sm text-gray-200 leading-relaxed whitespace-pre-line">
                      {renderContentWithHashtags(post.content)}
                    </p>
                  </div>

                  {/* 3. Actions Toolbar & Comment Thread */}
                  <div className="flex flex-col gap-3 pt-2">

                    {/* Action Bar */}
                    <div className="border-t-2 border-gray-700/60 pt-3 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {/* Like Button */}
                        <button
                          type="button"
                          onClick={() => handleLike(post.id)}
                          className={`font-pixel text-[8px] px-3 py-1.5 rounded-lg border-2 select-none cursor-pointer transition-all flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] ${post.isLiked
                              ? "bg-pixel-green text-retro-black border-retro-black font-bold"
                              : "bg-[#18233a] text-gray-200 border-retro-black hover:border-yellow-400 hover:text-white"
                            }`}
                        >
                          <span>{post.isLiked ? "♥" : "♡"}</span>
                          <span>{post.isLiked ? "LIKED" : "LIKE"}</span>
                          <span className="opacity-80">({post.likes})</span>
                        </button>

                        {/* Reply Toggle Button */}
                        <button
                          type="button"
                          onClick={() => {
                            setActiveReplyId(activeReplyId === post.id ? null : post.id);
                            setReplyText("");
                          }}
                          className="font-pixel text-[8px] px-3 py-1.5 rounded-lg border-2 border-retro-black bg-[#18233a] text-gray-200 hover:border-yellow-400 hover:text-white select-none cursor-pointer transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] flex items-center gap-1.5"
                        >
                          <span>💬</span>
                          <span>REPLY</span>
                          <span className="opacity-80">({post.comments.length})</span>
                        </button>
                      </div>

                      {/* Copy Share Link */}
                      <button
                        type="button"
                        onClick={() => handleCopyPostLink(post.id)}
                        className="font-pixel text-[7.5px] text-gray-400 hover:text-yellow-300 transition-colors p-1"
                        title="Copy post link"
                      >
                        {copiedId === post.id ? "✓ COPIED" : "↗ SHARE"}
                      </button>
                    </div>

                    {/* Comment Thread Logs (dengan Tombol Hapus Komentar) */}
                    {post.comments.length > 0 && (
                      <div className="bg-[#18233a] p-3.5 border-2 border-retro-black rounded-xl flex flex-col gap-2.5 mt-1">
                        <span className="font-pixel text-[7.5px] text-yellow-400">// REPLIES FEED:</span>
                        <div className="flex flex-col gap-2">
                          {post.comments.map((comment, index) => (
                            <div
                              key={index}
                              className="bg-[#101828] p-2.5 border border-gray-700/60 rounded-lg text-left relative group"
                            >
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className="font-pixel text-[8px] text-yellow-300 font-bold">
                                  [{comment.author}]
                                </span>

                                <div className="flex items-center gap-2">
                                  {comment.role && (
                                    <span className="font-sans text-[9px] text-gray-400">
                                      {comment.role}
                                    </span>
                                  )}
                                  {/* Tombol Hapus Komentar */}
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteComment(post.id, index)}
                                    className="font-pixel text-[6.5px] text-red-400 hover:text-red-300 opacity-60 group-hover:opacity-100 transition-opacity"
                                    title="Delete comment"
                                  >
                                    ✕
                                  </button>
                                </div>
                              </div>

                              <p className="font-sans text-xs text-gray-200 leading-relaxed">
                                {comment.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Reply Input Drawer */}
                    {activeReplyId === post.id && (
                      <div className="flex gap-2 items-center border-t border-gray-700/60 pt-3 animate-in fade-in duration-150">
                        <input
                          type="text"
                          placeholder={user ? `Reply as ${user.name}...` : "Type a reply to this broadcast..."}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSendReply(post.id);
                          }}
                          className="flex-1 font-sans text-xs p-2.5 bg-[#18233a] text-white border-2 border-retro-black focus:outline-none focus:border-yellow-400 placeholder-gray-400 rounded-lg"
                        />
                        <PixelButton
                          variant="green"
                          onClick={() => handleSendReply(post.id)}
                          className="py-2 px-4 text-[8.5px]"
                        >
                          SEND ➔
                        </PixelButton>
                      </div>
                    )}

                  </div>
                </div>
              );
            })
          )}
        </section>
      </main>

      {/* Modal Konfirmasi Retro 8-Bit */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText="DELETE"
        cancelText="CANCEL"
        variant="danger"
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
      />
      <Footer />
    </div>
  );
}