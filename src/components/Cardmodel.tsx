"use client";
import { manageCartStore } from "@/store/CartStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SHEET_SIDES = ["right"] as const;

function CartBadge({ count }: { count: number }) {
  return (
    <span
      className={`absolute -top-2 -right-2 flex items-center justify-center rounded-full bg-primary text-primary-foreground w-5 h-5 text-xs font-bold transition-opacity ${
        count === 0 ? "opacity-0" : "opacity-100"
      }`}
      aria-live="polite"
    >
      {count > 0 ? count : null}
    </span>
  );
}

export function CartModal() {
  const {
    cart,
    increase,
    decrease,
    removeFromCart,
    clearCart,
    getSubtotal,
    getDeliveryCharge,
  } = manageCartStore();
  const router = useRouter();

  const subtotal = getSubtotal();

  return (
    <div className="flex items-center gap-2">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open cart"
              className="relative"
            >
              <span className="text-2xl">🛒</span>
              <CartBadge count={cart.length} />
            </Button>
          </SheetTrigger>
          <SheetContent
            side={side}
            className="w-full max-w-full sm:w-[400px] bg-card border-l border-border px-0 flex flex-col"
          >
            <SheetHeader className="sticky top-0 z-10 border-b border-border bg-card px-6 py-4">
              <SheetTitle className="text-lg font-semibold text-card-foreground">
                Cart
              </SheetTitle>
              <SheetDescription asChild>
                <p className="text-muted-foreground text-sm">
                  Your selected meals and order summary.
                </p>
              </SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <AnimatePresence>
                {cart.length === 0 && (
                  <motion.div
                    key="empty-cart"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center text-muted-foreground py-12"
                  >
                    <span className="text-4xl mb-2">🛒</span>
                    <span>No items added.</span>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex flex-col gap-6">
                {cart.map((item) => {
                  const restaurantName =
                    (item as any).restaurantName ||
                    (item as any).provider?.restaurantName ||
                    (item as any).resturantName ||
                    (item as any).restaurant_name;
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-xl bg-card border border-border flex gap-6 p-4 min-h-[110px] items-stretch"
                    >
                      <div className="flex-shrink-0 flex items-center">
                        <div className="aspect-square w-16 h-16 rounded-lg bg-input flex items-center justify-center overflow-hidden border border-border">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name || "Meal image"}
                              width={64}
                              height={64}
                              className="object-cover w-full h-full rounded-lg"
                              priority={false}
                            />
                          ) : (
                            <span className="text-muted-foreground text-2xl">🍽️</span>
                          )}
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-semibold text-foreground text-base truncate leading-tight" title={item.name}>
                              {item.name}
                            </h3>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              aria-label="Remove item"
                              className="ml-2 text-muted-foreground hover:text-destructive focus:outline-none transition-colors"
                              tabIndex={0}
                            >
                              <span className="text-lg leading-none">&times;</span>
                            </button>
                          </div>
                          <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground mt-1">
                            <span>Meal ID:</span>
                            <span className="font-mono tracking-tight text-foreground">{item.id}</span>
                          </div>
                          <div className="text-xs mt-1 text-muted-foreground">
                            <span className="font-medium">Restaurant:</span>{" "}
                            {restaurantName || "Unknown"}
                          </div>
                        </div>
                        <div className="flex flex-row items-end gap-4 mt-2 justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="secondary"
                              size="icon"
                              className="w-8 h-8"
                              aria-label={`Decrease quantity of ${item.name}`}
                              onClick={() => decrease(item.id)}
                              disabled={item.quantity <= 1}
                            >
                              <span className="font-bold">–</span>
                            </Button>
                            <span className="text-sm font-medium text-foreground min-w-[26px] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="secondary"
                              size="icon"
                              className="w-8 h-8"
                              aria-label={`Increase quantity of ${item.name}`}
                              onClick={() => increase(item.id)}
                            >
                              <span className="font-bold">+</span>
                            </Button>
                          </div>
                          <div className="text-sm text-right font-semibold text-foreground min-w-[64px]">
                            ৳ {(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <span>Delivery:</span>
                          <span className="font-mono text-foreground">
                            ৳ {getDeliveryCharge().toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              {cart.length > 0 && (
                <div className="mt-8 border-t border-border pt-4 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold text-foreground">
                      ৳ {subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="font-semibold text-foreground">
                      ৳ {getDeliveryCharge().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-2">
                    <span className="text-primary font-semibold">Total</span>
                    <span className="text-primary font-bold text-lg">
                      ৳ {(subtotal + getDeliveryCharge()).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <SheetFooter className="sticky bottom-0 left-0 right-0 bg-card px-6 py-4 border-t border-border z-10 flex flex-col gap-4">
              <div className="flex items-center w-full gap-4">
                <Button
                  onClick={clearCart}
                  variant="secondary"
                  className="flex-1 h-12 rounded-full font-semibold text-base shadow-none transition"
                  disabled={cart.length === 0}
                  aria-label="Clear cart"
                >
                  Clear Cart
                </Button>
                <Button
                  variant="default"
                  className="flex-1 h-12 rounded-full font-semibold text-base shadow-none transition"
                  onClick={() => router.push("/checkout")}
                  disabled={cart.length === 0}
                  aria-label="Go to checkout"
                >
                  Checkout
                </Button>
              </div>
              <Button
                variant="ghost"
                className="w-full rounded-full border border-border mt-1 text-base font-medium py-2 h-12"
                onClick={() => router.push("/cart")}
                disabled={cart.length === 0}
                aria-label="View full cart"
              >
                View Cart
              </Button>
              <SheetClose asChild>
                <Button
                  variant="secondary"
                  className="w-full rounded-full mt-1 text-base font-medium py-2 h-12 mb-1 border border-border"
                  aria-label="Close cart"
                >
                  Close
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
