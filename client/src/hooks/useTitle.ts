import * as React from 'react'

export default function useTitle(title: string) {
  React.useEffect(() => {
    document.title = `Sigma Math ~ ${title}`
  }, [title])
}
