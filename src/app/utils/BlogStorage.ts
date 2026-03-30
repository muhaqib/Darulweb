// Blog post storage using localStorage
const BLOG_KEY = "attaqonyy_blog_posts";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
}

// Initialize with sample posts
const SAMPLE_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Modern Web Development",
    slug: "getting-started-with-modern-web-development",
    excerpt:
      "Learn the fundamentals of modern web development and the tools you need to build amazing websites.",
    content: `# Getting Started with Modern Web Development

Web development has evolved tremendously over the past decade. In this comprehensive guide, we'll explore the essential tools and technologies you need to become a successful web developer.

## Essential Technologies

### HTML, CSS, and JavaScript
These are the building blocks of the web. HTML provides structure, CSS handles styling, and JavaScript adds interactivity.

### Modern Frameworks
React, Vue, and Angular have revolutionized how we build web applications. They provide powerful tools for creating dynamic, responsive user interfaces.

## Best Practices

1. **Write Clean Code** - Follow coding standards and conventions
2. **Responsive Design** - Ensure your websites work on all devices
3. **Performance** - Optimize for speed and efficiency
4. **Accessibility** - Make your sites usable by everyone

## Conclusion

The journey of web development is exciting and ever-changing. Stay curious, keep learning, and build amazing things!`,
    author: "Attaqonyy Web Team",
    category: "Web Development",
    tags: ["Tutorial", "Beginner", "Web Dev"],
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    createdAt: new Date("2024-01-15").toISOString(),
    updatedAt: new Date("2024-01-15").toISOString(),
    published: true,
  },
  {
    id: "2",
    title: "The Power of Responsive Design",
    slug: "the-power-of-responsive-design",
    excerpt:
      "Discover why responsive design is crucial for modern websites and how to implement it effectively.",
    content: `# The Power of Responsive Design

In today's mobile-first world, responsive design isn't just a nice-to-have—it's essential. Let's explore why and how to create truly responsive websites.

## Why Responsive Design Matters

With over 60% of web traffic coming from mobile devices, your website must look great and function perfectly on screens of all sizes.

## Key Principles

### Fluid Grids
Use relative units like percentages instead of fixed pixels to create flexible layouts.

### Flexible Images
Ensure images scale appropriately within their containers.

### Media Queries
CSS media queries allow you to apply different styles based on device characteristics.

## Mobile-First Approach

Start designing for mobile devices first, then progressively enhance for larger screens. This ensures a solid foundation for all users.

## Conclusion

Responsive design is not optional in modern web development. It's a fundamental requirement for creating successful websites.`,
    author: "Attaqonyy Web Team",
    category: "Design",
    tags: ["Design", "Responsive", "Mobile"],
    imageUrl: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800",
    createdAt: new Date("2024-02-10").toISOString(),
    updatedAt: new Date("2024-02-10").toISOString(),
    published: true,
  },
  {
    id: "3",
    title: "SEO Best Practices for 2024",
    slug: "seo-best-practices-for-2024",
    excerpt:
      "Stay ahead of the curve with the latest SEO strategies and techniques for better search rankings.",
    content: `# SEO Best Practices for 2024

Search Engine Optimization continues to evolve. Here are the most important strategies for ranking well in 2024.

## Content Quality

Google's algorithms increasingly favor high-quality, valuable content. Focus on:

- **Comprehensive Coverage** - Address topics thoroughly
- **User Intent** - Understand what users are searching for
- **Original Research** - Provide unique insights and data

## Technical SEO

### Page Speed
Fast-loading pages rank better and provide better user experience.

### Mobile Optimization
Mobile-first indexing means Google primarily uses mobile versions for ranking.

### Core Web Vitals
LCP, FID, and CLS are crucial metrics that Google uses to measure user experience.

## Link Building

Quality backlinks remain important. Focus on earning links through:
- Creating shareable content
- Guest posting on reputable sites
- Building relationships with industry influencers

## Conclusion

SEO success requires a holistic approach combining great content, technical excellence, and strategic promotion.`,
    author: "Attaqonyy Web Team",
    category: "SEO",
    tags: ["SEO", "Marketing", "Best Practices"],
    imageUrl:
      "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?w=800",
    createdAt: new Date("2024-03-05").toISOString(),
    updatedAt: new Date("2024-03-05").toISOString(),
    published: true,
  },
];

const initializeBlogPosts = (): void => {
  if (!localStorage.getItem(BLOG_KEY)) {
    localStorage.setItem(BLOG_KEY, JSON.stringify(SAMPLE_POSTS));
  }
};

export const getAllPosts = (): BlogPost[] => {
  initializeBlogPosts();
  try {
    const posts = localStorage.getItem(BLOG_KEY);
    return posts ? JSON.parse(posts) : [];
  } catch {
    return [];
  }
};

export const getPublishedPosts = (): BlogPost[] => {
  return getAllPosts().filter((post) => post.published);
};

export const getPostBySlug = (slug: string): BlogPost | null => {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
};

export const getPostById = (id: string): BlogPost | null => {
  const posts = getAllPosts();
  return posts.find((post) => post.id === id) || null;
};

export const createPost = (
  post: Omit<BlogPost, "id" | "createdAt" | "updatedAt">,
): BlogPost => {
  const posts = getAllPosts();
  const newPost: BlogPost = {
    ...post,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  posts.unshift(newPost);
  localStorage.setItem(BLOG_KEY, JSON.stringify(posts));
  return newPost;
};

export const updatePost = (
  id: string,
  updates: Partial<BlogPost>,
): BlogPost | null => {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.id === id);

  if (index === -1) return null;

  posts[index] = {
    ...posts[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(BLOG_KEY, JSON.stringify(posts));
  return posts[index];
};

export const deletePost = (id: string): boolean => {
  const posts = getAllPosts();
  const filteredPosts = posts.filter((post) => post.id !== id);

  if (filteredPosts.length === posts.length) return false;

  localStorage.setItem(BLOG_KEY, JSON.stringify(filteredPosts));
  return true;
};

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};
