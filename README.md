# React Hooks

A collection of essential React hooks and utilities for common use cases.

## Installation

```bash
npm install react-core-hooks
```

## Utilities

### makeRequest

Type-safe HTTP request utility with built-in event handling.

```typescript
// Define your API handler
const fetchUser = (id: string) => fetch(`/api/users/${id}`).then((res) => res.json())

// Use makeRequest with events
const response = await makeRequest(fetchUser, {
  params: { id: '123' },
  onPreFetch: () => console.log('Loading...'),
  onSuccess: (data, params) => console.log('Success:', data),
  onError: (error) => console.error('Error:', error),
  onFinally: () => console.log('Done')
})
```

#### Types

```typescript
type RequestEvents<T, K> = {
  onPreFetch?: () => void
  onSuccess?: (data: T, params: K) => void
  onError?: (error: string) => void
  onFinally?: () => void
}

type MakeRequestOptions<T, K> = {
  params?: Partial<K>
} & RequestEvents<T, K>
```

## Hooks

### useDefineSlots

Define and manage content slots in your components.

```typescript
const slots = useDefineSlots()
```

### useDisclosure

Manage open/close states for modals, drawers, and dropdowns.

```typescript
const [value, { open, close, toggle }] = useDisclosure(true)
```

### useIsMounted

Check if a component is currently mounted.

```typescript
const isMounted = useIsMounted()
```

### useMount

Run effects only on component mount.

```typescript
useMount(() => {
  // Runs only on mount
})
```

### useRequest

Handle API requests with loading, error, and data states.

```typescript
// Define your API handler
const fetchUser = (id: string) => fetch(`/api/users/${id}`).then((res) => res.json())

const [fetch, { data, loading }] = useRequest(fetchUser)
```

### useUnmount

Run cleanup code on component unmount.

```typescript
useUnmount(() => {
  // Cleanup code here
})
```

### useWatch

Watch value changes with a callback.

```typescript
useWatch(() => {
  // Value changes
}, [value])
```

## TypeScript Support

This library is written in TypeScript and provides full type definitions for all utilities and hooks.

## License

MIT © João Tury
