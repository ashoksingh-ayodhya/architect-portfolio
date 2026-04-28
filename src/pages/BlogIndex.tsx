import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import blogPosts from "@/data/blogPosts";
import BlogCard from "@/components/blog/BlogCard";
import { ArrowLeft, Search } from "lucide-react";

const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

const BlogIndex = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let posts = blogPosts;
    if (activeCategory !== "All") {
      posts = posts.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.tldr.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return posts;
  }, [activeCategory, search]);

  return (
    <main className="relative min-h-screen overflow-x-hidden pb-20">
      <section className="border-b border-ink/10 bg-paper px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 font-grotesk text-xs font-bold uppercase tracking-wider transition-colors hover:text-warn"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to laws
          </Link>

          <h1 className="font-display text-4xl leading-none sm:text-6xl">
            The <span className="highlight">Blog</span>
          </h1>
          <p className="mt-4 max-w-xl font-marker text-2xl text-warn">
            24 rants on attribution, conversion, sales stacks, and the lies we tell ourselves.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ink-faint" />
              <input
                type="text"
                placeholder="Search rants..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border-2 border-ink bg-background py-2 pl-9 pr-4 font-grotesk text-sm outline-none transition-colors focus:border-warn"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-3 py-1.5 font-grotesk text-[11px] font-bold uppercase tracking-wider transition-colors ${
                    activeCategory === cat
                      ? "bg-ink text-paper"
                      : "bg-paper-soft ink-soft hover:bg-secondary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-marker text-3xl text-warn">No rants found.</p>
              <p className="mt-2 font-mono text-sm ink-faint">Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post, i) => (
                <BlogCard key={post.slug} post={post} featured={i === 0 && activeCategory === "All" && !search} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default BlogIndex;
