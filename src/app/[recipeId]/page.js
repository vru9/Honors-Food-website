"use client"
import Image from "next/image";
import { Clock, Users, ChefHat, Flame, Star, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useState , useEffect } from "react";
import axios from "axios";

function StarRating({ rating }) {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= Math.round(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function RecipePage({ params }) {
  const [recipe, setRecipe] = useState(null);
  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await axios.get(
        "https://dummyjson.com/recipes/" + params.recipeId
      );
      setRecipe(response.data);
    };
    fetchRecipe();
  });

  if (!recipe) {
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
    <>
      <div>
        <Link href="/">
          <div className="flex items-center text-gray-600 mt-4 ml-8 gap-1 font-bold text-xl">
            <ArrowLeft /> Home
          </div>
        </Link>
      </div>
      <div className="container mx-auto p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
              <Image
                src={recipe.image || "/placeholder.svg"}
                alt={recipe.name}
                fill
                className="object-cover"
              />
            </div>
            <h1 className="text-3xl font-bold mb-2">{recipe.name}</h1>
            <div className="flex items-center mb-4">
              <StarRating rating={recipe.rating} />
              <span className="ml-2 text-sm text-gray-600">
                ({recipe.reviewCount} reviews)
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {recipe.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-gray-600" />
                <span className="text-sm">
                  {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
                </span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-gray-600" />
                <span className="text-sm">{recipe.servings} servings</span>
              </div>
              <div className="flex items-center">
                <ChefHat className="w-5 h-5 mr-2 text-gray-600" />
                <span className="text-sm">{recipe.difficulty}</span>
              </div>
              <div className="flex items-center">
                <Flame className="w-5 h-5 mr-2 text-gray-600" />
                <span className="text-sm">
                  {recipe.caloriesPerServing} cal/serving
                </span>
              </div>
            </div>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Ingredients</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
        <Separator className="my-8" />
        <Card>
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-5 space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
