"use client";
import { useState } from "react";
import { Star, Send } from "lucide-react";
import { createReviewAction } from "@/actions/reviews.order";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

interface Props {
  mealId: string;
  parentId?: string | null;
  onSuccess?: (review: any) => void;
}

export default function ReviewForm({ mealId, parentId, onSuccess }: Props) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment.trim()) return;
    if (rating === 0) {
      toast.warning("Rating must be at least 1.");
      return;
    }
    setIsSubmitting(true);
    const data = {
      rating,
      comment,
      parentId,
    };
    const res = await createReviewAction(mealId, data);
    setIsSubmitting(false);

    if (!res.success) {
      toast.error(res.message || "Failed to add review");
      return;
    }
    toast.success(res.message || "Review added successfully");
    router.refresh();
    setComment("");
    setRating(0);
    if (onSuccess) onSuccess(res.data);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-card rounded-2xl shadow border border-border p-6 w-full flex flex-col gap-6"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      aria-labelledby="review-form-title"
    >
      <div>
        <h3 id="review-form-title" className="text-lg font-semibold text-card-foreground mb-2">
          {parentId ? "Reply to Review" : "Leave a Review"}
        </h3>
        <span className="text-sm text-muted-foreground">
          {parentId ? "Join the conversation" : "Share your honest feedback"}
        </span>
      </div>

      <div className="flex items-center gap-2" aria-label="Rating" role="radiogroup">
        {Array.from({ length: 5 }).map((_, idx) => {
          const starVal = idx + 1;
          return (
            <button
              key={starVal}
              type="button"
              aria-label={`Rate ${starVal} out of 5`}
              aria-pressed={rating === starVal}
              onClick={() => setRating(starVal)}
              onMouseEnter={() => setHover(starVal)}
              onMouseLeave={() => setHover(0)}
              className="focus-visible:outline-none rounded-full transition-colors duration-200"
              tabIndex={0}
            >
              <Star
                size={24}
                className={
                  (hover || rating) >= starVal
                    ? "text-accent fill-accent drop-shadow-sm"
                    : "text-muted-foreground"
                }
              />
            </button>
          );
        })}
        {rating > 0 && (
          <span className="ml-2 text-sm text-accent">{rating}/5</span>
        )}
      </div>

      <div className="relative w-full">
        <label htmlFor={`review-comment-${mealId}`} className="sr-only">
          {parentId ? "Reply" : "Your review"}
        </label>
        <Textarea
          id={`review-comment-${mealId}`}
          placeholder={parentId ? "Write a reply..." : "Write your comment..."}
          className="w-full min-h-[72px] pr-12 bg-input border border-border rounded-xl focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground transition"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          rows={3}
          maxLength={350}
          disabled={isSubmitting}
          aria-required="true"
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-3 bottom-3 bg-primary hover:bg-primary/90 text-primary-foreground shadow-none"
          disabled={isSubmitting || !comment.trim() || rating === 0}
          aria-label={parentId ? "Send reply" : "Send review"}
        >
          <Send size={18} />
        </Button>
      </div>
    </motion.form>
  );
}