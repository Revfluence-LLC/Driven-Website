import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        A head-up display, or HUD, shows information in your line of sight so you don&rsquo;t have to look down
        at the dashboard. Many newer cars project speed onto the windshield. With the right app, your phone can do
        something similar for free.
      </p>

      <h2>What is a HUD speedometer?</h2>
      <p>
        HUDs started in fighter jets, where pilots couldn&rsquo;t afford to look down at instruments. In cars, a
        HUD projects your speed (and sometimes navigation) onto the windshield, so it appears to float over the
        road ahead. Your eyes stay up and your focus stays closer to the road.
      </p>

      <h2>How a phone becomes a HUD</h2>
      <p>
        Windshields are slightly reflective — that&rsquo;s why you can see dashboard reflections at night. A phone
        HUD uses that reflection:
      </p>
      <ol>
        <li>The app shows your speed in large, bright digits on a pure black background.</li>
        <li>The display is <strong>mirrored</strong> left to right.</li>
        <li>You lay the phone flat on the dashboard, screen facing up, below the windshield.</li>
        <li>The windshield reflects the screen and flips the mirrored digits back so they read correctly.</li>
      </ol>
      <p>
        The black background matters: black pixels give off almost no light, so only the digits reflect and the
        rest of the windshield stays clear.
      </p>

      <h2>Setting up a phone HUD</h2>
      <ol>
        <li>Open a speedometer with a HUD mode — the <Link href="/speedometer">free online speedometer</Link> has one, as does the Speedometer iPhone app.</li>
        <li>Turn on <strong>Mirror</strong>.</li>
        <li>Place the phone flat on the dashboard directly in front of you, near the base of the windshield. A non-slip dash mat helps.</li>
        <li>Adjust screen brightness so the digits are clear but not glaring.</li>
        <li>Start the speedometer before you pull away.</li>
      </ol>

      <h2>When phone HUDs work best</h2>
      <ul>
        <li><strong>At night and at dusk</strong> — the reflection is bright and crisp.</li>
        <li><strong>On overcast days</strong> — usually visible, though fainter.</li>
        <li><strong>In bright sunshine</strong> — often hard to see. Use the normal speedometer view instead.</li>
      </ul>

      <h3>Why you might see a double image</h3>
      <p>
        Windshields are two layers of glass, and each reflects. Some cars have special HUD-compatible windshields
        that prevent this; most don&rsquo;t, so a faint &ldquo;ghost&rdquo; image is normal. Lowering brightness
        reduces it.
      </p>

      <h2>Phone HUD vs a built-in HUD</h2>
      <table>
        <thead><tr><th></th><th>Phone HUD</th><th>Built-in / add-on HUD</th></tr></thead>
        <tbody>
          <tr><td>Cost</td><td>Free or low-cost app</td><td>Factory option or extra hardware</td></tr>
          <tr><td>Daytime visibility</td><td>Limited in bright sun</td><td>Designed for daylight</td></tr>
          <tr><td>Speed source</td><td>GPS</td><td>Car sensors (or GPS for add-ons)</td></tr>
          <tr><td>Works in any car</td><td>Yes</td><td>Only cars that have one</td></tr>
        </tbody>
      </table>

      <h2>Safety tips</h2>
      <ul>
        <li>Make sure the phone can&rsquo;t slide; never let it block your view of the road.</li>
        <li>Set up the HUD before driving. Don&rsquo;t adjust it while moving.</li>
        <li>Phones get hot in direct sun on a dashboard. Remove it when you park.</li>
        <li>Check local laws — some places restrict objects on the dashboard or windshield.</li>
      </ul>
      <p>
        Curious how the speed itself is measured? Read{" "}
        <Link href="/guides/how-does-a-gps-speedometer-work">how a GPS speedometer works</Link>.
      </p>
    </>
  );
}
