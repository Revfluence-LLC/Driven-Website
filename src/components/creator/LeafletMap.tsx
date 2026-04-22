"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import L from "leaflet";
import type { LatLng } from "./types";

type Props = {
  start: LatLng;
  end: LatLng;
  route: LatLng[] | null;
  accent: string;
};

function makePinIcon(color: string, ring = "#fff") {
  const html = `
    <div style="position:relative;width:44px;height:44px;">
      <div style="position:absolute;inset:0;border-radius:9999px;background:${color};opacity:0.25;"></div>
      <div style="position:absolute;inset:8px;border-radius:9999px;background:${color};border:4px solid ${ring};box-shadow:0 0 14px ${color};"></div>
      <div style="position:absolute;top:16px;left:16px;width:12px;height:12px;border-radius:9999px;background:${ring};"></div>
    </div>
  `;
  return L.divIcon({
    html,
    className: "",
    iconSize: [44, 44],
    iconAnchor: [22, 22],
  });
}

export function LeafletMap({ start, end, route, accent }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const routeLayerRef = useRef<L.LayerGroup | null>(null);

  // Init map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      touchZoom: false,
      // preferCanvas renders polylines via a single canvas — cleaner for export
      preferCanvas: true,
    });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
      {
        maxZoom: 19,
        crossOrigin: "anonymous",
        subdomains: "abcd",
      },
    ).addTo(map);

    routeLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      routeLayerRef.current = null;
    };
  }, []);

  // Update route + markers + bounds
  useEffect(() => {
    const map = mapRef.current;
    const layer = routeLayerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();

    const path: LatLng[] = route && route.length > 0 ? route : [start, end];

    // Glow underlay
    L.polyline(path, {
      color: accent,
      weight: 16,
      opacity: 0.25,
      lineCap: "round",
      lineJoin: "round",
    }).addTo(layer);

    // Primary line
    L.polyline(path, {
      color: accent,
      weight: 5,
      opacity: 1,
      lineCap: "round",
      lineJoin: "round",
    }).addTo(layer);

    L.marker(start, { icon: makePinIcon(accent) }).addTo(layer);
    L.marker(end, { icon: makePinIcon("#FF5277") }).addTo(layer);

    const bounds = L.latLngBounds(path);
    map.fitBounds(bounds, { padding: [80, 80], animate: false });
    // fitBounds can occasionally leave the map 1px off — force a resize
    setTimeout(() => map.invalidateSize({ pan: false }), 0);
  }, [start, end, route, accent]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        background: "#0A0E14",
      }}
    />
  );
}
