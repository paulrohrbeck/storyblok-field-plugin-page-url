import { FunctionComponent } from 'react'
import { useFieldPlugin } from '@storyblok/field-plugin/react'

const FieldPlugin: FunctionComponent = () => {
  const { type, data } = useFieldPlugin()

  if (type !== 'loaded') {
    return <div>Loading...</div>
  }

  // Get the full slug from the story data
  const fullSlug = String(data.story?.full_slug || '')

  // Get configuration options
  const baseUrl = String(data.options?.baseUrl || 'https://www.getflip.com')
  const slugPattern = String(data.options?.slugPattern || '^en/')
  const addTrailingSlash = Boolean(data.options?.addTrailingSlash) || true

  // Process the slug by removing the configured pattern
  let processedSlug =
    slugPattern && fullSlug
      ? fullSlug.replace(new RegExp(slugPattern), '')
      : fullSlug

  // Add trailing slash if enabled and slug doesn't already end with one
  if (addTrailingSlash && processedSlug && !processedSlug.endsWith('/')) {
    processedSlug += '/'
  }

  // Construct the full URL
  let pageUrl = processedSlug ? `${baseUrl}/${processedSlug}` : baseUrl

  // Ensure base URL has trailing slash if enabled and it's the root page
  if (addTrailingSlash && !processedSlug && !pageUrl.endsWith('/')) {
    pageUrl += '/'
  }

  // Check if story is published
  const isPublished = Boolean(data.story?.published_at)

  return (
    <div
      style={{
        padding: '8px 12px',
        backgroundColor: '#f8f9fa',
        border: '1px solid #e9ecef',
        borderRadius: '8px',
        fontSize: '13px',
        fontFamily: 'monospace',
        wordBreak: 'break-all',
        color: '#212529',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <span style={{ flex: 1 }}>{pageUrl}</span>
      {isPublished && (
        <a
          href={pageUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
          }}
          title="Open page in new tab"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15,3 21,3 21,9" />
            <line
              x1="10"
              y1="14"
              x2="21"
              y2="3"
            />
          </svg>
        </a>
      )}
    </div>
  )
}

export default FieldPlugin
