"use client"

import { manageCartStore } from "@/store/CartStore"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

export default function ProductCard({ meal }: any) {
  const addToCart = manageCartStore((state) => state.addToCart)
  const defaultImage = 'https://res.cloudinary.com/drmeagmkl/image/upload/v1771962102/default_meal_kgc6mv.png'

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
      <div className="relative h-48 sm:h-56 overflow-hidden bg-muted">
        <img
          src={meal.image || defaultImage}
          alt={meal.meals_name || meal.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Optional: Add badge if meal is unavailable or special */}
        {!meal.isAvailable && (
          <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-xs font-bold">
            Out of Stock
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h2 className="text-lg font-bold text-card-foreground line-clamp-1 flex-1 pr-2" title={meal.meals_name || meal.name}>
            {meal.meals_name || meal.name}
          </h2>
        </div>
        
        {meal.provider?.restaurantName && (
           <p className="text-xs text-primary font-medium mb-2">{meal.provider.restaurantName}</p>
        )}

        <p className="text-muted-foreground text-sm line-clamp-2 flex-grow mb-4">
          {meal.description || "A delicious meal prepared with the finest ingredients."}
        </p>

        <div className="flex justify-between items-center mt-auto pt-2 border-t border-border">
          <span className="text-primary font-bold text-xl">
            ৳{meal.price}
          </span>

          <Button
            onClick={() =>
              addToCart({
                id: meal.id as string,
                mealid: meal.id as string,
                name: meal.meals_name as string,
                price: meal.price,
                restaurantName: meal.provider?.restaurantName,
                deliverycharge: meal.deliverycharge ?? 0,
                image: meal.image || defaultImage,
                isAvailable: meal.isAvailable,
                quantity: 1,
              })
            }
            disabled={!meal.isAvailable}
            className="rounded-xl shadow-sm group-hover:shadow transition-all"
            size="sm"
          >
            <ShoppingCart className="w-4 h-4 mr-1.5" />
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  )
}