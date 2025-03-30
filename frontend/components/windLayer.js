import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const WindLayer = () => {
  const map = useMap();
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    const ctx = canvasRef.current.getContext("2d");

    // Simulated wind particles
    let particles = Array.from({ length: 200 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    }));

    const drawWind = () => {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.fillStyle = "rgba(0, 150, 255, 0.7)";
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x > window.innerWidth || p.x < 0) p.vx *= -1;
        if (p.y > window.innerHeight || p.y < 0) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(drawWind);
    };

    drawWind();
  }, [map]);

  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />;
};

export default WindLayer;
