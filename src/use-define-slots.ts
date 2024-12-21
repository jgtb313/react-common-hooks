import React from 'react'

export type UseDefineSlotsOptions<T extends {}> = {
  props: T
}

export type UseDefineSlotsOutput = Record<string, React.ReactNode>

export const useDefineSlots = <T extends {}>(children: React.ReactNode, options?: UseDefineSlotsOptions<T>): UseDefineSlotsOutput => {
  const slots: UseDefineSlotsOutput = {}

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const displayName = (child.type as React.ComponentType)?.displayName

      if (displayName) {
        const props = { ...options?.props }
        slots[displayName] = React.cloneElement(child, props)
      }
    }
  })

  return slots
}
