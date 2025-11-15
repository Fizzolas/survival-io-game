class SimplexNoise {
  // No longer storing a private _seed since it's unused and silences TS
  noise2D(x: number, y: number): number {
    const hash = (x * 374761393 + y * 668265263) >>> 0;
    return (((hash * 2654435761) >>> 0) / 4294967296) * 2 - 1;
  }
}

// Rest of WorldGenerator stays unchanged
