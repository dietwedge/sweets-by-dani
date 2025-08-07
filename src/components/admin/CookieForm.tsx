import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Cookie } from "@/data/mock-cookies";

const cookieFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  price: z.coerce.number().min(0.01, { message: "Price must be greater than 0." }),
  imageUrl: z.string().url({ message: "Must be a valid URL." }).default("/placeholder.svg"),
  isFeatured: z.boolean().default(false),
  isAvailable: z.boolean().default(true),
  ingredients: z.string().min(1, { message: "Ingredients cannot be empty." }),
  allergens: z.string().default(""),
});

type CookieFormValues = z.infer<typeof cookieFormSchema>;

interface CookieFormProps {
  initialData?: Cookie | null;
  onSubmit: (data: Cookie | Omit<Cookie, 'id'>) => void;
  onCancel: () => void;
}

const CookieForm: React.FC<CookieFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const form = useForm<CookieFormValues>({
    resolver: zodResolver(cookieFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price || 0.01,
      imageUrl: initialData?.imageUrl || "/placeholder.svg",
      isFeatured: initialData?.isFeatured || false,
      isAvailable: initialData?.isAvailable || true,
      ingredients: initialData?.ingredients.join(", ") || "",
      allergens: initialData?.allergens.join(", ") || "",
    },
  });

  const handleSubmit = (values: CookieFormValues) => {
    const cookieToSubmit: Cookie | Omit<Cookie, 'id'> = {
      ...values,
      ingredients: values.ingredients.split(",").map(s => s.trim()).filter(s => s.length > 0),
      allergens: values.allergens.split(",").map(s => s.trim()).filter(s => s.length > 0),
    };

    if (initialData) {
      // If initialData exists, it's an edit operation, so include the ID
      onSubmit({ ...cookieToSubmit, id: initialData.id } as Cookie);
    } else {
      // Otherwise, it's an add operation, omit the ID
      onSubmit(cookieToSubmit as Omit<Cookie, 'id'>);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Chocolate Chip" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="A delicious cookie..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="/placeholder.svg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingredients (comma-separated)</FormLabel>
              <FormControl>
                <Input placeholder="Flour, Sugar, Eggs" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="allergens"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allergens (comma-separated)</FormLabel>
              <FormControl>
                <Input placeholder="Gluten, Dairy" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isFeatured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Featured Product</FormLabel>
                <FormDescription>
                  Display this cookie on the homepage.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isAvailable"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Available for Purchase</FormLabel>
                <FormDescription>
                  Allow customers to add this cookie to their cart.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">{initialData ? "Save Changes" : "Add Cookie"}</Button>
        </div>
      </form>
    </Form>
  );
};

export default CookieForm;