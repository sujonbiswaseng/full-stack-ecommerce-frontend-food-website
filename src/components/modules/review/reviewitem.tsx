import {
  deleteReviewAction,
  reviewUpdate,
} from "@/actions/reviews.order";
import ReviewForm from "@/components/modules/review/reviewform";
import { IGetMealData, MealReview } from "@/types/meals.type";
import { IUpdatereviewData } from "@/types/reviews.type";
import { TUser } from "@/types/user.type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const ReviewItem = ({
  user,
  review,
  meal,
  activeReplyId,
  setActiveReplyId,
  totalLength,
}: {
  user: TUser;
  review: MealReview;
  meal: IGetMealData;
  activeReplyId: any;
  setActiveReplyId: any;
  totalLength: number;
}) => {
  const router = useRouter();
  const [isEditing, setisEditing] = useState(false);
  const [updateReview, setupdateReview] = useState<IUpdatereviewData>();
  if (!meal) {
    return (
      <div className="p-4 rounded-md bg-destructive/10 text-destructive">
        Failed to load review
      </div>
    );
  }

  const reply = review.replies.filter((item: any) => item.customer?.name);
  const reviewinfo = reply.find((item: any) => item.customer?.id);
  const defaultIamge =
    "https://res.cloudinary.com/drmeagmkl/image/upload/v1771962102/default_meal_kgc6mv.png";

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    const toastId = toast.loading("Deleting review...");
    const res = await deleteReviewAction(review.id);
    toast.dismiss(toastId);
    if (res.success) {
      router.refresh();
      toast.success(res.message || "Review deleted successfully");
    } else {
      toast.error(res.message || "Review deletion failed");
    }
  };

  const handleUpdate = async () => {
    const res = await reviewUpdate(
      review.id,
      updateReview as IUpdatereviewData
    );
    if (res.success) {
      setisEditing(false);
      toast.success("Review updated!");
      router.refresh();
    } else {
      toast.error(res.message || "Update failed");
    }
  };

  const reviewlength = review?.replies?.map((_, i) => i);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border-t border-border pt-6 mt-4 flex gap-4"
    >
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-input overflow-hidden border border-border flex items-center justify-center">
          <Image
            src={
              review.customer?.image ||
              reviewinfo?.customer?.image ||
              defaultIamge
            }
            alt="User"
            fill
            className="object-cover"
            sizes="48px"
            priority={false}
          />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-4 mb-1">
          <h4 className="font-semibold text-card-foreground truncate">
            {review.customer?.name || reviewinfo?.customer?.name || "Customer"}
          </h4>
          {review.rating && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-medium">
              {review.rating.toFixed(1)} ★
            </span>
          )}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setisEditing((prev) => !prev)}
              className="text-muted-foreground"
              aria-label={isEditing ? "Cancel edit" : "Edit review"}
              type="button"
              tabIndex={0}
            >
              {isEditing ? "Cancel" : "Edit"}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleDelete}
              className="text-destructive"
              aria-label="Delete review"
              type="button"
              tabIndex={0}
            >
              Delete
            </Button>
          </div>
        </div>

        {isEditing ? (
          <div className="max-w-md w-full mt-2">
            <label htmlFor={`edit-review-input-${review.id}`} className="sr-only">
              Edit comment
            </label>
            <input
              id={`edit-review-input-${review.id}`}
              type="text"
              className="w-full rounded-md border border-border bg-input text-foreground px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition"
              value={updateReview?.comment ?? ""}
              placeholder="Update your comment"
              onChange={(e) =>
                setupdateReview({ comment: e.target.value })
              }
              aria-label="Edit your comment"
            />
            <div className="flex gap-2 mt-3">
              <Button
                variant="default"
                size="sm"
                onClick={handleUpdate}
                disabled={!updateReview?.comment || updateReview.comment.trim().length === 0}
              >
                Save
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setisEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground mt-1 whitespace-pre-line break-words">
            {review.comment}
          </p>
        )}

        <div className="mt-4 flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            disabled={totalLength !== reviewlength?.length}
            onClick={() =>
              setActiveReplyId(activeReplyId === review.id ? null : review.id)
            }
            tabIndex={0}
          >
            {totalLength === reviewlength?.length ? "Reply" : ""}
          </Button>
        </div>

        {activeReplyId === review.id && (
          <div className="mt-4">
            <ReviewForm parentId={review.id} mealId={meal.id} />
          </div>
        )}

        {review.replies?.length > 0 && (
          <div className="ml-4 sm:ml-8 pl-4 border-l border-border mt-4 space-y-4">
            {review.replies.map((reply: any) => (
              <ReviewItem
                key={reply.id}
                user={user}
                review={reply}
                meal={meal}
                activeReplyId={activeReplyId}
                setActiveReplyId={setActiveReplyId}
                totalLength={review.replies.length}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
