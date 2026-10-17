import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

let deferredPrompt: BeforeInstallPromptEvent | null = null
const listeners = new Set<() => void>()

function notify(): void {
  listeners.forEach((listener) => listener())
}

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault()
    deferredPrompt = event as BeforeInstallPromptEvent
    notify()
  })
  window.addEventListener('appinstalled', () => {
    deferredPrompt = null
    notify()
  })
}

export function isStandalone(): boolean {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    (window.navigator as { standalone?: boolean }).standalone === true
  )
}

export function useInstallState() {
  const [canInstall, setCanInstall] = useState(false)
  const [installed, setInstalled] = useState(() => isStandalone())

  useEffect(() => {
    const update = () => {
      setCanInstall(deferredPrompt !== null)
      setInstalled(isStandalone())
    }
    update()
    listeners.add(update)
    return () => {
      listeners.delete(update)
    }
  }, [])

  async function install(): Promise<boolean> {
    if (!deferredPrompt) return false
    await deferredPrompt.prompt()
    const choice = await deferredPrompt.userChoice
    if (choice.outcome === 'accepted') {
      deferredPrompt = null
      notify()
      return true
    }
    return false
  }

  return { canInstall, installed, install }
}

/** Ask Android to treat the local data as persistent so it is not evicted under storage pressure. */
export async function requestPersistentStorage(): Promise<boolean> {
  try {
    if (navigator.storage?.persist) return await navigator.storage.persist()
  } catch {
    // Ignore unsupported browsers.
  }
  return false
}