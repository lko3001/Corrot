export default function ImageSection() {
  return (
    <div className="bg-red-500 @4xl:bg-blue-500">
      <img
        src="https://unsplash.it/500/500"
        className="@md:aspect-video @md:w-full @md:object-cover"
      />
    </div>
  );
}
