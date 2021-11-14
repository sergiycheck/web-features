import React, { useEffect } from "react";

export default function Card({ onSelect, time }) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSelect(null);
    }, time);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [onSelect, time]);

  return [1, 2, 3, 4].map((choice) => {
    return (
      <button
        key={choice}
        data-testid={choice}
        className="btn btn-transparent border-primary rounder"
        onClick={() => onSelect(choice)}
      >
        select {choice}
      </button>
    );
  });
}
