import React from 'react'
import get from 'lodash.get'

export type UseDefineSlotsOptions<T extends {}> = {
  props: T
}

export type UseDefineSlotsOutput = Record<string, React.ReactNode>

export const useDefineSlots = <T extends {}>(children: React.ReactNode, options?: UseDefineSlotsOptions<T>): UseDefineSlotsOutput => {
  const slots: UseDefineSlotsOutput = {}

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const displayName = get(child, 'displayName') || get(child, 'name') || get(child, ['type', 'displayName'])

      if (displayName) {
        slots[displayName] = React.cloneElement(child, { ...options?.props, ...child.props })
      }
    }
  })

  return slots
}
