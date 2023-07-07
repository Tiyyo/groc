import { prisma } from "~/service/db.server"

export async function getRecipesByUser(authorId: number) {
    try {
        const recipes = await prisma.recipes.findMany({
            where: {
                author_id: authorId
            },
            include: {
                author: true,
                macro_recipe: true,
                measures: {
                    include: {
                        ingredient: {
                            include: {
                                macros: true,
                                icon: true,
                            }
                        },
                        unit_measure: true,
                    }
                },
                difficulty: true,
                reviews: {
                    where: {
                        author_id: authorId
                    },
                },
                instructions: {
                    include: {
                        instructions: true
                    }
                },
                image: {
                    select: {
                        link: true
                    }
                },
                tags: {
                    include: {
                        tag: true
                    }
                }
            }
        })
        if (!recipes) {
            throw new Error("Can't find item with associated id");
        }
        const result = recipes.map((recipe) => {
            return { ...recipe, tags: recipe.tags.map((tag) => tag.tag.name) }
        })
        return result
    } catch (error) {
        console.log(error);
    }
}

export async function getFavoriteRecipes(authorId: number) {
    try {
        const favoriteRecipes = await prisma.recipes.findMany({
            where: {
                reviews: {
                    some: {
                        is_liked: true,
                        author_id: authorId
                    },
                }
            },
            include: {
                reviews: true,
                macro_recipe: true,
                image: {
                    select: {
                        link: true
                    }
                },
            }
        })
        return favoriteRecipes
    } catch (error) {
        console.log(error);
    }
}

export async function getRecipesByTags(tags: string[]) {

    const tagsQuery = tags.map((tag: string) => {
        return {
            tag: {
                name: tag.toLowerCase()
            }
        }
    })

    try {
        const rawResult = await prisma.recipesOnTags.findMany({
            where: {
                OR: tagsQuery
            },
            include: {
                recipe: {
                    include: {
                        macro_recipe: true,
                        image: {
                            select: {
                                link: true
                            }
                        },
                        reviews: true,
                        tags: {
                            include : {
                                tag: true
                            }
                        }
                    }
                },
                
            }
        })

        if (!rawResult) {
            throw new Error("Can't find item with associated id");
        }
        const recipes = rawResult.map((r) => {
            return{ ...r.recipe , tags: r.recipe.tags.map((tag) => tag.tag.name)}
        })
        return recipes
    } catch (error) {
        console.log(error);
    }
}




