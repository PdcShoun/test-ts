function minEnergy(
  start: number,
  shops: number[],
  stations: number[],
  target: number
): number {
  let energy = 0
  let currentPosition = start

  const calEnergy = (currentTarget: number, currentPosition: number) => {
    const walkEnergy = Math.abs(currentTarget - currentPosition)
    const nearStation = stations
      .filter((s) => s > currentPosition || s < currentPosition)
      .reduce(function (prev, curr) {
        return Math.abs(curr - currentPosition) <
          Math.abs(prev - currentPosition)
          ? curr
          : prev
      })
    const nearTargetStation = stations
      .filter((s) => s !== nearStation)
      .reduce(function (prev, curr) {
        return Math.abs(curr - currentTarget) < Math.abs(prev - currentTarget)
          ? curr
          : prev
      })
    const stepToStation = Math.abs(nearStation - currentPosition)
    const stepStationToTarget = Math.abs(nearTargetStation - currentTarget)
    const stationEnergy = stepToStation + stepStationToTarget

    return Math.min(walkEnergy, stationEnergy)
  }

  while (shops.length > 0) {
    const currentTarget = shops
      .filter((t) => t > currentPosition || t < currentPosition)
      .reduce(function (prev, curr) {
        return Math.abs(curr - currentPosition) <
          Math.abs(prev - currentPosition)
          ? curr
          : prev
      })

    energy += calEnergy(currentTarget, currentPosition)
    currentPosition = currentTarget
    shops.splice(shops.indexOf(currentTarget), 1)
  }

  energy += calEnergy(target, currentPosition)

  return energy
}
