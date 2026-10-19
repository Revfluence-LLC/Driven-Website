import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Every car has a speedometer, so it&rsquo;s fair to ask why anyone would want one on their phone. The
        answer is that a speedometer app does more than repeat the number on your dashboard — and it works
        anywhere you move, not just in a car.
      </p>

      <h2>1. Get a second, independent reading</h2>
      <p>
        Car speedometers are designed to read high, and the error grows with worn or non-standard tires. A
        GPS-based app measures your real speed over the ground, so you can find out exactly how far off your
        car is. <Link href="/guides/gps-vs-car-speedometer">Here&rsquo;s why they differ</Link>.
      </p>

      <h2>2. Use it on a bike, on foot, or on the water</h2>
      <p>
        Bikes, e-scooters, skateboards, kayaks, and most boats don&rsquo;t have a reliable speedometer. A phone
        does. Good apps offer modes for cycling, running, and boating, with sensible scales and units — including
        knots for the water.
      </p>

      <h2>3. A bigger, clearer display</h2>
      <p>
        Some dashboards hide the speed in a small digital readout or a crowded instrument cluster. A
        speedometer app can show huge, high-contrast digits, an analog dial, or a minimal readout that&rsquo;s
        easy to see at a glance.
      </p>

      <h2>4. Head-up display (HUD) at night</h2>
      <p>
        HUD mode mirrors the display so that, with your phone flat on the dashboard, your speed reflects in the
        windshield — in your line of sight, the way premium cars do it. Learn how in our{" "}
        <Link href="/guides/hud-speedometer">HUD speedometer guide</Link>.
      </p>

      <h2>5. Speed alerts</h2>
      <p>
        Set a limit and get a sound or vibration when you go over it. It&rsquo;s a simple way to stay under the
        limit in school zones, on unfamiliar roads, or when towing — and to help new drivers build good habits.
      </p>

      <h2>6. Automatic trip history</h2>
      <p>
        A dashboard forgets everything when you turn off the engine. A speedometer app can record each trip
        automatically — route map, distance, duration, average and top speed — so you can look back at a road
        trip, log business mileage, or see how your commute changes.
      </p>

      <h2>7. Performance testing</h2>
      <p>
        Curious how quick your car really is? A GPS app can time 0–60 mph (or 0–100 km/h) far more accurately
        than a stopwatch. See <Link href="/guides/how-to-measure-0-60-time">how to measure your 0–60 time</Link>.
      </p>

      <h2>8. Backup for older, rental, or broken vehicles</h2>
      <p>
        Older cars, classic cars, golf carts, farm vehicles, and cars with a failed speedometer cable or sensor
        all benefit from a reliable backup. So do rentals that display a unit you aren&rsquo;t used to.
      </p>

      <h2>What to look for in a speedometer app</h2>
      <ul>
        <li><strong>Accuracy</strong> — uses the phone&rsquo;s Doppler GPS speed, with an accuracy indicator.</li>
        <li><strong>Units</strong> — mph, km/h, and knots.</li>
        <li><strong>Readable design</strong> — big digits, dark interface, digital and analog options.</li>
        <li><strong>HUD mode</strong> with a mirrored display.</li>
        <li><strong>Speed alerts</strong> you can set quickly.</li>
        <li><strong>Background trip recording</strong> that starts on its own.</li>
        <li><strong>Privacy</strong> — ideally trips stay on your phone, with no account required.</li>
      </ul>

      <h2>Try it free</h2>
      <p>
        Want to see what a speedometer app can do before installing anything?{" "}
        <Link href="/speedometer">Open the free online speedometer</Link> in your phone&rsquo;s browser. When
        you want background trip recording, HUD, speed alerts, and a 0–60 timer on your iPhone, get the
        Speedometer app.
      </p>
      <p>
        <em>Whatever you use, mount your phone and set it up before driving. Don&rsquo;t interact with it while the
        car is moving.</em>
      </p>
    </>
  );
}
