import { describe, it, expect } from 'vitest'
import { act } from 'react'
import { renderHook } from '@testing-library/react'

import { useDisclosure } from './use-disclosure'

describe('useDisclosure', () => {
  it('should initialize with the default value as false if no parameter is passed', () => {
    const { result } = renderHook(() => useDisclosure())

    expect(result.current[0]).toBe(false)
  })

  it('should initialize with the given default value', () => {
    const { result } = renderHook(() => useDisclosure(true))

    expect(result.current[0]).toBe(true)
  })

  it('should set the value to true when open is called', () => {
    const { result } = renderHook(() => useDisclosure())

    act(() => {
      result.current[1].open()
    })

    expect(result.current[0]).toBe(true)
  })

  it('should set the value to false when close is called', () => {
    const { result } = renderHook(() => useDisclosure(true))

    act(() => {
      result.current[1].close()
    })

    expect(result.current[0]).toBe(false)
  })

  it('should toggle the value when toggle is called', () => {
    const { result } = renderHook(() => useDisclosure())

    act(() => {
      result.current[1].toggle()
    })

    expect(result.current[0]).toBe(true)

    act(() => {
      result.current[1].toggle()
    })

    expect(result.current[0]).toBe(false)
  })

  it('should not affect other instances when called', () => {
    const { result: firstInstance } = renderHook(() => useDisclosure())
    const { result: secondInstance } = renderHook(() => useDisclosure(true))

    act(() => {
      firstInstance.current[1].toggle()
    })

    expect(firstInstance.current[0]).toBe(true)
    expect(secondInstance.current[0]).toBe(true)

    act(() => {
      secondInstance.current[1].close()
    })

    expect(firstInstance.current[0]).toBe(true)
    expect(secondInstance.current[0]).toBe(false)
  })
})
