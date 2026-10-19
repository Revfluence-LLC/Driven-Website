import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        The 0–60 mph time — how long a car takes to accelerate from a standstill to 60 mph — is the classic
        measure of performance. You can measure your own car&rsquo;s time with nothing more than your phone&rsquo;s
        GPS. Here&rsquo;s how to do it accurately and safely.
      </p>

      <h2>0–60 mph vs 0–100 km/h</h2>
      <p>
        The US and UK quote 0–60 mph; most other countries quote 0–100 km/h. They&rsquo;re close but not the
        same: 60 mph is 96.6 km/h, so a 0–100 km/h time is typically a few tenths of a second longer than the same
        car&rsquo;s 0–60 mph time. Use our <Link href="/speed-converter">speed converter</Link> for other
        speeds.
      </p>

      <h2>Why use GPS instead of a stopwatch?</h2>
      <p>
        A stopwatch relies on someone watching the car&rsquo;s speedometer, which{" "}
        <Link href="/guides/gps-vs-car-speedometer">reads a few percent high</Link> — meaning you&rsquo;d stop the
        clock before you actually reach 60. Human reaction time adds a few tenths more. A GPS timer measures true
        speed and starts automatically the moment you move.
      </p>

      <h2>How GPS 0–60 timing works</h2>
      <p>
        Phones report GPS speed about once per second. That&rsquo;s too coarse to read a 0–60 time directly from
        the nearest sample, so good apps interpolate: they estimate the exact moment you crossed each speed using the
        readings on either side. The <strong>Speedometer</strong> iPhone app does this for 0–30 mph, 0–60 mph, and
        0–100 km/h splits and keeps your personal bests.
      </p>

      <h2>Step-by-step</h2>
      <ol>
        <li>
          <strong>Choose a safe, legal place.</strong> A closed course, drag strip, or private road is ideal. Never
          test on public roads where 60 mph is unsafe or illegal, and never with other traffic or pedestrians around.
        </li>
        <li><strong>Mount your phone</strong> securely with a view of the sky. Loose phones slide under acceleration.</li>
        <li><strong>Wait for a strong GPS fix</strong> — under about 10–15 meters of accuracy.</li>
        <li><strong>Come to a complete stop</strong> and arm the timer.</li>
        <li><strong>Accelerate</strong> smoothly and fully. The timer starts when you begin moving.</li>
        <li><strong>Run it more than once</strong>, ideally in both directions on the same stretch, and average the results to cancel out slope and wind.</li>
      </ol>

      <h2>What affects your result</h2>
      <ul>
        <li><strong>Slope.</strong> Even a gentle downhill makes a big difference. Test on level ground.</li>
        <li><strong>Temperature and altitude.</strong> Engines make less power in hot air and at high altitude.</li>
        <li><strong>Tires and surface.</strong> Cold tires and dusty or wet surfaces cause wheelspin.</li>
        <li><strong>Weight.</strong> Passengers and luggage slow you down.</li>
        <li><strong>Rollout.</strong> Some magazines subtract the first foot of movement (&ldquo;one-foot rollout,&rdquo; a drag-strip convention), which makes published times a little quicker than a true standing start.</li>
        <li><strong>GPS quality.</strong> Tall buildings or trees can degrade accuracy — open areas give the best data.</li>
      </ul>

      <h2>Typical 0–60 times</h2>
      <table>
        <thead><tr><th>Vehicle type</th><th>Typical 0–60 mph</th></tr></thead>
        <tbody>
          <tr><td>Economy car</td><td>8–10 seconds</td></tr>
          <tr><td>Family SUV</td><td>7–9 seconds</td></tr>
          <tr><td>Sports sedan / hot hatch</td><td>5–6.5 seconds</td></tr>
          <tr><td>Performance EV or sports car</td><td>3–4.5 seconds</td></tr>
        </tbody>
      </table>
      <p>These are broad ranges; exact numbers vary widely by model and powertrain.</p>

      <h2>Safety first</h2>
      <p>
        Acceleration testing belongs on a closed course. Obey every speed limit, never test with passengers who
        haven&rsquo;t agreed to it, and never interact with your phone while driving.
      </p>
    </>
  );
}
