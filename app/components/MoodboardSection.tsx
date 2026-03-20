import Image from "next/image";
import moodboardImage from "@/public/assets/WhatsApp_Image_2026-03-18_at_1_37_02_AM.jpeg";

export default function MoodboardSection() {
  return (
    <section className="section moodboard-section">
      <div className="moodboard-shell">
        <Image
          src={moodboardImage}
          alt="Moodboard Escapada Vol I"
          sizes="100vw"
          placeholder="blur"
          className="moodboard-single-image"
        />
      </div>
    </section>
  );
}
