import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        iPhone doesn&rsquo;t come with a built-in speedometer app, but its GPS can measure your speed very
        accurately. Here are four ways to see how fast you&rsquo;re going, from zero-install to fully featured.
      </p>

      <h2>1. Use a free online speedometer in Safari (no download)</h2>
      <p>The quickest option, and it costs nothing:</p>
      <ol>
        <li>Open <Link href="/speedometer">trydriven.app/speedometer</Link> in Safari.</li>
        <li>Tap <strong>Start speedometer</strong>.</li>
        <li>When Safari asks to use your location, tap <strong>Allow</strong>.</li>
        <li>Wait a few seconds outdoors for a GPS fix. Your speed appears in mph, km/h, or knots.</li>
      </ol>
      <p>
        It also shows max speed, average speed, distance, and a full-screen HUD mode. The limitation: Safari
        pauses location when the screen locks or you switch apps, so it&rsquo;s best for quick checks rather
        than long trips.
      </p>
      <p>
        <strong>If location doesn&rsquo;t work:</strong> go to <em>Settings → Privacy &amp; Security → Location
        Services</em>, make sure Location Services is on, then find <em>Safari Websites</em> and choose{" "}
        <em>While Using the App</em>.
      </p>

      <h2>2. Use a navigation app</h2>
      <p>
        Some navigation apps, such as Google Maps and Waze, can display your current speed during turn-by-turn
        navigation once you turn the option on in their settings. It works, but the speed is a small number in
        the corner, and you generally have to be navigating to a destination to see it.
      </p>

      <h2>3. Use a dedicated speedometer app</h2>
      <p>
        A speedometer app is built around the speed readout, so it&rsquo;s bigger, clearer, and does more. The{" "}
        <strong>Speedometer: Speed Monitor</strong> app for iPhone, for example, offers:
      </p>
      <ul>
        <li>Large digital or analog speedometer in mph, km/h, or knots</li>
        <li>Driving, cycling, on-foot, and boating modes</li>
        <li>A mirrored <Link href="/guides/hud-speedometer">windshield HUD</Link></li>
        <li>Speed alerts by vibration or voice</li>
        <li>Automatic trip recording in the background, with route maps and stats</li>
        <li>A GPS <Link href="/guides/how-to-measure-0-60-time">0–60 mph timer</Link></li>
        <li>Odometer and trip history that stay on your phone — no account needed</li>
      </ul>

      <h2>4. Use CarPlay or your car&rsquo;s display</h2>
      <p>
        If your car has CarPlay, the car&rsquo;s own instrument cluster remains the main speed reading. Keep in
        mind that car speedometers{" "}
        <Link href="/guides/gps-vs-car-speedometer">usually read a few percent high</Link>, so a GPS reading on your
        iPhone is a useful cross-check.
      </p>

      <h2>Tips for an accurate reading on iPhone</h2>
      <ul>
        <li>
          <strong>Turn on Precise Location</strong> for your speedometer app or Safari Websites (<em>Settings →
          Privacy &amp; Security → Location Services</em>). Approximate location isn&rsquo;t accurate enough for
          speed.
        </li>
        <li><strong>Give it a view of the sky.</strong> A dashboard or windshield mount works best.</li>
        <li><strong>Start it before you move</strong> so the GPS has time to lock on.</li>
        <li><strong>Expect gaps in tunnels and garages</strong> — GPS can&rsquo;t reach there.</li>
      </ul>

      <h2>Stay safe</h2>
      <p>
        Put your iPhone in a mount, set everything up before you drive, and don&rsquo;t touch it while the car
        is moving. Follow your local laws on phone use behind the wheel.
      </p>
    </>
  );
}
