import { useState, useEffect } from 'react';
import { device, size, ESize } from '../ui/breakpoints';

const useDeviceType = (): string => {
	const [deviceType, setDeviceType] = useState<ESize>(ESize.TABLET);

	useEffect(() => {
		const handleDeviceTypeChange = () => {
			const { innerWidth } = window;

			if (innerWidth >= 1200) {
				setDeviceType(ESize.DESKTOP);
			} else if (innerWidth >= 768 && innerWidth <= 1023) {
				setDeviceType(ESize.TABLET);
			} else if (innerWidth <= 767) {
				setDeviceType(ESize.MOBILE);
			}
		};

		handleDeviceTypeChange();
		window.addEventListener('resize', handleDeviceTypeChange);
		return () => {
			window.removeEventListener('resize', handleDeviceTypeChange);
		};
	}, []);

	return deviceType;
};

export default useDeviceType;
