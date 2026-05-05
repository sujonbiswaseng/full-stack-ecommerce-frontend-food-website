'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Star, StarHalf } from 'lucide-react'
import { Button } from '../../ui/button'
import { Status, StatusIndicator, StatusLabel } from '../../ui/status'
import { manageCartStore } from '@/store/CartStore'
import ReviewForm from '../review/reviewform'
import { TResponseMeals } from '@/types/meals.type'
import { TUser } from '@/types/user.type'
import { TGetCategory } from '@/types/category'
import { IProviderInfo } from '@/types/provider.type'
import { IgetReviewData } from '@/types/reviews.type'
import ImageWithSkeleton from '@/components/ImageSkeleton'
import ReviewItem from '../review/reviewitem'

const PAGE_ANIMATION = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
}

const SingleMealById = ({
  meal,
  userinfo,
}: {
  meal: TResponseMeals<{
    category: TGetCategory
    provider: IProviderInfo
    reviews: IgetReviewData[]
    providerRating: any
  }>
  userinfo: TUser
}) => {
  const addToCart = manageCartStore((state) => state.addToCart)
  const router = useRouter()
  const defaultImage =
    'https://res.cloudinary.com/drmeagmkl/image/upload/v1771962102/default_meal_kgc6mv.png'
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null)
  const starCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: meal.reviews.filter((r) => Math.floor(r.rating) === star).length,
  }))
  const fullStars = Math.floor(Number(meal.providerRating?.averageRating))
  const hasHalfStar = Number(meal.providerRating?.averageRating) % 1 >= 0.5
  const images = meal.images?.length ? meal.images : ['/default-meals.png']
  const [activeImage, setActiveImage] = useState(images[0])

  return (
    <main className="bg-background min-h-screen max-w-[1440px] mx-auto w-full py-8 px-4">
      <div className=" space-y-8">
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative w-full rounded-3xl overflow-hidden bg-card shadow border border-border min-h-[240px] md:min-h-[340px] flex items-stretch"
        >
          <div className="flex flex-col lg:flex-row gap-8 md:gap-8 h-full w-full">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center lg:items-start justify-center gap-6 p-8 w-full lg:max-w-sm"
            >
              <div className="relative w-full aspect-square rounded-2xl border border-border overflow-hidden bg-muted">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeImage}
                    className="absolute inset-0 w-full h-full"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ImageWithSkeleton
                      src={activeImage}
                      alt={meal.title}
                    />
                  </motion.div>
                </AnimatePresence>

                <span className="absolute top-4 left-4 rounded-full border border-border bg-background/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-card-foreground shadow-sm backdrop-blur-md select-none">
                  Featured Meal
                </span>
              </div>

              <div className="flex gap-4 w-full flex-wrap" aria-label="gallery thumbnails">
                {images.map((img, idx) => (
                  <button
                    key={img}
                    type="button"
                    aria-label={`Show image ${idx + 1}`}
                    onClick={() => setActiveImage(img)}
                    className={[
                      "group relative h-14 w-14 rounded-xl border flex items-center justify-center bg-card overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors",
                      img === activeImage
                        ? "border-primary ring-2 ring-primary"
                        : "border-border hover:border-accent/60"
                    ].join(" ")}
                  >
                    <Image
                      src={img}
                      alt={`Preview ${idx + 1}`}
                      fill
                      loading="lazy"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="56px"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col justify-between p-8 w-full"
            >
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-card-foreground leading-tight mb-2">
                  {meal.title}
                </h1>
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold shadow transition-colors select-none
                    bg-secondary text-secondary-foreground">
                    {meal.cuisine}
                  </span>
                  <span
                    className={[
                      "inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold shadow transition-colors select-none",
                      meal.isAvailable
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    ].join(" ")}
                  >
                    {meal.isAvailable ? "Available" : "Sold Out"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col mt-2 gap-4 md:flex-row md:items-center">
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, i) => {
                    if (i < fullStars) {
                      return (
                        <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                      )
                    }
                    if (i === fullStars && hasHalfStar) {
                      return (
                        <StarHalf key={i} className="w-4 h-4 text-accent fill-accent" />
                      )
                    }
                    return <Star key={i} className="w-4 h-4 text-muted-foreground" />
                  })}
                  <span className="text-xs text-muted-foreground ml-2 hidden sm:inline-block">
                    {meal.providerRating?.averageRating
                      ? `${Number(meal.providerRating.averageRating).toFixed(1)}`
                      : '0.0'}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    {`(${meal.providerRating?.totalReview ?? 0} reviews)`}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <section className="lg:col-span-2 flex flex-col gap-8">
            <motion.section
              {...PAGE_ANIMATION}
              className="bg-card rounded-2xl shadow border border-border p-6 flex flex-col gap-6"
            >
              <h2 className="text-2xl font-bold text-card-foreground mb-2">About This Meal</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
                <div className="flex flex-col gap-2">
                  <span className="text-muted-foreground block">Category</span>
                  <div className="flex items-center gap-2">
                    <Image
                      src={meal.category.image}
                      alt={meal.category.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover border border-border"
                    />
                    <span className="font-semibold text-card-foreground">{meal.category.name}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-muted-foreground block">Dietary</span>
                  <span className="font-semibold text-card-foreground">{meal.dietaryPreference}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-muted-foreground block">Cuisine</span>
                  <span className="font-semibold text-card-foreground">{meal.cuisine}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-muted-foreground block">Price</span>
                  <span className="font-semibold text-card-foreground">
                    ${meal.price?.toFixed(2)}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-muted-foreground block">Delivery Charge</span>
                  <span className="font-semibold text-card-foreground">
                    ${meal.deliverycharge?.toFixed(2)}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-muted-foreground block">Created At</span>
                  <span className="font-semibold text-card-foreground">
                    {meal.createdAt?.slice(0, 10)}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-muted-foreground block">Available</span>
                  <span className="inline-flex items-center gap-1">
                    <Status
                      variant={meal.isAvailable ? 'success' : 'error'}
                      className="rounded-full px-3 py-1 text-xs items-center border border-border"
                    >
                      <StatusIndicator />
                      <StatusLabel>
                        {meal.isAvailable ? 'Available' : 'Unavailable'}
                      </StatusLabel>
                    </Status>
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-muted-foreground block">Status</span>
                  <span className="inline-flex items-center gap-1">
                    {(() => {
                      const status = meal.status
                      const variantMap: Record<string, string> = {
                        APPROVED: 'success',
                        PENDING: 'warning',
                        REJECTED: 'error',
                      }
                      return (
                        <Status
                          variant={variantMap[status] as any || 'default'}
                          className="rounded-full px-3 py-1 text-xs items-center border border-border"
                        >
                          <StatusIndicator />
                          <StatusLabel>{status}</StatusLabel>
                        </Status>
                      )
                    })()}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-card-foreground mt-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed text-base mt-4">
                  {meal.description}
                </p>
              </div>
            </motion.section>

            {/* Customer Reviews Card */}
            <motion.section
              {...PAGE_ANIMATION}
              className="bg-card rounded-2xl shadow border border-border p-6 flex flex-col gap-6"
            >
              <h2 className="text-2xl font-bold text-card-foreground flex items-end gap-2">
                Customer Reviews
                <span className="text-muted-foreground font-normal">
                  ({meal.totalReviews})
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col items-start gap-2">
                  <span className="text-4xl font-bold text-primary">
                    {meal.avgRating !== undefined ? meal.avgRating.toFixed(1) : '0.0'}
                  </span>
                  <span className="text-muted-foreground text-base">
                    Average Rating
                  </span>
                </div>
                <div className="flex flex-col gap-3 w-full">
                  {starCounts.map(({ star, count }) => (
                    <div key={star} className="flex items-center w-full gap-3">
                      <span className="w-10 text-xs text-muted-foreground">{star}★</span>
                      <div className="flex-1 h-2.5 bg-input rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-accent transition-all"
                          style={{
                            width: `${meal.totalReviews ? (count / meal.totalReviews) * 100 : 0}%`,
                          }}
                        />
                      </div>
                      <span className="w-8 text-xs text-muted-foreground pl-1">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* No reviews message (providerRating.totalReview) */}
              {meal.providerRating.totalReview === 0 && (
                <span className="text-muted-foreground">No reviews yet.</span>
              )}
            </motion.section>

            {/* Customer Reviews List */}
            <motion.section className="mt-4 md:mt-10 space-y-6">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Reviews
              </h2>
              <div className="rounded-2xl border border-border bg-card shadow-sm p-3 sm:p-4">
                {meal.reviews?.length > 0 ? (
                  // Enable horizontal scroll on small devices only (max-width: sm)
                  <div className="space-y-4 min-w-[280px] sm:min-w-0 overflow-x-auto sm:overflow-x-visible scrollbar-thin scrollbar-thumb-accent/40 scrollbar-track-transparent">
                    {meal.reviews.map((review: IgetReviewData) => (
                      <div
                        key={review.id}
                        className="rounded-xl border border-border bg-card px-3 sm:px-5 py-4 min-w-[320px] sm:min-w-0"
                      >
                        <ReviewItem
                          user={userinfo}
                          review={{
                            ...review,
                            user: (review as any).customer ?? meal.provider.user,
                            meal: meal,
                          }}
                          meal={meal}
                          activeReplyId={activeReplyId}
                          setActiveReplyId={setActiveReplyId}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground bg-muted px-4 py-3 rounded">
                    No reviews yet. Be the first to review!
                  </p>
                )}
              </div>
            </motion.section>
 
      
          </section>
          <aside className="lg:sticky lg:top-20 h-fit">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-2xl shadow-xl border border-border p-6 flex flex-col gap-8"
            >
              <div className="text-3xl font-extrabold text-primary pb-2 border-b border-border">
                ${meal.price?.toFixed(2)}
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
                <Button
                  onClick={() => router.push('/cart')}
                  disabled={!meal.isAvailable}
                  className="flex-1"
                  size="lg"
                >
                  {meal.isAvailable ? 'Order Now' : 'Currently Unavailable'}
                </Button>
                <Button
                  variant="secondary"
                  disabled={!meal.isAvailable}
                  className="flex-1"
                  size="lg"
                  onClick={() =>
                    addToCart({
                      id: meal.id as string,
                      mealid: meal.id as string,
                      name: meal.title as string,
                      price: meal.price,
                      restaurantName: meal.provider.restaurantName,
                      deliverycharge: meal.deliverycharge ?? 0,
                      image: meal?.images && meal.images.length > 0 ? meal.images[0] : defaultImage,
                      isAvailable: meal.isAvailable,
                      quantity: 1,
                    })
                  }
                >
                  Add to cart
                </Button>
              </div>
              <div className="border-t border-border pt-6">
                <h3 className="font-semibold mb-2 text-card-foreground">Provided By</h3>
                <div className="flex items-center gap-4 justify-between flex-wrap">
                  <Link href={`/providers/${meal.provider?.id}`} className="group">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-primary shadow">
                      <Image
                        src={meal.provider.image || defaultImage}
                        alt={meal.provider.restaurantName}
                        fill
                        priority
                        className="object-cover"
                      />
                    </div>
                  </Link>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => {
                      if (i < fullStars) {
                        return (
                          <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                        )
                      }
                      if (i === fullStars && hasHalfStar) {
                        return (
                          <StarHalf key={i} className="w-4 h-4 text-accent fill-accent" />
                        )
                      }
                      return <Star key={i} className="w-4 h-4 text-muted-foreground" />
                    })}
                    <span className="text-xs text-muted-foreground ml-2">
                      {`(${meal.providerRating?.totalReview} reviews)`}
                    </span>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-card-foreground">Restaurant:</span>
                    <span className="text-xs text-muted-foreground bg-input rounded px-2 py-1">
                      {meal.provider?.restaurantName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-card-foreground">Address:</span>
                    <span className="text-xs text-muted-foreground bg-input rounded px-2 py-1">
                      {meal.provider?.address}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-card-foreground">Name:</span>
                    <span className="text-xs text-muted-foreground bg-input rounded px-2 py-1">
                      {meal.provider.user.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-card-foreground">Email:</span>
                    <span className="text-xs text-muted-foreground bg-input rounded px-2 py-1">
                      {meal.provider.user.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-card-foreground text-xs">isActive:</span>
                    {meal.provider.user.isActive ? (
                      <Status
                        variant="success"
                        className="rounded-full px-2 py-1 text-xs border border-border inline-flex items-center bg-success/10 text-success"
                      >
                        <StatusIndicator />
                        <span className="ml-1">Active</span>
                      </Status>
                    ) : (
                      <Status
                        variant="error"
                        className="rounded-full px-2 py-1 text-xs border border-border inline-flex items-center bg-destructive/10 text-destructive"
                      >
                        <StatusIndicator />
                        <span className="ml-1">Inactive</span>
                      </Status>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </aside>
          <div className="lg:col-span-1 w-full">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-2xl shadow border border-border p-6 w-full"
            >
              <ReviewForm mealId={meal.id} />
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SingleMealById
