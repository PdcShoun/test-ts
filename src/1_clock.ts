function getClockAngle(hh_mm: string): number {
  const [hh, mm] = hh_mm.split(':').map((t) => parseInt(t))
  const cal = Math.abs(30 * hh - 5.5 * mm)
  const angle = Math.abs(cal > 180 ? 360 - cal : cal)
  return angle
}
