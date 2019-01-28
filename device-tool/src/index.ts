interface Idevice {
  macos:   Function
  ipod:    Function
  ipad:    Function
  iphone:  Function
  IsIos:   Function

  android:       Function
  androidPhone:  Function
  androidTablet: Function
  IsAndroid:     Function

  blackberry:       Function
  blackberryPhone:  Function
  blackberryTablet: Function

  windows:       Function
  windowsPhone:  Function
  windowsTablet: Function

  mobile:  Function
  tablet:  Function
  desktop: Function

  portrait:      Function
  landscape:     Function
  IsOrientation: Function
}

const device: Idevice = <Idevice>{};

let userAgent: string

// IOS, Mac OS
device.macos  = (): Boolean => find('macintosh')
device.ipod   = (): Boolean => find('ipod')
device.ipad   = (): Boolean => find('ipad')
device.iphone = (): Boolean => !device.windows() && find('iphone')
device.IsIos  = (): Boolean => (
    device.ipod() ||
    device.ipad() ||
    device.iphone()
)

// android
device.android = ():       Boolean => !device.windows() && find('android')
device.androidPhone = ():  Boolean => device.android() && find('mobile')
device.androidTablet = (): Boolean => device.android() && !find('mobile')
device.IsAndroid = (): Boolean => (
    device.android() ||
    device.androidPhone() ||
    device.androidTablet()
)

// blackberry
device.blackberry = ():       Boolean => find('blackberry') || find('bb10') || find('rim')
device.blackberryPhone = ():  Boolean => device.blackberry() && !find('tablet')
device.blackberryTablet = (): Boolean => device.blackberry() && find('tablet')

// windows, windowsPhone
device.windows = ():       Boolean => find('windows')
device.windowsPhone = ():  Boolean => device.windows() && find('phone')
device.windowsTablet = (): Boolean => device.windows() && (find('touch') && !device.windowsPhone())

// Check the device is a mobile
device.mobile = (): Boolean => (
    device.androidPhone() ||
    device.iphone() ||
    device.ipad() ||
    device.windowsPhone() ||
    device.blackberryPhone()
)

// Check the device is a tablet
device.tablet = (): Boolean => (
    device.ipod() ||
    device.androidTablet() ||
    device.blackberryTablet() ||
    device.windowsTablet()
)

// Check the device is a desktop
device.desktop = () => !device.tablet() && !device.mobile()

// Check the device orientation is a portrait
device.portrait = () => {
  const orientation = (window.orientation === 180 || window.orientation === 0) || window.matchMedia("(orientation: portrait)").matches
  if (orientation) return orientation
  else return window.innerHeight / window.innerWidth > 1
}

// Check the device orientation is a portrait
device.landscape = () => {
  const orientation = (window.orientation === 90 || window.orientation === -90) || window.matchMedia("(orientation: landscape)").matches
  if (orientation) return orientation
  else return window.innerHeight / window.innerWidth > 1
}

device.IsOrientation = () => device.portrait() ? 'portrait' : 'landscape'

function find(needle: string): Boolean {
  userAgent = (navigator['userAgent'] || navigator['vendor'] || window['opera']).toLowerCase()
  return userAgent.includes(needle)
}

export default device