import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RecipeCards({ recipes }) {
  if (!recipes) {
    return (
      <div className="flex justify-center items-center h-[80vh] w-[80vw] ">
        <div
          className="animate-spin size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-8 w-[90vw] lg:w-[80vw]">
      <h1 className="text-3xl font-bold mb-8">Our Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative h-48">
                <Image
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.name}
                  fill
                  className="object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="mb-2">{recipe.name}</CardTitle>
              <p className="text-sm text-gray-600 line-clamp-2">
                {recipe.description}
              </p>
            </CardContent>
            <CardFooter className="p-4">
              <Link href={`/${recipe.id}`} passHref>
                <Button className="w-full">View More</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
