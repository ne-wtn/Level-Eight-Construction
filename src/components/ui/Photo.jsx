import { useState } from 'react'
import { src, srcSet } from '../../data/images'

/**
 * Image wrapper that ships a responsive srcset, holds its aspect ratio so the
 * page never reflows on load, and fades in from a concrete-toned placeholder.
 *
 * Pass `ratio={null}` when the frame is stretched by its parent (e.g. `h-full`
 * in a grid row). Setting both an aspect-ratio and a full height makes the
 * browser derive the *width* from the height, which overflows the column.
 */
export default function Photo({
  photo,
  ratio = '4/3',
  sizes = '(min-width: 1024px) 50vw, 100vw',
  width = 1400,
  className = '',
  imgClassName = '',
  priority = false,
  children,
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className={`relative overflow-hidden bg-surface-dim ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <img
        src={src(photo.id, width)}
        srcSet={srcSet(photo.id)}
        sizes={sizes}
        alt={photo.alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-700 ease-out ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
      {children}
    </div>
  )
}
