"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  Cloud,
  fetchSimpleIcons,
  renderSimpleIcon,
} from "react-icon-cloud"

const idleSpeed = 0.04

export const cloudProps = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
      cursor: "grab",
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [idleSpeed, -idleSpeed],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: idleSpeed,
    decel: 0.9,
    dragControl: true,
  },
}

export const renderCustomIcon = (icon) => {
  // Use a single (light-mode friendly) set of colors for both themes to keep
  // brand colors consistent and avoid icons turning white in dark mode.
  const bgHex = "#F4F5F7"
  const fallbackHex = "#333333"
  const minContrastRatio = 1.1

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e) => e.preventDefault(),
    },
  })
}

// Inner component that holds the Cloud instance and never re-renders on theme change.
// This prevents TagCanvas from being destroyed and recreated when the theme toggles,
// which would reset the spinning ball's position.
const StableCloud = React.memo(function StableCloud({ icons }) {
  return (
    <Cloud {...cloudProps}>
      <>{icons}</>
    </Cloud>
  )
}, (prev, next) => prev.icons === next.icons)

export const IconCloud = React.memo(function IconCloud({ iconSlugs, darkMode }) {
  const [data, setData] = useState(null)
  const containerRef = useRef(null)
  const interactingRef = useRef(false)
  const restoreTimerRef = useRef(null)

  useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs }).then(setData)
  }, [iconSlugs])

  const restoreIdleSpeed = useCallback(() => {
    if (!containerRef.current) return
    const canvas = containerRef.current.querySelector("canvas")
    if (!canvas || !canvas.id) return
    try {
      if (window.TagCanvas) {
        window.TagCanvas.SetSpeed(canvas.id, [idleSpeed, -idleSpeed])
      }
    } catch (e) {
      // TagCanvas not ready
    }
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onInteractStart = () => {
      interactingRef.current = true
      if (restoreTimerRef.current) {
        clearTimeout(restoreTimerRef.current)
        restoreTimerRef.current = null
      }
    }

    const onInteractEnd = () => {
      interactingRef.current = false
      restoreTimerRef.current = setTimeout(restoreIdleSpeed, 600)
    }

    el.addEventListener("mousedown", onInteractStart)
    el.addEventListener("mouseup", onInteractEnd)
    el.addEventListener("mouseleave", onInteractEnd)
    el.addEventListener("touchstart", onInteractStart)
    el.addEventListener("touchend", onInteractEnd)

    return () => {
      el.removeEventListener("mousedown", onInteractStart)
      el.removeEventListener("mouseup", onInteractEnd)
      el.removeEventListener("mouseleave", onInteractEnd)
      el.removeEventListener("touchstart", onInteractStart)
      el.removeEventListener("touchend", onInteractEnd)
      if (restoreTimerRef.current) clearTimeout(restoreTimerRef.current)
    }
  }, [restoreIdleSpeed])

  // Render icons only when data loads. Theme is not a dependency here so that
  // the Cloud component (and its underlying TagCanvas) is not destroyed/recreated
  // on theme switch, preserving the ball's spinning state and position.
  const renderedIcons = useMemo(() => {
    if (!data) return null

    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div ref={containerRef}>
      <StableCloud icons={renderedIcons} />
    </div>
  )
})
