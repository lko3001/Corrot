export default function Hero({
  title,
  paragraph,
}: {
  title: string;
  paragraph: string;
}) {
  return (
    <header className="bg-emerald-300 py-20 px-10 text-center @lg:bg-amber-300">
      <h1 className="text-4xl font-black text-black mb-3">
        {title || "Insert Title"}
      </h1>
      <p className="text-black max-w-xl mx-auto text-center">
        {paragraph ||
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, delectus. Velit nobis nesciunt praesentium expedita veritatis voluptatum vel inventore itaque."}
      </p>
    </header>
  );
}

export const HeroFields: string[] = ["title", "paragraph"];
