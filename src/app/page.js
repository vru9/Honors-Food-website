"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import RecipeCards from "@/components/recipeCards";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [recipes, setRecipes] = useState(null);
  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await axios.get('https://dummyjson.com/recipes');
      setRecipes(response.data);
    };
    fetchRecipes();
  });
  // console.log(recipes?.recipes);
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "13rem",
        "--sidebar-width-mobile": "20rem",
      }}
    >
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <div className="px-5 ">
          <RecipeCards recipes={recipes?.recipes} />
        </div>
      </main>
    </SidebarProvider>
  );
}
