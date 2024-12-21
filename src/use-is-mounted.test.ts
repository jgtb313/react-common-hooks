import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'

import { useIsMounted } from './use-is-mounted'

describe('useIsMounted', () => {
  it('should return true after the component is mounted', () => {
    const { result } = renderHook(() => useIsMounted())

    expect(result.current).toBe(true)
  })

  it('should not change after the initial mount', () => {
    const { result, rerender } = renderHook(() => useIsMounted())

    rerender()

    expect(result.current).toBe(true)
  })
})
