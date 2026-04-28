import { Link } from "react-router-dom";
import { BlogPost } from "@/data/blogPosts";
import { Calendar, Clock } from "lucide-react";

const toneMap: Record<string, string> = {
  Attribution: "bg-acid/30 text-ink",
  "Unit Economics": "bg-good/20 text-ink",
  Operations: "bg-pop/15 text-ink",
  "Media Buying": "bg-warn/20 text-ink",
  Creative: "bg-acid2/30 text-ink",
  Conversion: "bg-warn/15 text-ink",
  "Sales Stack": "bg-pop/15 text-ink",
  Strategy: "bg-paper text-ink",
  Meta: "bg-ink/10 text-ink",
};

const BlogCard = ({ post, featured = false }: { post: BlogPost; featured?: boolean }) => {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`group block rounded-xl border-2 border-ink bg-paper p-5 transition-all hover:-translate-y-1 hover:shadow-sticker sm:p-6 ${
        featured ? "sm:col-span-2 sm:row-span-2" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        <span className={`rounded-full px-2.5 py-1 font-grotesk text-[10px] font-bold uppercase tracking-wider ${toneMap[post.category] || "bg-paper text-ink"}`}>
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

      <h3 className={`mt-3 font-display leading-tight transition-colors group-hover:text-warn ${featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}>
        {post.title}
      </h3>
      <p className={`mt-2 font-marker ${featured ? "text-xl text-warn" : "text-lg text-warn"}`}>
        {post.subtitle}
      </p>
      <p className="mt-3 font-grotesk text-xs font-bold uppercase tracking-wider ink-faint">
        {post.tldr}
      </p>
    </Link>
  );
};

export default BlogCard;
