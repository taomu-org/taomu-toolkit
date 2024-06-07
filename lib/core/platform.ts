/** 是否为 Mac平台 */
export function isMac() {
  return ['Mac68K', 'MacPPC', 'Macintosh', 'MacIntel'].includes(navigator.platform)
}

/** 是否为 Windows平台 */
export function isWin() {
  return ['Win32', 'Windows'].includes(navigator.platform)
}

/** 是否为 Linux平台 */
export function isLinux() {
  return ['Linux i686', 'Linux x86_64'].includes(navigator.platform)
}

/** 是否为 Android平台 */
export function isAndroid() {
  return /Android/i.test(navigator.userAgent)
}

/** 是否为 iOS平台 */
export function isIOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent)
}

/** 是否为移动端 */
export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export type OSName = 'Android' | 'iOS' | 'MacOS' | 'Windows' | 'Linux' | 'Unknown'

/**
 * 获取操作系统名称
 *
 * @returns OSName
 */
export function getOSName(): OSName {
  if (isWin()) {
    return 'Windows'
  } else if (isMac()) {
    return 'MacOS'
  } else if (isAndroid()) {
    return 'Android'
  } else if (isIOS()) {
    return 'iOS'
  } else if (isLinux()) {
    return 'Linux'
  }
  return 'Unknown'
}
