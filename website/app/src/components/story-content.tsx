export function StoryContent() {
  return (
    <div className="flex flex-col gap-10">
      <h2 className="font-display text-3xl md:text-4xl font-light text-cosmic-100 tracking-wide">
        The Story
      </h2>

      <div className="flex flex-col gap-6 font-sans text-base leading-relaxed text-cosmic-300">
        <p>
          Deep within the Milky Way lies WAWA, a harmonious solar system of six
          planets orbiting a radiant yellow-green sun. Its inhabitants live
          through love, unity, and telepathic communication.
        </p>

        <p>
          When WAWA received a mysterious signal from Earth, a planet teetering
          on imbalance, they channelled energy from each planet and the sun to
          form a glowing orb of pure light. From this orb emerged AUWA.
        </p>

        <p>
          AUWA travelled to Earth and discovered a quiet forest where a lonely
          blue flower shared memories of a once-vibrant world. The light shower
          revealed the kokoro within the flower, within the surrounding
          microbes, within everything it touched.
        </p>

        <p className="font-display text-lg text-cosmic-200 italic tracking-wide">
          Four books. Four chapters of a universe ten years in the making.
          The full story will be revealed inside the experience.
        </p>
      </div>

      <div className="flex flex-col gap-3 pt-4 border-t border-cosmic-800">
        <h3 className="font-sans text-xs tracking-widest uppercase text-cosmic-500">
          Three Pillars
        </h3>
        <dl className="flex flex-col gap-4">
          <div>
            <dt className="font-display text-base text-cosmic-200">
              Yaoyorozu no Kami
            </dt>
            <dd className="font-sans text-sm text-cosmic-400 mt-1">
              The interconnectedness of all things. Spirits inhabit everything.
            </dd>
          </div>
          <div>
            <dt className="font-display text-base text-cosmic-200">
              Kido Airaku
            </dt>
            <dd className="font-sans text-sm text-cosmic-400 mt-1">
              Four fundamental emotions: Joy, Anger, Sorrow, Ease.
            </dd>
          </div>
          <div>
            <dt className="font-display text-base text-cosmic-200">
              72 Micro-Seasons
            </dt>
            <dd className="font-sans text-sm text-cosmic-400 mt-1">
              Life moves through constant change. That is natural and worth
              noticing.
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
