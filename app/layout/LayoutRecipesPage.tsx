import TitleLevel1 from "~/components/title/TitleLevel1";

export default function LayoutRecipePages({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="mx-auto flex flex-col max-w-[1325px]">
      <img
        src="/images/banner_recipe_page.webp"
        alt=""
        className="rounded-md"
      />
      <TitleLevel1 title={title} />
      {children}
    </div>
  );
}
