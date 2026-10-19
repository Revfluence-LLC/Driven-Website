import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        A GPS speedometer works out how fast you&rsquo;re moving from satellite signals instead of your
        wheels. That&rsquo;s why the same phone can measure your speed in a car, on a bike, on a boat, or in an
        airplane seat — and why it&rsquo;s often more accurate than the speedometer in your car.
      </p>

      <h2>Step 1: Finding your position</h2>
      <p>
        Navigation satellites — the US GPS constellation, plus Europe&rsquo;s Galileo, Russia&rsquo;s GLONASS,
        and China&rsquo;s BeiDou — constantly broadcast their position and a very precise time. Your phone&rsquo;s
        receiver listens for several of them at once. Because radio signals travel at a known speed, the tiny
        differences in arrival time tell the receiver how far it is from each satellite. With four or more
        satellites, it can solve for your position on Earth, usually to within a few meters.
      </p>

      <h2>Step 2: Measuring speed (the clever part)</h2>
      <p>
        You might expect a GPS speedometer to compare two positions and divide by the time between them. That
        works, but positions jump around by a few meters, so speeds calculated that way are noisy.
      </p>
      <p>
        Instead, modern receivers use the <strong>Doppler effect</strong> — the same effect that makes a siren
        sound higher-pitched as it approaches and lower as it leaves. When you move toward a satellite, its signal
        arrives at a slightly higher frequency; when you move away, slightly lower. By measuring that shift for
        several satellites, the receiver calculates your velocity directly — both speed and direction — with an
        accuracy of a few tenths of a meter per second.
      </p>
      <p>
        This is the value apps receive from the phone&rsquo;s location system. Our{" "}
        <Link href="/speedometer">online speedometer</Link> uses it when the browser provides it, and falls back to
        position-to-position calculation (with poor fixes filtered out) when it doesn&rsquo;t.
      </p>

      <h2>How accurate is GPS speed?</h2>
      <p>
        With a clear view of the sky, a phone&rsquo;s GPS speed is typically within about 1–2 mph (2–3 km/h) of
        your true speed, and usually closer at steady highway speeds. That&rsquo;s better than most car
        speedometers, which are deliberately set to read high — see{" "}
        <Link href="/guides/gps-vs-car-speedometer">GPS vs car speedometer</Link>.
      </p>

      <h3>What makes GPS speed less accurate</h3>
      <ul>
        <li><strong>Blocked sky.</strong> Tunnels, parking garages, and indoors block signals completely.</li>
        <li><strong>Urban canyons.</strong> Tall buildings reflect signals, so the receiver sees delayed copies (&ldquo;multipath&rdquo;).</li>
        <li><strong>Dense trees and heavy weather</strong> weaken signals.</li>
        <li><strong>Cold starts.</strong> For the first few seconds after you open an app, the receiver may still be locking on.</li>
        <li><strong>Phone placement.</strong> Deep in a bag or a footwell is worse than on the dashboard or in a windshield mount.</li>
        <li><strong>Very low speeds.</strong> Below walking pace, small errors are large compared with the speed, so most apps show 0.</li>
      </ul>

      <h2>Why GPS speed can lag slightly</h2>
      <p>
        Phones typically report location about once per second. Software also smooths readings so the number
        doesn&rsquo;t flicker. The result is a reading that can trail hard acceleration or braking by a second
        or so. At steady speeds you won&rsquo;t notice; during a{" "}
        <Link href="/guides/how-to-measure-0-60-time">0–60 test</Link> good apps account for it.
      </p>

      <h2>GPS speedometer vs wheel-based speedometer</h2>
      <table>
        <thead>
          <tr><th></th><th>GPS speedometer</th><th>Car / wheel speedometer</th></tr>
        </thead>
        <tbody>
          <tr><td>Measures</td><td>Movement over the ground</td><td>Wheel rotation</td></tr>
          <tr><td>Affected by tire size or wear</td><td>No</td><td>Yes</td></tr>
          <tr><td>Works in tunnels</td><td>No</td><td>Yes</td></tr>
          <tr><td>Works on bikes, boats, trains, planes</td><td>Yes</td><td>Only the vehicle it&rsquo;s built into</td></tr>
          <tr><td>Update rate</td><td>About once per second</td><td>Continuous</td></tr>
        </tbody>
      </table>

      <h2>Does a GPS speedometer use mobile data?</h2>
      <p>
        No. GPS signals are free and received directly from satellites, so speed works even with no cell signal
        and in airplane mode (where your phone allows GPS). Data is only needed for things like loading maps.
      </p>

      <h2>Getting the best reading</h2>
      <ol>
        <li>Mount your phone where it can &ldquo;see&rdquo; the sky — the dashboard or windshield is ideal.</li>
        <li>Open the speedometer a few seconds before you set off so it can lock on.</li>
        <li>Use precise location: on iPhone, check <em>Settings → Privacy &amp; Security → Location Services</em> and make sure Precise Location is on for your speedometer app or browser.</li>
        <li>Watch the accuracy indicator. Under about 15 meters is good for speed.</li>
      </ol>
      <p>
        Want to see it in action? <Link href="/speedometer">Try the free online GPS speedometer</Link>.
      </p>
    </>
  );
}
