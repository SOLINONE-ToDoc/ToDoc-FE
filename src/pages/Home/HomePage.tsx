import { MapPreview } from "@/shared/ui/Map";

export const HomePage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-hero-1 text-content-primary">
        home
      </p>
      <div className="w-full max-w-[600px] px-4">
        <MapPreview
          lat={37.5665}
          lng={126.9780}
        />
      </div>
    </main>
  );
};
