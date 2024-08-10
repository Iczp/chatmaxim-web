import FingerprintJS, { type GetResult } from '@fingerprintjs/fingerprintjs';

export let deviceId: string | null | undefined;

const storageKey = 'deviceId';

export const getDeviceId = () => {
  if (!deviceId) {
    deviceId = localStorage.getItem(storageKey);
    if (!deviceId) {
      return null;
    }
  }
  return deviceId;
};

export const generateDeviceId = async (): Promise<string> => {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  console.log('generate DeviceId', result);
  const visitorId = result.visitorId;
  deviceId = `web-${visitorId}`;
  localStorage.setItem(storageKey, deviceId);
  return deviceId;
};
