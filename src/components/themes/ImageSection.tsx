export default function ImageSection({ url }: { url: string }) {
  return (
    <div className="bg-red-500 @4xl:bg-blue-500">
      <img
        src={
          url ||
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
        }
        className="@md:aspect-video @md:w-full @md:object-cover"
      />
    </div>
  );
}

export const ImageSectionFields = ["url"];
