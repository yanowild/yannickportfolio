"use client"

import React, { useEffect, useMemo, useState } from "react"
import { useTheme } from "next-themes"
import {
  Cloud,
  fetchSimpleIcons,
  renderSimpleIcon,
} from "react-icon-cloud"

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
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.01,
    minSpeed: 0.01,
    dragControl: true,
  },
}

export const renderCustomIcon = (icon, theme) => {
  const bgHex = theme === "light" ? "#f3f2ef" : "#080510"
  const fallbackHex = theme === "light" ? "#333333" : "#ffffff"
  const minContrastRatio = theme === "light" ? 5 : 2

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

export const IconCloud = React.memo(function IconCloud({ iconSlugs }) {
  const [data, setData] = useState(null)
  const { theme } = useTheme()

  useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs }).then(setData)
  }, [iconSlugs])

  const renderedIcons = useMemo(() => {
    if (!data) return null

    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon, theme || "light"),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <Cloud {...cloudProps}>
      <>{renderedIcons}</>
    </Cloud>
  )
})
