'use client'

import { updatecategory } from "@/actions/category";
import { useState } from "react";
import { toast } from "react-toastify";
import { FieldError } from "../../ui/field";
import { UpdateCategory } from "@/validations/category.schema";
import { IUpdateCategory } from "@/types/category";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Categoryupdate = ({ categoryid }: { categoryid: string }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [categorydata, setcategorydata] = useState<IUpdateCategory>({});
  const [loading, setLoading] = useState<boolean>(false);
  const parsedata = UpdateCategory.safeParse(categorydata);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Updating category...");
    const data = await updatecategory(categoryid, parsedata.data!);
  
    if (data.error || !data.success) {
      toast.dismiss(toastId);
      toast.error(data?.message || "Failed to update category");
      setLoading(false);
      return;
    } else {
      toast.dismiss(toastId);
      toast.success("Category updated successfully");
      setcategorydata({});
      setPreview(null);
      setLoading(false);
    }
  };

  return (
    <div className="text-foreground flex items-center justify-center">
      <div className="container max-w-[480px] py-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Card className="bg-card text-card-foreground shadow-xl rounded-2xl px-6 py-8">
            <CardContent className="p-0">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
                autoComplete="off"
                aria-label="Update Category Form"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-foreground"
                    >
                      Category Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter category name"
                      autoComplete="off"
                      value={categorydata.name || ""}
                      onChange={e =>
                        setcategorydata({ ...categorydata, name: e.target.value })
                      }
                      className="bg-input border-border focus-visible:ring-ring"
                      aria-invalid={
                        !parsedata.success && !!parsedata.error?.issues.find(issue => issue.path[0] === "name")
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="image"
                      className="text-sm font-medium text-foreground"
                    >
                      Upload Image
                    </Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      className="bg-input border-border focus-visible:ring-ring"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 1 * 1024 * 1024) {
                            toast.error("Image size must be less than 1MB!");
                            e.target.value = "";
                            setcategorydata(prev => ({
                              ...prev,
                              image: undefined,
                            }));
                            setPreview(null);
                            return;
                          }
                          setcategorydata(prev => ({
                            ...prev,
                            image: file,
                          }));
                          setPreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                    <AnimatePresence>
                      {preview && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-center justify-center mt-2">
                            <div className="relative rounded-lg overflow-hidden w-32 h-32 bg-muted">
                              <Image
                                src={preview}
                                alt="Preview"
                                fill
                                style={{ objectFit: "cover" }}
                                className="rounded-lg"
                                sizes="128px"
                                priority={false}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {!parsedata.success && parsedata.error && (
                  <div className="mt-2">
                    <FieldError errors={parsedata.error.issues} />
                  </div>
                )}

                <Button
                  type="submit"
                
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                   "updating..."
                  ) : (
                    "Update"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Categoryupdate;
