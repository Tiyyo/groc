import LikeIcon from "~/assets/icons/Like";
import type { RecipeCardProps } from "./interface";
import { Link } from "@remix-run/react";

export default function RecipeCard({
  imageLink,
  recipeName,
  recipeCalories,
  recipeId,
  isLiked,
  variant,
  tags,
}: RecipeCardProps) {
  return (
    <div
      className={`flex border p-2 bg-main-100 shadow-md ${
        variant === "horizontal"
          ? "h-52 aspect-2/1"
          : " flex-col h-72 w-48 min-w-[170px]"
      }`}
    >
      <div
        className={`${
          variant === "horizontal" ? "aspect-square basis-1/3" : ""
        }`}
      >
        <Link to={`/home/recipe/${recipeId}`}>
          {imageLink && (
            <img src={imageLink} alt={recipeName} className="rounded-md" />
          )}
        </Link>
      </div>
      <div
        className={` flex flex-col h-full ${
          variant === "horizontal" ? "p-2 basis-2/3" : " justify-between pt-1"
        }`}
      >
        <div
          className={`font-semibold text-10 ${
            variant === "horizontal" ? "min-h-12" : ""
          }`}
        >
          {recipeName}
        </div>
        {variant === "horizontal" && tags && tags.length > 0 && (
          <div className="mt-4 text-8 opacity-80 flex-grow">
            {tags.map((tag: string) => {
              return (
                <span className="capitalize">
                  {" "}
                  {tag}
                  {""}
                </span>
              );
            })}
          </div>
        )}
        <div className="flex justify-between items-center">
          <div className="text-8 opacity-80">
            {recipeCalories && Number(recipeCalories).toFixed(0)}kcal
          </div>
          <div className="">
            {isLiked ? (
              <LikeIcon size="5" fill={true} />
            ) : (
              <LikeIcon size="5" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
