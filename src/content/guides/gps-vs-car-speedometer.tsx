import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        Open a GPS speedometer on your phone while driving and you&rsquo;ll probably notice it shows a slightly
        lower number than your car. Your car reads 70 mph; your phone says 67. That isn&rsquo;t a fault —
        it&rsquo;s mostly by design.
      </p>

      <h2>The short answer</h2>
      <p>
        Car speedometers are built to read <strong>at or above</strong> your true speed, never below it. A GPS
        speedometer measures your actual movement over the ground, so in good conditions it&rsquo;s the more
        accurate of the two.
      </p>

      <h2>Why car speedometers read high</h2>

      <h3>1. Regulations forbid reading low</h3>
      <p>
        In the European Union, the UK, and many other countries, cars must meet UN ECE Regulation 39. It says a
        speedometer may never show less than the true speed, and may show more by up to 10% plus 4 km/h. At a true
        100 km/h, a speedometer can legally display anything from 100 to 114 km/h.
      </p>
      <p>
        US federal rules don&rsquo;t set a specific accuracy tolerance, but because cars are designed for global
        markets, manufacturers generally calibrate them the same way: reading slightly high is safe; reading low
        could get drivers tickets.
      </p>

      <h3>2. Tire size and wear</h3>
      <p>
        A car speedometer counts wheel rotations and assumes each one covers a fixed distance. Anything that
        changes the tire&rsquo;s rolling circumference changes the reading:
      </p>
      <ul>
        <li><strong>Worn tires</strong> are smaller, so each turn covers less ground — the speedometer reads slightly higher.</li>
        <li><strong>Larger or aftermarket wheels and tires</strong> cover more ground per turn — the speedometer can read <em>lower</em> than true speed, which is the risky direction.</li>
        <li><strong>Low tire pressure</strong> slightly shrinks the effective radius.</li>
      </ul>

      <h3>3. Gauge design</h3>
      <p>
        Analog needles have limited resolution, and some manufacturers add a few percent of deliberate margin on
        top of the tolerance.
      </p>

      <h2>How big is the difference?</h2>
      <p>
        It varies by car, but a reading 2–5% high is common. Here&rsquo;s what that looks like:
      </p>
      <table>
        <thead>
          <tr><th>Car shows</th><th>True speed if 3% high</th><th>True speed if 5% high</th></tr>
        </thead>
        <tbody>
          <tr><td>30 mph</td><td>29.1 mph</td><td>28.6 mph</td></tr>
          <tr><td>50 mph</td><td>48.5 mph</td><td>47.6 mph</td></tr>
          <tr><td>70 mph</td><td>68.0 mph</td><td>66.7 mph</td></tr>
          <tr><td>80 mph</td><td>77.7 mph</td><td>76.2 mph</td></tr>
        </tbody>
      </table>

      <h2>So which one should you trust?</h2>
      <ul>
        <li><strong>In open sky at a steady speed:</strong> GPS is usually closer to your true speed.</li>
        <li><strong>In tunnels, garages, and dense city centers:</strong> trust the car. GPS can lose signal or jump.</li>
        <li><strong>For staying under the limit:</strong> following your car&rsquo;s speedometer keeps you on the safe side, because it reads high.</li>
        <li><strong>After changing wheel or tire size:</strong> compare with GPS — your car may now be reading low.</li>
      </ul>

      <h2>How to check your own car&rsquo;s speedometer</h2>
      <ol>
        <li>Mount your phone securely with a view of the sky — or ask a passenger to hold it.</li>
        <li>Open the <Link href="/speedometer">free online speedometer</Link> or a GPS speedometer app and wait for a good GPS fix.</li>
        <li>On a straight, open road, hold a steady speed using cruise control (for example 30, 50, and 70 mph).</li>
        <li>Note both readings at each speed. The percentage difference is your car&rsquo;s error.</li>
      </ol>
      <p>
        Never look at or touch your phone while driving — set everything up first, or let a passenger read it.
      </p>

      <h2>Why GPS can be wrong too</h2>
      <p>
        GPS isn&rsquo;t perfect. It needs a clear view of the sky, updates about once per second, and can
        lag during hard acceleration. Read more in{" "}
        <Link href="/guides/how-does-a-gps-speedometer-work">how a GPS speedometer works</Link>.
      </p>
    </>
  );
}
