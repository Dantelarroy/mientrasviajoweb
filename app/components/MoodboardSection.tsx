import Image from "next/image";

export default function MoodboardSection() {
  return (
    <section className="section moodboard-section">
      <div className="moodboard-shell">
        <Image
          src="/assets/WhatsApp_Image_2026-03-18_at_1_37_02_AM.jpeg"
          alt="Moodboard Escapada Vol I"
          width={1600}
          height={2000}
          sizes="100vw"
          className="moodboard-single-image"
        />
      </div>
    </section>
  );
}
