import { describe, it, expect, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'

import { useRequest } from './use-request'

describe('useRequest', () => {
  it('should initialize with the initial values provided in options', () => {
    const handler = vi.fn()
    const initialValues = { key: 'value' }

    const { result } = renderHook(() => useRequest(handler, { initialValues }))

    expect(result.current[1].data).toEqual(initialValues)
  })

  it('should call fetch and update the data on success', async () => {
    const handler = vi.fn().mockImplementationOnce(
      async () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({ key: 'newValue' })
          }, 1000)
        })
    )
    const { result } = renderHook(() => useRequest(handler))

    const fetch = result.current[0]

    await act(async () => {
      await fetch({ params: {} })
    })

    expect(result.current[1].data).toEqual({ key: 'newValue' })
    expect(result.current[1].loading).toBeFalsy()
  })

  it('should handle loading state correctly', async () => {
    const handler = vi.fn().mockImplementationOnce(
      async () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({ key: 'newValue' })
          }, 1000)
        })
    )
    const { result } = renderHook(() => useRequest(handler))

    const fetch = result.current[0]

    expect(result.current[1].loading).toBeFalsy()

    await act(async () => {
      fetch({ params: {} })
    })

    expect(result.current[1].loading).toBeTruthy()

    await act(async () => {
      await fetch({ params: {} })
    })

    expect(result.current[1].loading).toBeFalsy()
  })

  it('should call onPreFetch, onSuccess and onFinally callbacks correctly', async () => {
    const onPreFetch = vi.fn()
    const onSuccess = vi.fn()
    const onError = vi.fn()
    const onFinally = vi.fn()

    const handler = vi.fn().mockResolvedValue({ key: 'newValue' })
    const { result } = renderHook(() => useRequest(handler))

    const fetch = result.current[0]

    await act(async () => {
      await fetch({ params: {}, options: {}, onPreFetch, onSuccess, onError, onFinally })
    })

    expect(onPreFetch).toHaveBeenCalled()
    expect(onSuccess).toHaveBeenCalledWith({ key: 'newValue' }, {})
    expect(onError).not.toHaveBeenCalled()
    expect(onFinally).toHaveBeenCalled()
  })

  it('should call onError when the request fails', async () => {
    const onError = vi.fn()

    const handler = vi.fn().mockRejectedValue(new Error('Request failed'))
    const { result } = renderHook(() => useRequest(handler))

    const fetch = result.current[0]

    await act(async () => {
      try {
        await fetch({ params: {}, onError })
      } catch (error) {
        expect(onError).toHaveBeenCalledWith('Request failed')
      }
    })
  })

  it('should update data with updateData function', async () => {
    const handler = vi.fn()
    const { result } = renderHook(() => useRequest(handler))

    act(() => {
      result.current[1].updateData({ key: 'updatedValue' })
    })

    expect(result.current[1].data).toStrictEqual({ key: 'updatedValue' })
  })

  it('should update data when initialValues changes', async () => {
    const handler = vi.fn()

    const { result, rerender } = renderHook(({ initialValues }) => useRequest(handler, { initialValues }), {
      initialProps: { initialValues: { key: 'initialValue' } }
    })

    expect(result.current[1].data).toStrictEqual({ key: 'initialValue' })

    rerender({ initialValues: { key: 'updatedValue' } })

    expect(result.current[1].data).toStrictEqual({ key: 'updatedValue' })
  })
})
