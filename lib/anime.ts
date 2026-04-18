import { animate, createTimeline, stagger } from "animejs"

type LegacyAnimeParams = {
  targets: Parameters<typeof animate>[0]
  easing?: string
  ease?: string
  [key: string]: unknown
}

function anime(params: LegacyAnimeParams) {
  const { targets, easing, ...rest } = params
  const animationParams = {
    ...rest,
    ...(easing && !("ease" in rest) ? { ease: easing } : {}),
  }

  return animate(targets, animationParams)
}

anime.stagger = stagger

anime.timeline = (params: Record<string, unknown> = {}) => {
  const { easing, defaults, ...rest } = params

  const timeline = createTimeline({
    ...rest,
    defaults: {
      ...(typeof defaults === "object" && defaults !== null ? defaults : {}),
      ...(easing ? { ease: easing } : {}),
    },
  })

  const originalAdd = timeline.add.bind(timeline)

  ;(timeline as unknown as {
    add: (
      a1: Record<string, unknown> | unknown,
      a2?: unknown,
      a3?: unknown
    ) => unknown
  }).add = (a1: Record<string, unknown> | unknown, a2?: unknown, a3?: unknown) => {
    if (typeof a1 === "object" && a1 !== null && "targets" in a1) {
      const animationObject = a1 as Record<string, unknown>
      const { targets, easing: animationEasing, ...animationParams } = animationObject
      const normalizedParams = {
        ...animationParams,
        ...(animationEasing && !("ease" in animationParams) ? { ease: animationEasing } : {}),
      }

      originalAdd(targets, normalizedParams, a2)
      return timeline
    }

    return originalAdd(a1 as never, a2 as never, a3 as never)
  }

  return timeline
}

export default anime