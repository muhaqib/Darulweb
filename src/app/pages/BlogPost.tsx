import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { Calendar, User, Tag, ArrowLeft, Clock } from "lucide-react";
import { getPostBySlug, type BlogPost } from "../utils/blogStorage";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (slug) {
      const foundPost = getPostBySlug(slug);
      setPost(foundPost);
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Article Not Found
          </h2>
          <Link to="/blog" className="text-blue-600 hover:text-blue-700">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-20">
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 font-medium"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {/* Category */}
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <Calendar size={20} />
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={20} />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <span>{calculateReadTime(post.content)} min read</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 text-sm text-gray-700 bg-gray-200 px-3 py-1 rounded-full"
                >
                  <Tag size={14} />
                  {tag}
                </span>
              ))}
            </div>
          </motion.header>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg max-w-none"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div
                className="markdown-content"
                dangerouslySetInnerHTML={{
                  __html: post.content
                    .split("\n")
                    .map((line) => {
                      if (line.startsWith("# ")) {
                        return `<h1 class="text-4xl font-bold text-gray-900 mb-6 mt-8">${line.slice(2)}</h1>`;
                      }
                      if (line.startsWith("## ")) {
                        return `<h2 class="text-3xl font-bold text-gray-900 mb-4 mt-6">${line.slice(3)}</h2>`;
                      }
                      if (line.startsWith("### ")) {
                        return `<h3 class="text-2xl font-bold text-gray-900 mb-3 mt-4">${line.slice(4)}</h3>`;
                      }
                      if (line.startsWith("- ")) {
                        return `<li class="ml-6 text-gray-700 mb-2">${line.slice(2)}</li>`;
                      }
                      if (line.match(/^\d+\. /)) {
                        return `<li class="ml-6 text-gray-700 mb-2">${line.replace(/^\d+\. /, "")}</li>`;
                      }
                      if (line.startsWith("**") && line.endsWith("**")) {
                        return `<p class="font-bold text-gray-900 mb-4">${line.slice(2, -2)}</p>`;
                      }
                      if (line.trim() === "") {
                        return "<br/>";
                      }
                      return `<p class="text-gray-700 mb-4 leading-relaxed">${line}</p>`;
                    })
                    .join(""),
                }}
              />
            </div>
          </motion.div>

          {/* Share and Back */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex justify-between items-center"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <ArrowLeft size={20} />
              Back to All Articles
            </Link>
          </motion.div>
        </div>
      </article>
    </div>
  );
}
