export function AboutContent() {
  return (
    <div className="flex flex-col gap-10">
      <h2 className="font-display text-3xl md:text-4xl font-light text-cosmic-100 tracking-wide">
        About AUWA
      </h2>

      <div className="flex flex-col gap-6 font-sans text-base leading-relaxed text-cosmic-300">
        <p>
          AUWA is a cosmic being from the solar system WAWA, sent to Earth to
          reveal the kokoro within all living things. Through a magical light
          shower, AUWA illuminates what lives beneath the surface.
        </p>

        <p>
          The universe was created by Japanese illustrator Rieko Maeda over a
          decade of quiet, dedicated work. Four illustrated books. Three pillars
          of Japanese philosophy. One vision: that emotional intelligence
          matters more than ever in a world where cognitive work is being
          handled by machines.
        </p>

        <p>
          AUWA is now becoming a daily EQ practice, combining the Kido Airaku
          emotional framework with AI to help you notice how you feel, name it
          precisely, and observe your patterns over time.
        </p>

        <p className="text-cosmic-400 text-sm tracking-wide pt-4 border-t border-cosmic-800">
          AUWA does not fix. AUWA reveals.
        </p>
      </div>
    </div>
  );
}
