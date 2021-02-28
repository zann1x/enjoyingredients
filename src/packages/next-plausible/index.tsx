import React, { ReactNode } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface PlausibleProviderProps {
    children: ReactNode | ReactNode[];
}

const PlausibleProvider = ({ children }: PlausibleProviderProps) => {
    const router = useRouter();

    let dataDomain: string = '';
    switch (router.locale) {
        case 'de':
            dataDomain = 'enjoyingredients.de';
        default:
            dataDomain = 'enjoyingredients.de';
    }

    const enabled =
        process.env.NODE_ENV === 'production' &&
        typeof window !== 'undefined' &&
        window.location.hostname === dataDomain;

    return (
        <>
            <Head>
                {!enabled && (
                    <script
                        async
                        defer
                        data-domain={dataDomain}
                        src="https://pla.enjoyingredients.com/js/plausible.outbound-links.js"
                    />
                )}
            </Head>
            {children}
        </>
    );
};

export default PlausibleProvider;

export const usePlausible = () => {
    return (eventName, options) => {
        return window.plausible?.(eventName, options);
    };
};
