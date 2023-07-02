import { prisma } from "~/service/db.server"

export async function getRecipesByUser(authorId : number) {
    try {
        const recipes = await prisma.recipes.findMany({
            where : {
                author_id : authorId
            },
            include : {
                author : true,
                macro_recipe : true,
                measures : {
                    include : {
                        ingredient : {
                            include : {
                                macros : true,
                                icon : true,
                            }
                        } ,
                        unit_measure : true,
                    }
                },
                difficulty : true,
                reviews : true,
                instructions : {
                    include: {
                        instructions : true
                    }
                },
                image : {
                    select : {
                        link : true
                    }
                },
                tags : {
                    include : {
                        tag : true
                    }
                }
            }
        })
        if(!recipes){
            throw new Error("Can't find item with associated id");   
        }
        const result = recipes.map((recipe) => {
            return {...recipe, tags : recipe.tags.map((tag) => tag.tag.name)}
        })
        return result
    } catch (error) {
        console.log(error);
    }
}

export async function getFavoriteRecipes(recipeId : number) {
        try {
            const favoriteRecipes = await prisma.recipes.findMany({
                where : {
                    reviews : {
                        some : {
                            is_liked : true
                        },
                    }
                },
                include : {
                    reviews : true,
                    macro_recipe : true,
                    image : {
                        select : {
                            link : true
                        }
                    },
                }
            })
            console.log(favoriteRecipes);
            return favoriteRecipes
        } catch (error) {
            console.log(error);
        }
}