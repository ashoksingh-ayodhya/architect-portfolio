import { useParams, Link, Navigate } from "react-router-dom";
import blogPosts from "@/data/blogPosts";
import BlogContent from "@/components/blog/BlogContent";
import ReadingProgress from "@/components/blog/ReadingProgress";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const related = blogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2);

  if (related.length < 2) {
    const more = blogPosts
      .filter((p) => p.slug !== post.slug && !related.includes(p))
      .slice(0, 2 - related.length);
    related.push(...more);
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden pb-20">
      <ReadingProgress />

      <section className="border-b border-ink/10 bg-paper px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/blog"
            className="mb-6 inline-flex items-center gap-2 font-grotesk text-xs font-bold uppercase tracking-wider transition-colors hover:text-warn"
          >
            <ArrowLeft className="h-4 w-4" />
            All rants
          </Link>

          <div className="flex items-center gap-3">
            <span className="rounded-full bg-acid/30 px-2.5 py-1 font-grotesk text-[10px] font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="flex items-center gap-1 font-mono text-[10px] ink-faint">
              <Calendar className="h-3 w-3" />
              {post.date}
            </span>
            <span className="flex items-center gap-1 font-mono text-[10px] ink-faint">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
          </div>

          <h1 className="mt-5 font-display text-3xl leading-tight sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-3 font-marker text-2xl text-warn sm:text-3xl">
            {post.subtitle}
          </p>
          <p className="mt-4 font-grotesk text-sm font-bold uppercase tracking-wider ink-faint">
            TL;DR: {post.tldr}
          </p>
        </div>
      </section>

      <article className="px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <BlogContent blocks={post.blocks} />
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-ink/10 px-5 py-14 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl">
            <p className="font-grotesk text-xs font-bold uppercase tracking-wider ink-faint">
              More rants
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl">
              Related <span className="highlight">opinions</span>
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/blog/${r.slug}`}
                  className="group block rounded-xl border-2 border-ink bg-paper p-4 transition-all hover:-translate-y-1 hover:shadow-sticker sm:p-5"
                >
                  <span className="rounded-full bg-acid/30 px-2 py-0.5 font-grotesk text-[10px] font-bold uppercase tracking-wider">
                    {r.category}
                  </span>
                  <h3 className="mt-2 font-display text-xl leading-tight transition-colors group-hover:text-warn">
                    {r.title}
                  </h3>
                  <p className="mt-1 font-marker text-lg text-warn">{r.subtitle}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default BlogPostPage;
