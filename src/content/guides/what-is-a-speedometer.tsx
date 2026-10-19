import Link from "next/link";

export default function Article() {
  return (
    <>
      <p className="lead">
        A speedometer is an instrument that shows how fast a vehicle — or a person — is moving at this moment. In
        a car it&rsquo;s the dial or digital number right behind the steering wheel. On a phone it can be an app
        or even a web page. Whatever form it takes, it answers one question: <em>how fast am I going right now?</em>
      </p>

      <h2>What a speedometer measures</h2>
      <p>
        Speed is distance traveled divided by the time it took. A speedometer shows your{" "}
        <strong>instantaneous speed</strong> — your speed over the last fraction of a second — rather than your
        average speed for a whole journey. It&rsquo;s usually shown in miles per hour (mph) in the US and UK,
        kilometers per hour (km/h) in most other countries, and knots on boats and aircraft.
      </p>
      <p>
        Speedometers are often confused with two neighbors on the dashboard:
      </p>
      <ul>
        <li><strong>Odometer</strong> — counts the total distance a vehicle has traveled (the mileage).</li>
        <li><strong>Tachometer</strong> — shows how fast the engine is spinning, in revolutions per minute (RPM), not how fast the car is moving.</li>
      </ul>

      <h2>The three main types of speedometer</h2>

      <h3>1. Mechanical (eddy-current) speedometers</h3>
      <p>
        For most of the 20th century, cars used a mechanical speedometer. A flexible cable, turned by the
        transmission, spins a magnet inside the instrument. The spinning magnet creates eddy currents in a metal
        cup attached to the needle, dragging it around against a small spring. The faster the magnet spins, the
        further the needle moves. German engineer Otto Schulze patented this design in 1902, and it stayed
        standard for decades.
      </p>

      <h3>2. Electronic speedometers</h3>
      <p>
        Modern cars measure speed electronically. Sensors on the transmission or at the wheels (the same ones the
        anti-lock brakes use) produce pulses as they turn. The car&rsquo;s computer counts the pulses, multiplies
        by the distance each wheel turn covers, and drives a digital display or a motorized needle.
      </p>
      <p>
        Both mechanical and electronic speedometers share one limitation: they measure how fast the wheels turn and{" "}
        <em>assume</em> a certain tire size. Change tire size, let tires wear down, or run them under-inflated,
        and the reading drifts. That&rsquo;s one reason{" "}
        <Link href="/guides/gps-vs-car-speedometer">car speedometers usually read a little high</Link>.
      </p>

      <h3>3. GPS speedometers</h3>
      <p>
        A GPS speedometer ignores the wheels entirely. It measures speed using signals from navigation satellites,
        so it works the same in a car, on a bike, on foot, on a boat, or in an airplane seat. Every modern
        smartphone has a GPS receiver, which is why a{" "}
        <Link href="/speedometer">phone can act as a speedometer</Link>. We explain the details in{" "}
        <Link href="/guides/how-does-a-gps-speedometer-work">how a GPS speedometer works</Link>.
      </p>

      <h2>How accurate are speedometers?</h2>
      <table>
        <thead>
          <tr><th>Type</th><th>Typical accuracy</th><th>Main sources of error</th></tr>
        </thead>
        <tbody>
          <tr><td>Car (mechanical/electronic)</td><td>Often reads 2–10% high, by design</td><td>Tire size and wear, regulations that forbid under-reading</td></tr>
          <tr><td>GPS (phone or satnav)</td><td>Usually within 1–2 mph in open sky</td><td>Tunnels, tall buildings, tree cover, weak signal</td></tr>
          <tr><td>Bike computer (wheel magnet)</td><td>Good if wheel size is set correctly</td><td>Wrong wheel circumference setting</td></tr>
        </tbody>
      </table>

      <h2>Why speedometers matter</h2>
      <ul>
        <li><strong>Safety.</strong> Speed is a factor in a large share of serious crashes. Knowing your speed is the first step to controlling it.</li>
        <li><strong>Staying legal.</strong> Speed limits are enforced to the mph. A reliable reading helps you avoid tickets.</li>
        <li><strong>Fuel economy.</strong> Most cars use noticeably more fuel at high highway speeds. Holding a steady, moderate speed saves money.</li>
        <li><strong>Training and performance.</strong> Cyclists, runners, and drivers use speed data to track progress — for example, timing{" "}
          <Link href="/guides/how-to-measure-0-60-time">0–60 mph</Link>.</li>
      </ul>

      <h2>Do you need a separate speedometer?</h2>
      <p>
        If you drive a car with a working speedometer, you already have one. But a second, independent reading is
        useful more often than you&rsquo;d think: checking how far off your car&rsquo;s dial is, riding a bike or
        e-scooter, boating, or driving an older or rental vehicle. A phone-based speedometer also adds things a
        dashboard can&rsquo;t, like trip history, speed alerts, and a{" "}
        <Link href="/guides/hud-speedometer">windshield HUD</Link>. See{" "}
        <Link href="/guides/why-use-a-speedometer-app">8 reasons to use a speedometer app</Link>.
      </p>

      <h2>Summary</h2>
      <ul>
        <li>A speedometer shows your current speed, in mph, km/h, or knots.</li>
        <li>Car speedometers measure wheel rotation; GPS speedometers measure movement using satellites.</li>
        <li>Car speedometers usually read slightly high; GPS is typically more accurate in open sky.</li>
        <li>You can try a free GPS speedometer in your browser right now — <Link href="/speedometer">open the online speedometer</Link>.</li>
      </ul>
    </>
  );
}
