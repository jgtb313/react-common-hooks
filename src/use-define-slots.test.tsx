import { describe, it, expect } from 'vitest'

import { useDefineSlots } from './use-define-slots'

const Header = () => <div>Header</div>
Header.displayName = 'Header'

const Body = () => <div>Body</div>
Body.displayName = 'Body'

const Footer = () => <div>Footer</div>
Footer.displayName = 'Footer'

const NoDisplayName = () => <div>No Display Name</div>

describe('useDefineSlots', () => {
  it('should correctly organize slots by displayName', () => {
    const header = <Header />
    const body = <Body />
    const footer = <Footer />

    const slots = useDefineSlots([header, body, footer])

    expect(slots).toHaveProperty('Header', header)
    expect(slots).toHaveProperty('Body', body)
    expect(slots).toHaveProperty('Footer', footer)
  })

  it('should ignore components without displayName', () => {
    const header = <Header />
    const noDisplayName = <NoDisplayName />

    const slots = useDefineSlots([header, noDisplayName])

    expect(slots).toHaveProperty('Header', header)
    expect(slots).not.toHaveProperty('NoDisplayName')
  })

  it('should handle null and undefined children', () => {
    const header = <Header />
    const slots = useDefineSlots([header, null, undefined])

    expect(slots).toHaveProperty('Header', header)
    expect(Object.keys(slots).length).toBe(1)
  })

  it('should handle empty children', () => {
    const slots = useDefineSlots([])
    expect(Object.keys(slots).length).toBe(0)
  })

  it('should handle single child', () => {
    const header = <Header />
    const slots = useDefineSlots(header)

    expect(slots).toHaveProperty('Header', header)
    expect(Object.keys(slots).length).toBe(1)
  })

  it('should override duplicate displayNames with the last occurrence', () => {
    const header1 = <Header />
    const header2 = <Header />

    const slots = useDefineSlots([header1, header2])

    expect(slots).toHaveProperty('Header', header2)
    expect(Object.keys(slots).length).toBe(1)
  })
})
