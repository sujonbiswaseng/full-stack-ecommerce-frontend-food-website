"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, User, Search, Clock } from "lucide-react";
import { toast } from "sonner";

const categories = ["All", "Industry", "Health", "Stories", "Sustainability"] as const;
type Category = (typeof categories)[number];

const blogPosts = [
  {
    id: 1,
    title: "The Future of Food Delivery: Trends to Watch",
    excerpt:
      "Explore the latest innovations shaping the food delivery industry and what they mean for consumers and restaurants.",
    author: "bitebase Team",
    date: "2024-12-15",
    category: "Industry",
    readTime: "5 min read",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
  },
  {
    id: 2,
    title: "Healthy Eating: Tips from Our Partner Chefs",
    excerpt:
      "Learn from professional chefs about creating nutritious, delicious meals that don't compromise on flavor.",
    author: "Chef Maria",
    date: "2024-12-10",
    category: "Health",
    readTime: "4 min read",
    image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg",
  },
  {
    id: 3,
    title: "Behind the Scenes: A Day in the Life of a bitebase Partner",
    excerpt:
      "Get an exclusive look at how our partner restaurants prepare and deliver exceptional food experiences.",
    author: "Sarah Chen",
    date: "2024-12-05",
    category: "Stories",
    readTime: "6 min read",
    image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg",
  },
  {
    id: 4,
    title: "Seasonal Ingredients: Making the Most of Local Produce",
    excerpt:
      "Discover how using seasonal, local ingredients can enhance flavor and support sustainable practices.",
    author: "Chef Ahmed",
    date: "2024-11-28",
    category: "Sustainability",
    readTime: "3 min read",
    image: "https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg",
  },
  {
    id: 5,
    title: "How bitebase is Supporting Local Restaurants",
    excerpt:
      "A deep dive into our partnership model and how we help local businesses thrive in a competitive market.",
    author: "bitebase Team",
    date: "2024-11-20",
    category: "Stories",
    readTime: "7 min read",
    image: "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg",
  },
  {
    id: 6,
    title: "Understanding Food Allergies: A Guide for Customers",
    excerpt:
      "Everything you need to know about allergen labeling and how bitebase helps customers with dietary restrictions.",
    author: "Dr. Priya Nair",
    date: "2024-11-14",
    category: "Health",
    readTime: "5 min read",
    image: "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg",
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const filteredPosts = blogPosts.filter((post) => {
    const matchCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribing(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Thanks for subscribing!");
    setEmail("");
    setIsSubscribing(false);
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Bitebase Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Insights, stories, and tips from the world of food delivery and
            culinary excellence
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              id="blog-search"
            />
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-card-foreground border-border hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">No articles found for your search.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group overflow-hidden border-border">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest food trends, exclusive
            recipes, and platform updates.
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
          >
            <Input
              id="blog-newsletter-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-primary-foreground text-primary placeholder:text-primary/60"
              required
            />
            <Button
              type="submit"
              variant="secondary"
              disabled={isSubscribing}
              className="shrink-0"
            >
              {isSubscribing ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}