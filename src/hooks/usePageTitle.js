import { useEffect } from 'react'

/**
 * Sets the document title per route. A client-rendered SPA leaves the index.html
 * title on every page otherwise, which reads badly in tabs, history and
 * bookmarks.
 */
export default function usePageTitle(title, description) {
  useEffect(() => {
    if (title) document.title = title

    if (description) {
      const meta = document.querySelector('meta[name="description"]')
      if (meta) meta.setAttribute('content', description)
    }
  }, [title, description])
}
